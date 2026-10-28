"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./StoryGenerator.module.scss";
import { Check, Copy, Save, SendHorizontal, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import { Dialog, DialogClose, DialogContent, DialogFooter } from "@/components/ui/dialog/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu/DropdownMenu";
import { Field, Input } from "@/components/ui/field/Field";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton/Skeleton";
import { toast } from "@/components/ui/toast/toast";
import { AipromtApi, SaveStoryApi, SortStoryApi, errorMessage } from "@/lib/api";
import { sanitizeHtml } from "@/lib/sanitize";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoryHistory } from "@/store/slices/storyHistorySlice";
import { selectAccess } from "@/store/slices/profileSlice";

const WELCOME_MESSAGE = "I am your story generator, please enter a story title.";
// The API's limits for a prompt and for a saved story's title
const MAX_PROMPT_LENGTH = 200;
const MAX_TITLE_LENGTH = 200;
const SAVE_NEEDS_PLAN = "Your free trial has ended. Saving stories needs a paid plan.";

const plainText = (html) => new DOMParser().parseFromString(html, "text/html").body.textContent || "";

// Each bot message keeps the id the API gave its story (storyId) and the prompt it came from
// (input), so Save and Refine act on that story, not on the latest one.
export default function StoryGenerator() {
  const [actionLoadingIndex, setActionLoadingIndex] = useState(null);
  const [messages, setMessages] = useState(() => [{ from: "bot", text: WELCOME_MESSAGE }]);
  const [input, setInput] = useState("");
  const [saveIndex, setSaveIndex] = useState(null);
  const [saveTitle, setSaveTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const access = useSelector(selectAccess);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const updateMessage = (index, changes) =>
    setMessages((prev) => prev.map((msg, i) => (i === index ? { ...msg, ...changes } : msg)));

  const handleSend = async () => {
    // The API counts every request toward an hourly limit, so one at a time.
    if (!input.trim() || loading) return;

    const currentInput = input;
    const userMessage = { from: "user", text: currentInput };
    const loadingMessage = { from: "bot", text: "", loading: true };
    setMessages((prev) => [...prev.filter((msg) => msg.text !== WELCOME_MESSAGE), userMessage, loadingMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await AipromtApi(currentInput);
      const story = response?.data?.data;
      setMessages((prev) =>
        prev.map((msg) =>
          msg.loading
            ? {
                from: "bot",
                text: story?.description || "No response received.",
                storyId: story?.id,
                input: currentInput,
              }
            : msg,
        ),
      );
    } catch (error) {
      console.error("API Error:", error);
      toast.error(errorMessage(error, "Failed to get response. Please try again later."));
      setMessages((prev) => prev.filter((msg) => !msg.loading));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text, index) => {
    setActionLoadingIndex(index);
    try {
      await navigator.clipboard.writeText(plainText(text));
      toast.success("Message copied!");
    } catch {
      toast.error("Failed to copy.");
    } finally {
      setActionLoadingIndex(null);
    }
  };

  const openSaveDialog = (index) => {
    if (access && !access.can_save_stories) {
      toast.info(SAVE_NEEDS_PLAN);
      return;
    }
    setSaveTitle(messages[index].input ?? "");
    setSaveIndex(index);
  };

  const handleSaveStory = async () => {
    if (!saveTitle.trim()) {
      toast.warning("Please enter a title.");
      return;
    }
    const msg = messages[saveIndex];

    try {
      // Saving a saved story un-saves it, so the button is gone once this succeeds.
      const response = await SaveStoryApi(msg.storyId, saveTitle.trim(), msg.text);
      toast.success(response?.data?.message || "Story saved successfully.");
      updateMessage(saveIndex, { saved: true });
      setSaveIndex(null);
      dispatch(fetchStoryHistory());
    } catch (error) {
      console.error("SaveStory API Error:", error);
      toast.error(errorMessage(error, "Failed to save story."));
      if (error.response?.status === 403) setSaveIndex(null);
    }
  };

  const handleSortStory = async (index) => {
    const msg = messages[index];
    setActionLoadingIndex(index);
    try {
      const response = await SortStoryApi(msg.input, msg.text);
      const sortText = response?.data?.data?.sortContent || "No sort content.";
      const longText = response?.data?.data?.longContent || "No long content.";
      updateMessage(index, { text: sortText, sortContent: sortText, longContent: longText, showing: "short" });
      toast.success("Story sorted successfully.");
    } catch (error) {
      console.error("SortStory API Error:", error);
      toast.error(errorMessage(error, "Failed to sort story."));
    } finally {
      setActionLoadingIndex(null);
    }
  };

  // Switches a refined story between its short and long versions.
  const showLength = (index, length) => {
    const msg = messages[index];
    updateMessage(index, { text: length === "short" ? msg.sortContent : msg.longContent, showing: length });
  };

  return (
    <div className={styles.chatBox}>
      {/* Messages */}
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.messageWrapper} ${
              msg.from === "user" ? styles.user : styles.bot
            }`}
          >
            <div className={styles.message}>
              {msg.loading ? (
                <SkeletonText lines={3} label="Writing your story" className={styles.loadingText} />
              ) : msg.from === "user" ? (
                <div>{msg.text}</div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(msg.text) }} />
              )}
              {msg.from === "bot" &&
                !msg.loading &&
                msg.text !== WELCOME_MESSAGE && (
                  <div className={styles.messageTopActions}>
                    {actionLoadingIndex === index ? (
                      <Skeleton width="5rem" height="1.5rem" />
                    ) : (
                      <>
                        <button
                          type="button"
                          className={styles.action}
                          onClick={() => handleCopy(msg.text, index)}
                        >
                          <Copy size={16} aria-hidden="true" /> Copy
                        </button>
                        {msg.saved ? (
                          <span className={styles.action}>
                            <Check size={16} aria-hidden="true" /> Saved
                          </span>
                        ) : (
                          <button
                            type="button"
                            className={styles.action}
                            onClick={() => openSaveDialog(index)}
                          >
                            <Save size={16} aria-hidden="true" /> Save
                          </button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button type="button" className={styles.action}>
                              <SlidersHorizontal size={16} aria-hidden="true" /> Refine
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onSelect={() => (msg.sortContent ? showLength(index, "short") : handleSortStory(index))}
                            >
                              Shorten
                            </DropdownMenuItem>
                            {msg.sortContent && (
                              <DropdownMenuItem onSelect={() => showLength(index, "long")}>
                                Elaborate
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    )}
                  </div>
                )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="Enter story title..."
          aria-label="Story title"
          maxLength={MAX_PROMPT_LENGTH}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={loading}
          aria-label="Generate story"
        >
          <SendHorizontal size={20} aria-hidden="true" />
        </button>
      </div>

      {/* Save dialog */}
      <Dialog
        open={saveIndex !== null}
        onOpenChange={(open) => {
          if (!open) setSaveIndex(null);
        }}
      >
        <DialogContent title="Save story" size="sm">
          <form
            className={styles.saveForm}
            onSubmit={(event) => {
              event.preventDefault();
              handleSaveStory();
            }}
          >
            <Field label="Title">
              <Input
                placeholder="Enter story title"
                maxLength={MAX_TITLE_LENGTH}
                value={saveTitle}
                onChange={(e) => setSaveTitle(e.target.value)}
                autoFocus
              />
            </Field>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
