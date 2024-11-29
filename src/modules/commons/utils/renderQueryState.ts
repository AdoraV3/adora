import { type UseQueryResult } from "@tanstack/react-query";

type StateViews<T> = {
  LoadingStateView: JSX.Element;
  ErrorStateView: JSX.Element | ((error: unknown) => JSX.Element);
  EmptyStateView?: JSX.Element;
  SuccessStateView: (
    data: UseQueryResult<T> & {
      data: NonNullable<UseQueryResult<T>["data"]>;
    },
  ) => JSX.Element;
  /**
   * Optional custom function to determine if the data should be considered empty
   * If not provided, falls back to checking if data is null/undefined or empty array
   */
  isEmpty?: (data: T) => boolean;
};

export function renderQueryState<T>(
  query: UseQueryResult<T>,
  options: StateViews<T>,
): JSX.Element;
export function renderQueryState<T>(
  query: UseQueryResult<T>,
  options: {
    LoadingStateView: JSX.Element;
    ErrorStateView: JSX.Element | ((error: unknown) => JSX.Element);
    SuccessStateView: (data: UseQueryResult<T>) => JSX.Element;
  },
): JSX.Element;
export function renderQueryState<T>(
  query: UseQueryResult<T>,
  {
    LoadingStateView,
    ErrorStateView,
    EmptyStateView,
    SuccessStateView,
    isEmpty: customIsEmpty,
  }: StateViews<T>,
): JSX.Element {
  if (query.isPending) {
    return LoadingStateView;
  }

  if (query.isError) {
    if (typeof ErrorStateView === "function") {
      return ErrorStateView(query.error);
    }
    return ErrorStateView;
  }

  const checkIsEmpty = (data: T | null | undefined): boolean => {
    if (data === null || data === undefined) return true;
    if (customIsEmpty) return customIsEmpty(data);
    if (Array.isArray(data)) return data.length === 0;
    return false;
  };
  const isEmpty = checkIsEmpty(query.data);

  if (isEmpty && EmptyStateView) {
    return EmptyStateView;
  }

  return SuccessStateView(
    query as UseQueryResult<T> & {
      data: NonNullable<UseQueryResult<T>["data"]>;
    },
  );
}
