import React from "react";

const PAGE_SIZE = 10; // Number of items displayed per page

export default function Pagination({ length, page, setPage }) {
    // Calculate how many pages are needed based on item count
    const totalPages = Math.max(1, Math.ceil(length / PAGE_SIZE));

    // Ensure the current page never goes out of range
    const safePage = Math.min(Math.max(1, page), totalPages);

    // Auto-fix page number if data shrinks (e.g., filtering reduces total items)
    if (safePage !== page) setPage(safePage);

    // Only show pagination controls if more than one page exists
    return totalPages > 1 ? (
        <div className="flex justify-center items-center gap-4 py-6 text-[#C7FCEC]">
            
            {/* Go to previous page — disabled on page 1 */}
            <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="px-4 py-2 bg-[#121A22] rounded disabled:opacity-50"
            >
                Prev
            </button>

            {/* Display current page number and total pages */}
            <span>
                Page {safePage} of {totalPages}
            </span>

            {/* Go to next page — disabled on last page */}
            <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="px-4 py-2 bg-[#121A22] rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    ) : null;
}

// Export page size so parent components can use it for slicing logic
export { PAGE_SIZE };