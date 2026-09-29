import React, { useCallback, useEffect, useState } from "react";
import styles from "./StoryAiPrompt.module.scss";
import { Container } from "react-bootstrap";
import {
  AudioOutlined,
  CopyOutlined,
  CheckOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Card, Input, Button, message, Drawer, List } from "antd";
import {
  AipromtApi,
  AipromtHistoryApi,
  getLocalStorageItem,
} from "@/Constants/Api/Api";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

const StoryAiPrompt = () => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [story, setStory] = useState("");
  // const [story, setStory] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  const storedValue = getLocalStorageItem("UserLoginToken");

  const onSearch = async (value) => {
    if (!value) return;
    setLoading(true);
    setStory("");

    const formData = { input: value };

    try {
      const res = await AipromtApi(formData, storedValue);
      setStory(res?.data?.data?.story || "No story generated.");
      // setHistoryList((prev) => [value, ...prev]);
      fetchHistory();
    } catch (error) {
      console.error(error);
      message.error("Failed to generate story.");
    } finally {
      setLoading(false);
      setInputValue("");
    }
  };

  // const handleCopy = (story) => {
  //   console.log(story,"story")

  //   // const text = document.getElementById("loadingText"+index)?.innerText;
  //   if (story) {
  //     navigator.clipboard.writeText().then(() => {
  //       setCopied(true);
  //       message.success("Text copied to clipboard!");
  //       setTimeout(() => setCopied(false), 2000);
  //     });
  //   }
  // };

  const handleCopy = (htmlString) => {
    // Create a temporary div to strip HTML and get plain text
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";

    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true);
      message.success("Text copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const fetchHistory = useCallback(() => {
    AipromtHistoryApi(storedValue)
      .then((res) => {
        setHistoryList(res?.data?.data || []);
      })
      .catch((e) => {
        console.log("Error fetching history:", e);
      });
  }, [storedValue]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);
  console.log(historyList, "check history");
  return (
    <Container>
      <div className={styles.story}>
        <div
          className={`${styles.StoryAiPrompt} ${
            historyOpen ? styles.sidebarOpen : ""
          }`}
        >
          {/* Sidebar Open Button
          <div className={styles.storyHeader}>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setHistoryOpen(true)}
            />
          </div>

          <Drawer
            title="Prompt History"
            placement="left"
            onClose={() => setHistoryOpen(false)}
            open={historyOpen}
            width={240}
          >
            <List
              size="small"
              bordered
              dataSource={historyList}
              renderItem={(item) => (
                <List.Item>
                  <Button
                    type="link"
                    onClick={() => {
                      setInputValue(item?.input);
                      setHistoryOpen(false);
                      // onSearch(item?.input);
                    }}
                  >
                    {item?.input}
                  </Button>
                </List.Item>
              )}
            />
          </Drawer> */}

          {/* Prompt Input */}
          <div className={styles.inputcard}>
            <Card>
              <Search
                placeholder="Enter your prompt"
                enterButton="Submit"
                size="large"
                // suffix={suffix}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSearch={onSearch}
                loading={loading}
              />
            </Card>
          </div>
          <div className={styles.story_container}>

        
          {historyList?.map((item, index) => {
            return (
              <div key={index}>
                <p className={styles.history_input}>{item?.input}</p>

                <Card className={styles.storyget}>
                  <div className={styles.copytext}>
                    <Button
                      icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                      size="small"
                      onClick={() => handleCopy(item?.story)}
                    >
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <div className={styles.storybox}>
                    <div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item?.story,
                        }}
                      ></p>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
            </div>
          {/* Story Output */}
          {/* {(loading || story) && (
            <Card className={styles.storyget}>
              <div>
                <div className={styles.copytext}>
                  <Button
                    icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                    size="small"
                    onClick={() => handleCopy(story)}
                  >
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              
              </div>
            </Card>
          )} */}
            {loading && (
                  <div className={styles.storybox}>
                    <div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: loading ? "Loading your story..." : "",
                        }}
                      ></p>
                    </div>
                  </div>
                )}
        </div>
      </div>
    </Container>
  );
};

export default StoryAiPrompt;
