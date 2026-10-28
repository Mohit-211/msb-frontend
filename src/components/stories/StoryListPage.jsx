"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useIsClient } from "@/hooks/useIsClient";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Funnel, LoaderCircle } from "lucide-react";
import { BlogByCategoryApi, AllCategoryAPI } from "@/lib/api";
import { Image_URL } from "@/lib/config";
import dummyStory from "@/assets/images/story-placeholder.png";
import StoriesBanner from "./StoriesBanner";
import StoryCard from "./StoryCard";
import StoryGeneratorLauncher from "@/components/story-generator/StoryGeneratorLauncher";
import styles from "./StoryListPage.module.scss";
import { fetchStoryHistory } from "@/store/slices/storyHistorySlice";
import Pagination from "@/components/ui/pagination/Pagination";
import PlanNotice from "@/components/account/PlanNotice";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog/Dialog";

const DEFAULT_TITLE = "My Story Bank 2.0";

// Listed before the categories that come from the API
const FIXED_CATEGORIES = [
  { slug: "all", title: "All Category" },
  { slug: "my-saved-story", title: "My Saved Story" },
];

function StoryListPage() {
  const dispatch = useDispatch();
  const { slug = "all" } = useParams();
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(slug !== "my-saved-story");
  const PER_PAGE = 6;
  const count = Math.ceil(dataCount / PER_PAGE);
  const [showFilter, setShowFilter] = useState(false);
  const isClient = useIsClient();
  const savedStories = useSelector(
    (state) => state?.rootReducer?.storyHistory?.history,
  );

  const handleChange = (e, p) => {
    setIsLoading(true);
    setPage(p);
    // Smooth scroll to top of content
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // The URL decides the category, so refresh, shared links and Back keep it selected.
  const activeCategory = categories.find((category) => category.slug === slug);

  useEffect(() => {
    if (slug === "my-saved-story") {
      dispatch(fetchStoryHistory());
      return;
    }
    BlogByCategoryApi(slug, PER_PAGE, page)
      .then((res) => {
        setData(res?.data?.data?.rows || []);
        setDataCount(res?.data?.data?.count || 0);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug, page, dispatch]);

  useEffect(() => {
    AllCategoryAPI()
      .then((res) => {
        setCategories(res.data || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Saved stories come from the store; every other category is fetched page by page.
  const stories = slug === "my-saved-story" ? savedStories ?? [] : data;

  // The same links fill the desktop sidebar and the mobile filter sheet.
  const renderCategoryLinks = (onNavigate) => (
    <div className={styles.categoryList}>
      {[...FIXED_CATEGORIES, ...categories].map((item) => (
        <Link
          key={item.slug}
          href={`/story/${item.slug}`}
          className={clsx(styles.categoryItem, slug === item.slug && styles.categoryItemActive)}
          aria-current={slug === item.slug ? "page" : undefined}
          onClick={onNavigate}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );

  const renderBlogs = () => {
    if (!isClient) return null;

    if (isLoading) {
      return (
        <div className={styles.loaderContainer}>
          <LoaderCircle size={48} className={styles.spinner} />
          <p className={styles.loaderText}>Fetching Stories...</p>
        </div>
      );
    }

    if (stories.length === 0) {
      return (
        <div className={styles.emptyState}>
          <p>No Stories Available</p>
        </div>
      );
    }

    return (
      <div className={styles.cardsGrid}>
        {stories.map((item, index) => (
          <div key={index} className={styles.cardWrapper}>
            <StoryCard
              title={item.heading}
              text={item.description}
              image={
                item.blog_attachment?.[0]?.file_name
                  ? `${Image_URL}${item.blog_attachment[0]?.file_name}`
                  : dummyStory
              }
              path={item.id}
              paid={item.type === "PAID"}
              locked={item.is_locked}
              input={item.input}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.blogsPage}>
      <StoriesBanner
        title={activeCategory?.title ?? DEFAULT_TITLE}
        uri={activeCategory?.file_name ?? ""}
        desc={activeCategory ? activeCategory.title : null}
      />

      <div className={styles.container}>
        <PlanNotice className={styles.planNotice} />

        {/* Mobile: categories open in a sheet from the left */}
        <Dialog open={showFilter} onOpenChange={setShowFilter}>
          <DialogTrigger className={styles.filterButton}>
            <Funnel size={20} aria-hidden="true" />
            <span>Filter</span>
          </DialogTrigger>
          <DialogContent title="Categories" side="left" className={styles.filterSheet}>
            {renderCategoryLinks(() => setShowFilter(false))}
          </DialogContent>
        </Dialog>

        <div className={styles.mainContent}>
          {/* Desktop Sidebar */}
          <aside className={styles.sidebar}>
            <h4 className={styles.sidebarTitle}>Categories</h4>
            {renderCategoryLinks()}
          </aside>

          {/* Content Area */}
          <main className={styles.content}>{renderBlogs()}</main>
        </div>

        {/* Pagination - Only show when there's data and multiple pages */}
        {!isLoading && stories.length > 0 && count > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              count={count}
              page={page}
              onChange={handleChange}
              size="large"
              siblingCount={1}
            />
          </div>
        )}

        {/* Chat Widget */}
        <StoryGeneratorLauncher />
      </div>
    </div>
  );
}

export default StoryListPage;
