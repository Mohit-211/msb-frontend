import RequireAuth from "@/components/auth/RequireAuth";
import SignInPage from "@/components/auth/SignInPage";
import StoryListPage from "@/components/stories/StoryListPage";

export const metadata = {
  title: "Stories",
};

export default async function StoryListRoute({ params }) {
  const { slug } = await params;
  // Keyed by category so switching categories starts from page 1 with the filter closed.
  return (
    <RequireAuth fallback={<SignInPage />}>
      <StoryListPage key={slug} />
    </RequireAuth>
  );
}
