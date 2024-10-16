import { RGBObject } from "./types";

/** Convert an RGB object to an RGB string */
export const rgbToString = (rgb: RGBObject) => `${rgb.r}, ${rgb.g}, ${rgb.b}`;
