/** Customizeable theme config */
export interface ThemeConfig {
  displayTheme: "dark" | "light";
  accent: RGBObject;
  titleHighlight: RGBObject;
  radius: Radius;
}

/** RGB color object */
export interface RGBObject {
  r: number;
  g: number;
  b: number;
}

/** Border radius theme */
export type Radius = "default" | "minimal" | "none";
