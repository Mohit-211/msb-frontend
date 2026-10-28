"use client";

import { useMemo, useSyncExternalStore } from "react";
import StoryDetail from "./StoryDetail";

const subscribe = () => () => {};
const readSavedStory = () => sessionStorage.getItem("storyData");

// A saved AI story, handed over by the story list through sessionStorage.
export default function SavedStoryPage() {
  const savedStory = useSyncExternalStore(subscribe, readSavedStory, () => null);
  const story = useMemo(() => (savedStory ? JSON.parse(savedStory) : null), [savedStory]);

  return <div>{story ? <StoryDetail data={story} /> : <p>Loading...</p>}</div>;
}
