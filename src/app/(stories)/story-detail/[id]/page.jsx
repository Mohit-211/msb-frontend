import RequireAuth from "@/components/auth/RequireAuth";
import SignInPage from "@/components/auth/SignInPage";
import StoryPage from "@/components/stories/StoryPage";

// No route title: the story loads in the browser and StoryPage renders the page's <title>.
// A Next title would sit first in <head> and win.
export const metadata = {
  title: null,
};

// The API serves stories only to signed-in readers, and the token is in the browser, so the
// story loads there.
export default async function StoryDetailRoute({ params }) {
  const { id } = await params;
  return (
    <RequireAuth fallback={<SignInPage />}>
      <StoryPage key={id} id={id} />
    </RequireAuth>
  );
}
