export interface PaginateOptions {
  limit: number;
  currentPage: number;
  total?: boolean;
}

export interface PaginationResult<T> {
  limit: number;
  found: number;
  page?: number;
  total?: number;
  data: T[];
}

export const defaultPaginationOptions: PaginateOptions = {
  limit: 8,
  currentPage: null,
  total: true,
};

// export async function paginate<T>(
//     query: ExpressQuery,
//     options: PaginateOptions = {
//         limit: 8,
//         currentPage: 1
//     }
// ): Promise<PaginationResult<T>> {
//     const offset = (options.currentPage -1) * options.limit;
// }
