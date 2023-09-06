/**
 * Paginate data.
 * 
 * @param {Array} data - The entire dataset.
 * @param {number} itemsPerPage - Number of items per page.
 * @param {number} [startIndex=0] - Starting index for the pagination.
 * @returns {Object} - Paginated data, metadata about the pagination.
 */
const utilPaginationData = (data, itemsPerPage, startIndex = 0) => {
    const endIndex = startIndex + itemsPerPage;

    // Extract the required data for the current page
    const paginatedData = data.slice(startIndex, endIndex);

    // Calculate metadata
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentPage = Math.floor(startIndex / itemsPerPage) + 1; // +1 because we're starting from page 1, not 0
    const hasPreviousPage = startIndex > 0;
    const hasNextPage = endIndex < data.length;

    return {
        data: paginatedData,
        totalPages,
        currentPage,
        itemsPerPage,
        hasPreviousPage,
        hasNextPage,
        startIndex,
        endIndex
    };
}

export default utilPaginationData;