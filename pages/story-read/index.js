import BlogDetailComponent from '@/Component/BlogDetail/BlogDetail';
import { useEffect, useState } from 'react';

const StoryReadPage = () => {
  const [story, setStory] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem('storyData');
    if (data) {
      setStory(JSON.parse(data));
    }
  }, []);

  return (
    <div>
      {story ? (
        <>
        <BlogDetailComponent data={story} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StoryReadPage;
