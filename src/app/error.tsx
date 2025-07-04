"use client";
import ErrorPage from "@/pages/Error";

type ErrorParams = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorParams) {
  return <ErrorPage error={error} reset={reset} />;
}
