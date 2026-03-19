import { PaginationMeta } from '../interfaces/api-response.interface';

export function buildPaginationMeta(
  total: number,
  page: number,
  pageSize: number,
): PaginationMeta {
  return {
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  };
}

export function buildSkip(page: number, pageSize: number): number {
  return (page - 1) * pageSize;
}
