import styles from "@arweave-wallet-kit/styles/dist/loading.module.css";
import type { HTMLProps } from "react";
import { cx } from "@linaria/core";

export const Loading = ({ className, ...props }: HTMLProps<SVGElement>) => (
  <svg
    className={cx(styles.loading, className)}
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    {...(props as any)}
  >
    <circle
      cx="24"
      cy="24"
      fill="none"
      r="20"
      strokeDasharray="80"
      strokeLinecap="round"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <circle
      cx="24"
      cy="24"
      fill="none"
      opacity="0.3"
      r="20"
      strokeLinecap="round"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
  </svg>
);
