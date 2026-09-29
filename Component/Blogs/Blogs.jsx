import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Filter, X, Loader2 } from "lucide-react";
import {
  BlogByCategoryApi,
  AllCategoryAPI,
  getLocalStorageItem,
} from "@/Constants/Api/Api";
import { Image_URL } from "@/Constants/host";
import dummyStory from "../../public/assets/dummystory.png";
import Banner from "../Banner/Banner";
import CardComponent from "../CardComponent/CardComponent";
import usePagination from "../usePagination";
import ChatWidget from "../ChatBox/ChatWidget";
import styles from "./Blogs.module.scss";
import { fetchStoryHistory } from "@/redux/storyHistorySlice";
import Pagination from "../pagination";

function Blogs() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { slug } = router.query;
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [blogTitle, setBlogTitle] = useState("My Story Bank 2.0");
  const [blogImage, setBlogImage] = useState("");
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const PER_PAGE = 6;
  const count = Math.ceil(dataCount / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);
  const [showFilter, setShowFilter] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const storedValue = getLocalStorageItem("UserLoginToken");
  const savedStories = useSelector(
    (state) => state?.rootReducer?.storyHistory?.history
  );

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
    // Smooth scroll to top of content
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (index, title = "My Story Bank", url = "") => {
    setBlogImage(url);
    setBlogTitle(title);
    setSelectedCategory(index);
    setPage(1); // Reset to page 1 when changing category
    const path =
      index === "all"
        ? `/story/all`
        : index === "my-saved-story"
        ? `/story/my-saved-story`
        : `/story/${categories[index]?.slug}`;
    router.push(path);
    setShowFilter(false);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (slug === "my-saved-story") {
      dispatch(fetchStoryHistory(storedValue));
      setIsLoading(false);
    } else {
      BlogByCategoryApi(slug, PER_PAGE, page)
        .then((res) => {
          setData(res?.data?.data?.rows || []);
          setDataCount(res?.data?.data?.count || 0);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
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

  useEffect(() => {
    if (slug === "my-saved-story" && savedStories?.length > 0) {
      setData(savedStories);
    }
  }, [savedStories, slug]);

  const renderBlogs = () => {
    if (!isClient) return null;

    if (isLoading) {
      return (
        <div className={styles.loaderContainer}>
          <Loader2 size={48} className={styles.spinner} />
          <p className={styles.loaderText}>Fetching Stories...</p>
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className={styles.emptyState}>
          <p>No Stories Available</p>
        </div>
      );
    }

    return (
      <div className={styles.cardsGrid}>
        {data.map((item, index) => (
          <div key={index} className={styles.cardWrapper}>
            <CardComponent
              title={item.heading}
              text={item.description}
              image={
                item.blog_attachment?.[0]?.file_name
                  ? `${Image_URL}${item.blog_attachment[0]?.file_name}`
                  : dummyStory
              }
              path={item.id}
              paid={item.type}
              input={item.input}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.blogsPage}>
      <Banner
        title={blogTitle}
        uri={blogImage}
        desc={isClient && blogTitle === "My Story Bank 2.0" ? null : blogTitle}
      />

      <div className={styles.container}>
        {/* Mobile Filter Button */}
        <button
          className={styles.filterButton}
          onClick={() => setShowFilter(true)}
          aria-label="Open filters"
        >
          <Filter size={20} />
          <span>Filter</span>
        </button>

        {/* Mobile Sidebar Overlay */}
        {showFilter && (
          <div
            className={styles.sidebarOverlay}
            onClick={() => setShowFilter(false)}
          >
            <div
              className={`${styles.sidebar} ${styles.sidebarMobile}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.sidebarHeader}>
                <h4 className={styles.sidebarTitle}>Categories</h4>
                <button
                  className={styles.closeButton}
                  onClick={() => setShowFilter(false)}
                  aria-label="Close filters"
                >
                  <X size={24} />
                </button>
              </div>

              <div className={styles.categoryList}>
                <button
                  className={`${styles.categoryItem} ${
                    selectedCategory === "all" ? styles.categoryItemActive : ""
                  }`}
                  onClick={() => handleCategoryClick("all")}
                >
                  All Category
                </button>
                <button
                  className={`${styles.categoryItem} ${
                    selectedCategory === "my-saved-story"
                      ? styles.categoryItemActive
                      : ""
                  }`}
                  onClick={() => handleCategoryClick("my-saved-story")}
                >
                  My Saved Story
                </button>
                {categories.map((item, index) => (
                  <button
                    key={index}
                    className={`${styles.categoryItem} ${
                      selectedCategory === index
                        ? styles.categoryItemActive
                        : ""
                    }`}
                    onClick={() =>
                      handleCategoryClick(index, item.title, item.file_name)
                    }
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className={styles.mainContent}>
          {/* Desktop Sidebar */}
          <aside className={styles.sidebar}>
            <h4 className={styles.sidebarTitle}>Categories</h4>
            <div className={styles.categoryList}>
              <button
                className={`${styles.categoryItem} ${
                  selectedCategory === "all" ? styles.categoryItemActive : ""
                }`}
                onClick={() => handleCategoryClick("all")}
              >
                All Category
              </button>
              <button
                className={`${styles.categoryItem} ${
                  selectedCategory === "my-saved-story"
                    ? styles.categoryItemActive
                    : ""
                }`}
                onClick={() => handleCategoryClick("my-saved-story")}
              >
                My Saved Story
              </button>
              {categories.map((item, index) => (
                <button
                  key={index}
                  className={`${styles.categoryItem} ${
                    selectedCategory === index ? styles.categoryItemActive : ""
                  }`}
                  onClick={() =>
                    handleCategoryClick(index, item.title, item.file_name)
                  }
                >
                  {item.title}
                </button>
              ))}
            </div>
          </aside>

          {/* Content Area */}
          <main className={styles.content}>{renderBlogs()}</main>
        </div>

        {/* Pagination - Only show when there's data and multiple pages */}
        {!isLoading && data && data.length > 0 && count > 1 && (
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
        <ChatWidget />
      </div>
    </div>
  );
}

export default Blogs;
