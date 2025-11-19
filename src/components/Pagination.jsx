import React from "react";

const PAGE_SIZE = 10;

export default function Pagination({ length, page, setPage }) {
    const totalPages = Math.max(1, Math.ceil(length / PAGE_SIZE));
    const safePage = Math.min(Math.max(1, page), totalPages);

    // Auto-correct page (example: filter reduces number of pages)
    if (safePage !== page) setPage(safePage);

    return totalPages > 1 ? (
        <div className="flex justify-center items-center gap-4 py-6 text-[#C7FCEC]">
            <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="px-4 py-2 bg-[#121A22] rounded disabled:opacity-50"
            >
                Prev
            </button>

            <span>Page {safePage} of {totalPages}</span>

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

export { PAGE_SIZE };