import React, { useState } from 'react';
import styles from './StoryGeneratorButton.module.scss';

const StoryGeneratorButton = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  return (
    <><div>hellp</div>
      <div className={styles.storyGeneratorBtn} onClick={togglePopup}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path
            d="M3 5a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H7l-4 4V5z"
            stroke="#333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 8c-2 2-5 4-9 4l-2 2c4 0 7-2 9-4l2-2z"
            stroke="#333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Generate your own story</span>
      </div>

      {isPopupVisible && (
        <div className={styles.storyGeneratorPopup}>
          {/* Your chatbot iframe or script goes here */}
          <p>Chatbot Popup Content</p>
        </div>
      )}
    </>
  );
};

export default StoryGeneratorButton;
