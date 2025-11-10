interface PaginationFnParams {
    data: any,
    currentPage: number | 1,
    limit? : number | 10
}


export const paginationFn = ({data, currentPage = 1, limit = 10} : PaginationFnParams) => {

    const totalData = data.length || 0
    const totalPage = Math.ceil(totalData / limit)
    const skip = (currentPage - 1) * limit

    return {
        totalPage,
        limit,
        skip
    }
}

export const manualPaginationFn = ({data, currentPage = 1, limit = 10} : PaginationFnParams) => {

    
    const totalData = data.length
    const totalPage = Math.ceil(totalData / limit)
    
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedData = data.slice(startIndex, endIndex);

    return {
        data: paginatedData,
        totalPage
    }
}