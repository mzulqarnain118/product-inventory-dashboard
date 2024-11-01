interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
import styles from "./Pagination.module.css";

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  // Validate props to ensure they are in a reasonable range
  if (totalItems < 0 || itemsPerPage <= 0 || currentPage < 1) {
    console.warn("Invalid pagination parameters");
    return null; // Render nothing if parameters are invalid
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Edge case: if there are no pages, render nothing
  if (totalPages === 0) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex justify-between items-center mt-4 px-4">
      <span className="text-sm font-normal text-gray-500">
        Showing{" "}
        <span className="font-semibold">
          {(currentPage - 1) * itemsPerPage + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold">
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{" "}
        of <span className="font-semibold">{totalItems}</span> results
      </span>
      <div className="flex">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={` ${
              styles["pagination-button"]
            } mx-1 px-3 py-1 rounded-lg text-sm transition duration-150 ease-in-out ${
              currentPage === index + 1
                ? `${styles["active"]} bg-blue-500 text-white`
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            aria-current={currentPage === index + 1 ? "page" : undefined} // Accessibility improvement
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
