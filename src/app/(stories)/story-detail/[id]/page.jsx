import { notFound } from "next/navigation";
import StoryDetail from "@/components/stories/StoryDetail";
import { getStory } from "@/lib/api.server";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const story = await getStory(id);
  return { title: story?.data?.heading ?? "Story" };
}

export default async function StoryDetailRoute({ params }) {
  const { id } = await params;
  const story = await getStory(id);
  if (!story?.data) notFound();
  return <StoryDetail data={story} />;
}
