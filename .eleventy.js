import pluginWebc from "@11ty/eleventy-plugin-webc";
import { registerExtensions } from "./src/11ty-extensions/index.js";

// If you have short codes
//const registerShortCodes = require("./src/short-codes/");

export default function(eleventyConfig) {
  eleventyConfig.setServerOptions({
    showAllHosts: true
  });
  
  // Copy assets to _site. see https://www.11ty.dev/docs/copy/ for more info
  eleventyConfig.addPassthroughCopy({"./src/assets": "/"});
  eleventyConfig.addPassthroughCopy({"./client-side-compiled/**/*": "scripts"});
  eleventyConfig.addPassthroughCopy({"./styles-compiled/**/*": "styles"});
  
  // If you need to copy files to the root (like your favicon, robots.txt, etc) 
  // create a folder in src called copy-to-root and uncomment the line below
  //eleventyConfig.addPassthroughCopy({"./src/copy-to-root/*": "."});

  /* If you have any libs being pulled from node_modules you might do it like below */
  //eleventyConfig.addPassthroughCopy({"./node_modules/swiper/*swiper-bundle.min.js": "scripts/libs"});

  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setDataDeepMerge(false);

  eleventyConfig.addPlugin(pluginWebc, {
    components: [
      "src/pages/_components/**/*.webc"
    ]
  });

  registerExtensions(eleventyConfig);

  // If you have short codes
  //registerShortCodes(eleventyConfig);
    
  return {
    dir: {
      input: "src/pages",
    }
  }
};