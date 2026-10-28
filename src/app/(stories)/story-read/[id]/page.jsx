import RequireAuth from "@/components/auth/RequireAuth";
import SignInPage from "@/components/auth/SignInPage";
import StoryPage from "@/components/stories/StoryPage";

// No route title: the story loads in the browser and StoryPage renders the page's <title>.
// A Next title would sit first in <head> and win.
export const metadata = {
  title: null,
};

// One of the reader's saved AI stories, by id, so it opens from a link or a new tab.
export default async function SavedStoryRoute({ params }) {
  const { id } = await params;
  return (
    <RequireAuth fallback={<SignInPage />}>
      <StoryPage key={id} id={id} saved />
    </RequireAuth>
  );
}
