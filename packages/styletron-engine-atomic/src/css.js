// @flow strict

declare var __DEV__: boolean;

import hyphenate from "./hyphenate-style-name.js";

export function atomicSelector(id: string, pseudo: string): string {
  let selector = `.${id}`;
  if (pseudo) {
    selector += pseudo;
  }
  return selector;
}

export function keyframesToBlock(keyframes: Object): string {
  if (__DEV__ && typeof Object.getPrototypeOf(keyframes) !== "undefined") {
    if (Object.getPrototypeOf(keyframes) !== Object.getPrototypeOf({})) {
      // eslint-disable-next-line no-console
      console.warn(
        "Only plain objects should be used as animation values. Unexpectedly recieved:",
        keyframes,
      );
    }
  }
  let result = "";
  for (const prop in keyframes) {
    if (Object.prototype.hasOwnProperty.call(keyframes, prop)) {
      result += `${prop}{${declarationsToBlock(keyframes[prop])}}`;
    }
  }
  return result;
}

export function declarationsToBlock(style: Object): string {
  let css = "";
  for (const prop in style) {
    const val = style[prop];
    if (typeof val === "string" || typeof val === "number") {
      css += `${hyphenate(prop)}:${val};`;
    }
  }
  // trim trailing semicolon
  return css.slice(0, -1);
}

export function keyframesBlockToRule(id: string, block: string): string {
  return `@keyframes ${id}{${block}}`;
}

export function fontFaceBlockToRule(id: string, block: string): string {
  return `@font-face{font-family:${id};${block}}`;
}

export function styleBlockToRule(selector: string, block: string): string {
  return `${selector}{${block}}`;
}
