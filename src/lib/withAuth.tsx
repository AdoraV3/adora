"use server";

import { validateRequest } from "./validateRequest";

export async function withAuth<P extends object>(
  Component: React.ComponentType<P>,
) {
  return async function ValidatedPage(props: P) {
    await validateRequest();

    // If the user is authenticated, render the wrapped component
    return <Component {...props} />;
  };
}
