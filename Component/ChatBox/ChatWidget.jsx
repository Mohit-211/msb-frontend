"use client";

import { useState } from "react";
import ChatBox from "./ChatBox";
import styles from "./ChatWidget.module.scss";
import { MessageSquare } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.chatWidget}>
      {isOpen && <div className={styles.chatBoxWrapper}><ChatBox /></div>}
      
      <button className={styles.storyGeneratorBtn} onClick={toggleChat}>
        <MessageSquare size={20} aria-hidden="true" />
        <span>{isOpen ? "Close story generator" : "Generate your own story"}</span>
      </button>
    </div>
  );
}
