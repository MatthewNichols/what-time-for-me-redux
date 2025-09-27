import fs from "fs";
import path from "path";
import crypto from "crypto";

/**
 * Returns a short hash of the file at the given path
 * @param {string} filePath The path to the file to get the hash for
 * @param {number} length The length of the hash, defaults to 10
 * @returns {string} Short hash of the file suitable for use in cache busting
 */
function getHash(filePath, length = 10) {
  const promise = new Promise((resolve, reject) => {
    const hash = crypto.createHash("md5");
    const rs = fs.createReadStream(filePath);
    rs.on("data", (chunk) => {
      hash.update(chunk);
    });

    rs.on("end", () => resolve(hash.digest("hex").slice(-length)));

    rs.on("error", (err) => reject(err));
  });

  return promise;
} 

/**
 * Register cache buster extension. Adds a filter to eleventy to cache bust urls.
 * @param {*} eleventyConfig The eleventy config object
 */
export function registerCacheBuster(eleventyConfig) {

  /**
   *  Cache busting. Creates a hash of the file and appends it to the url.
   *  @param {string} url The url to cache bust
   *  @returns {string} The cache busted url
   *  @note This will be one change behind when run in dev mode as the file is not yet built, 
   * but it will work in prod mode as the build is run sequentially
   */
  eleventyConfig.addFilter("cacheBustedUrl", async (url) => {

    if (url) {
      const filePath = path.join(process.cwd(), eleventyConfig.dir.output, url);
      try {
        const hashString = await getHash(filePath);
        return `${url}?v=${hashString}`;
      } catch (err) {
        // Just log the error to console so it is clear what is going on
        console.error(`Error getting cache busting hash for ${url}`, err);
      }
    }

    // This will catch any invalid urls. Probably doesn't do any good but it has the function be valid 
    return `${url}?v=${Date.now()}`;
  });

}