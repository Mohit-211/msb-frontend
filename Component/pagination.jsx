import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./pagination.module.scss";

/**
 * Custom Pagination Component
 * @param {number} count - Total number of pages
 * @param {number} page - Current page (1-indexed)
 * @param {function} onChange - Callback function (event, page) => void
 * @param {string} size - Size variant: "small", "medium", "large"
 * @param {boolean} showFirstLast - Show first/last page buttons
 * @param {number} siblingCount - Number of siblings to show around current page
 */
function Pagination({
  count,
  page = 1,
  onChange,
  size = "medium",
  showFirstLast = false,
  siblingCount = 1,
}) {
  const handlePageChange = (newPage) => {
    if (newPage !== page && newPage >= 1 && newPage <= count) {
      onChange(null, newPage);
    }
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, count);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < count - 1;

    // Always show first page
    if (showFirstLast || page > 1) {
      pages.push(1);
    }

    // Left ellipsis
    if (showLeftEllipsis) {
      pages.push("ellipsis-left");
    }

    // Page numbers around current page
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== count) {
        pages.push(i);
      }
    }

    // Right ellipsis
    if (showRightEllipsis) {
      pages.push("ellipsis-right");
    }

    // Always show last page
    if (count > 1 && (showFirstLast || page < count)) {
      pages.push(count);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const sizeClass = styles[`pagination-${size}`];

  return (
    <nav
      className={`${styles.pagination} ${sizeClass}`}
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <button
        className={`${styles.pageButton} ${styles.navButton} ${
          page === 1 ? styles.disabled : ""
        }`}
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft
          size={size === "large" ? 24 : size === "small" ? 16 : 20}
        />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((pageNum, index) => {
        if (typeof pageNum === "string" && pageNum.startsWith("ellipsis")) {
          return (
            <span key={pageNum} className={styles.ellipsis}>
              ...
            </span>
          );
        }

        return (
          <button
            key={index}
            className={`${styles.pageButton} ${
              pageNum === page ? styles.active : ""
            }`}
            onClick={() => handlePageChange(pageNum)}
            aria-label={`Go to page ${pageNum}`}
            aria-current={pageNum === page ? "page" : undefined}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        className={`${styles.pageButton} ${styles.navButton} ${
          page === count ? styles.disabled : ""
        }`}
        onClick={() => handlePageChange(page + 1)}
        disabled={page === count}
        aria-label="Go to next page"
      >
        <ChevronRight
          size={size === "large" ? 24 : size === "small" ? 16 : 20}
        />
      </button>
    </nav>
  );
}

export default Pagination;
