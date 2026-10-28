"use client";

import { useState } from "react";
import StoryGenerator from "./StoryGenerator";
import styles from "./StoryGeneratorLauncher.module.scss";
import { MessageSquare } from "lucide-react";

export default function StoryGeneratorLauncher() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.chatWidget}>
      {isOpen && <div className={styles.chatBoxWrapper}><StoryGenerator /></div>}
      
      <button className={styles.storyGeneratorBtn} onClick={toggleChat}>
        <MessageSquare size={20} aria-hidden="true" />
        <span>{isOpen ? "Close story generator" : "Generate your own story"}</span>
      </button>
    </div>
  );
}
