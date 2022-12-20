import { PaginationProps } from "../../pagination.types";

export type UsePaginationProps = Pick<
  PaginationProps,
  "activePage" | "pageCount"
> & {
  siblingCount?: number;
};
