import { createTheming, ThemingType } from "@callstack/react-theme-provider";
import { defaultTheme, ThemeConfig } from "@arweave-wallet-kit/core/theme";

export const lightTheme: DisplayTheme = {
  primaryText: "0, 0, 0",
  background: "255, 255, 255",
  secondaryText: "146, 146, 147",
  light: "242, 242, 247",
};

export const darkTheme: DisplayTheme = {
  primaryText: "240, 240, 240",
  background: "26, 27, 31",
  secondaryText: "161, 161, 161",
  light: "44, 45, 49",
};

export interface DisplayTheme {
  background: string;
  primaryText: string;
  secondaryText: string;
  light: string;
}

export interface DefaultTheme extends DisplayTheme {
  displayTheme: "dark" | "light";
  theme: string;
  themeConfig: ThemeConfig;
}

export interface Theming extends ThemingType<DefaultTheme> {
  ThemeProvider: React.ComponentType<
    React.PropsWithChildren<{ children: React.ReactNode; theme?: DefaultTheme }>
  >;
}

const theming = createTheming<DefaultTheme>({
  displayTheme: "light",
  theme: "0, 0, 0",
  themeConfig: defaultTheme,
  ...lightTheme,
});

export const { ThemeProvider, useTheme } = theming;

// this fixes "withTheme" being undefined on build or dev
// the issue occurs because the theme provider context only
// works in the browser or on client side, but Linaria Vite
// tries to eval it regardless
// during evaluation, some components are outside the theme
// provider context and some are not
// the components that are outside throw the undefined error
// naturally on production use, this will never happen, as
// the users need to wrap their application with the
// <ArweaveWalletKit> component anyway
export const withTheme =
  theming.withTheme || ((val) => val as ThemingType<DefaultTheme>["withTheme"]);

export const unifyClassNames = (...classNames: string[]) =>
  classNames.filter((val) => !!val && val !== "").join(" ");
