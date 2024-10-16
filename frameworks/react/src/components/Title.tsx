import styles from "@arweave-wallet-kit/styles/dist/text/title.module.css";
import type { HTMLProps } from "react";
import { cx } from "@linaria/core";

export const Title = ({ children, className, small, themed, ...props }: HTMLProps<HTMLHeadingElement> & TitleProps) => (
  <h1
    className={cx(styles.title, small && styles.small, themed && styles.themed, className)}
    {...props}
  >
    {children}
  </h1>
);

interface TitleProps {
  small?: boolean;
  themed?: boolean;
}

export const TitleWithParagraph = ({ children, className, ...props }: HTMLProps<HTMLDivElement>) => (
  <div
    className={cx(styles.withParagraph, className)}
    {...props}
  >
    {children}
  </div>
);
