import '../../css/Pagination.css';

const Pagination = ({
  currentPage,
  totalPages,
  paginate,
  itemsPerPage,
  totalItems,
}) => {
  const pageNumbers = [];
  const maxPageNumbers = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  if (endPage - startPage + 1 < maxPageNumbers) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} products
      </div>
      
      <div className="pagination-controls">
        <button
          onClick={() => paginate(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>

        {startPage > 1 && (
          <>
            <button 
              onClick={() => paginate(1)} 
              className="pagination-btn"
            >
              1
            </button>
            {startPage > 2 && <span className="pagination-ellipsis">...</span>}
          </>
        )}

        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
            <button 
              onClick={() => paginate(totalPages)} 
              className="pagination-btn"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;