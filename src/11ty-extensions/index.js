import { registerCacheBuster } from "./cache-buster.js";
import { registerGetEnvironmentVars } from "./get-environment-vars.js";
import { registerMarkdownExtensions } from "./markdown-extensions.js";

export function registerExtensions(eleventyConfig) {
  registerCacheBuster(eleventyConfig);
  registerGetEnvironmentVars(eleventyConfig);
  registerMarkdownExtensions(eleventyConfig);
}