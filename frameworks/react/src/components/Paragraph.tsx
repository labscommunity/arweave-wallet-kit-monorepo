import styles from "@arweave-wallet-kit/styles/dist/text/paragraph.module.css";
import type { HTMLProps } from "react";
import { cx } from "@linaria/core";

export const Paragraph = ({ children, className, small, ...props }: HTMLProps<HTMLParagraphElement> & Props) => (
  <p
    className={cx(styles.paragraph, small && styles.small, className)}
    {...props}
  >
    {children}
  </p>
);

interface Props {
  small?: boolean;
}
