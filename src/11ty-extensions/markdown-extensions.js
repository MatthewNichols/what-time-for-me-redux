import markdownItAttrs from "markdown-it-attrs";
import markdownItDiv from "markdown-it-div";

/**
 * Adds markdown extensions to eleventy's markdown parser.
 * @param {*} eleventyConfig 
 */
export function registerMarkdownExtensions(eleventyConfig) {
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItAttrs));
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItDiv));
}