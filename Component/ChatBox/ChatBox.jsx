"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./ChatBox.module.scss";
import { Copy, Save, SendHorizontal, SlidersHorizontal } from "lucide-react";
import { Button } from "@/Component/ui/button/Button";
import { Dialog, DialogClose, DialogContent, DialogFooter } from "@/Component/ui/dialog/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Component/ui/dropdown-menu/DropdownMenu";
import { Field, Input } from "@/Component/ui/field/Field";
import { Skeleton, SkeletonText } from "@/Component/ui/skeleton/Skeleton";
import { toast } from "@/Component/ui/toast/toast";
import {
  AipromtApi,
  SaveStoryApi,
  SortStoryApi,
  getLocalStorageItem,
} from "@/Constants/Api/Api";
import { useDispatch } from "react-redux";
import { fetchStoryHistory } from "@/redux/storyHistorySlice";

export default function ChatBox() {
  const [actionLoadingIndex, setActionLoadingIndex] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [saveInput, setSaveInput] = useState("");
  const [saveText, setSaveText] = useState("");
  const [saveTitle, setSaveTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const storedToken = getLocalStorageItem("UserLoginToken");
  const dispatch = useDispatch();

  useEffect(() => {
    setMessages([
      {
        from: "bot",
        text: "I am your story generator, please enter a story title.",
      },
    ]);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const loadingMessage = { from: "bot", text: "", loading: true };
    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    const currentInput = input;
    setSaveInput(currentInput);
    setInput("");
    setLoading(true);

    try {
      const response = await AipromtApi({ input: currentInput }, storedToken);
      const botText =
        response?.data?.data?.description || "No response received.";

      setMessages((prev) => {
        const filtered = prev.filter(
          (msg) =>
            msg.text !==
            "I am your story generator, please enter a story title.",
        );
        return filtered.map((msg, idx, arr) =>
          idx === arr.length - 1 && msg.loading
            ? { from: "bot", text: botText }
            : msg,
        );
      });
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to get response. Please try again later.");
      setMessages((prev) => prev.filter((msg) => !msg.loading));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text, index) => {
    setActionLoadingIndex(index);
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Message copied!");
    } catch {
      toast.error("Failed to copy.");
    } finally {
      setActionLoadingIndex(null);
    }
  };

  const handleDownload = (text, index) => {
    setActionLoadingIndex(index);
    setSaveText(text);
    setSaveTitle("");
    setShowModal(true);
    setTimeout(() => setActionLoadingIndex(null), 500);
  };

  const handleSaveStory = async () => {
    if (!saveTitle.trim()) {
      toast.warning("Please enter a title.");
      return;
    }

    const formData = {
      input: saveInput,
      title: saveTitle,
      description: saveText,
    };

    try {
      const response = await SaveStoryApi(formData, storedToken);
      toast.success(response?.data?.message || "Story saved successfully.");
      await dispatch(fetchStoryHistory(storedToken)).unwrap();
      resetState();
    } catch (error) {
      console.error("SaveStory API Error:", error);
      toast.error("Failed to save story.");
    }
  };

  const handleSortStory = async (text, index) => {
    setActionLoadingIndex(index);
    const formData = {
      input: saveInput,
      title: saveInput,
      description: text,
    };

    try {
      const response = await SortStoryApi(formData, storedToken);
      const sortText = response?.data?.data?.sortContent || "No sort content.";
      const longText = response?.data?.data?.longContent || "No long content.";

      setMessages((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          text: sortText,
          sortContent: sortText,
          longContent: longText,
          showing: "sort",
        };
        return updated;
      });

      toast.success("Story sorted successfully.");
      await dispatch(fetchStoryHistory(storedToken)).unwrap();
    } catch (error) {
      console.error("SortStory API Error:", error);
      toast.error("Failed to sort story.");
    } finally {
      setActionLoadingIndex(null);
    }
  };

  const toggleStoryLength = (index) => {
    setMessages((prev) => {
      const updated = [...prev];
      const current = updated[index];
      if (!current) return prev;

      const isShort = current.showing === "Short";

      updated[index] = {
        ...current,
        text: isShort ? current.longContent : current.sortContent,
        showing: isShort ? "long" : "Short",
      };

      return updated;
    });
  };

  const resetState = () => {
    setMessages([
      {
        from: "bot",
        text: "I am your story generator, please enter a story title.",
      },
    ]);
    setShowModal(false);
    setSaveInput("");
    setSaveText("");
    setSaveTitle("");
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
              ) : (
                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              )}
              {msg.from === "bot" &&
                !msg.loading &&
                msg.text !==
                  "I am your story generator, please enter a story title." && (
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
                        <button
                          type="button"
                          className={styles.action}
                          onClick={() => handleDownload(msg.text, index)}
                        >
                          <Save size={16} aria-hidden="true" /> Save
                        </button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button type="button" className={styles.action}>
                              <SlidersHorizontal size={16} aria-hidden="true" /> Refine
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onSelect={() => {
                                if (!msg.sortContent) {
                                  handleSortStory(msg.text, index);
                                } else {
                                  toggleStoryLength(index, "short");
                                }
                              }}
                            >
                              Shorten
                            </DropdownMenuItem>
                            {msg.sortContent && (
                              <DropdownMenuItem
                                onSelect={() => toggleStoryLength(index, "long")}
                              >
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
      <Dialog open={showModal} onOpenChange={setShowModal}>
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
