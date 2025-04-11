import React from "react";

const Pagination = ({ pages, onPageChange }) => {
  const { totalPages, currentPage } = pages;

  const generatePages = () => {
    const pageList = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageList.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pageList.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pageList.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageList.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pageList;
  };

  const handleClick = (page) => {
    if (page !== "..." && page !== currentPage) {
      onPageChange(page);
    }
  };

  const styles = {
    wrapper: {
      textAlign: "center",
      marginTop: "20px",
    },
    list: {
      display: "inline-flex",
      paddingLeft: 0,
      listStyle: "none",
      borderRadius: "0.25rem",
    },
    item: {
      margin: "0 4px",
    },
    button: {
      color: "#007bff",
      border: "1px solid #dee2e6",
      backgroundColor: "#fff",
      padding: "6px 12px",
      borderRadius: "4px",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    hover: {
      backgroundColor: "#f2f2f2",
      borderColor: "#007bff",
    },
    active: {
      backgroundColor: "#007bff",
      borderColor: "#007bff",
      color: "#fff",
      cursor: "default",
    },
    disabled: {
      color: "#6c757d",
      pointerEvents: "none",
      backgroundColor: "#fff",
      borderColor: "#dee2e6",
      cursor: "not-allowed",
    },
  };

  return (
    <nav style={styles.wrapper}>
      <ul style={styles.list}>
        <li style={styles.item}>
          <button
            style={{
              ...styles.button,
              ...(currentPage === 1 ? styles.disabled : {}),
            }}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
        </li>

        {generatePages().map((page, index) => (
          <li key={index} style={styles.item}>
            <button
              style={{
                ...styles.button,
                ...(page === currentPage ? styles.active : {}),
                ...(page === "..." ? styles.disabled : {}),
              }}
              onClick={() => handleClick(page)}
              disabled={page === "..."}
            >
              {page}
            </button>
          </li>
        ))}

        <li style={styles.item}>
          <button
            style={{
              ...styles.button,
              ...(currentPage === totalPages ? styles.disabled : {}),
            }}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
