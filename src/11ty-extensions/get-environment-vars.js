import 'dotenv/config';

/**
 * Registers a fun
 * @param {*} eleventyConfig The eleventy config object
 */
export function registerGetEnvironmentVars(eleventyConfig) {
  eleventyConfig.addJavaScriptFunction("injectClientsideConfigVars", () => {
    const {
      MY_LOCATION_NAME, 
      MY_TIMEZONE, 
      AVAILABLE_START_HOUR, 
      AVAILABLE_END_HOUR 
    } = process.env;

    console.log("Injecting environment vars to clientside:", {
      ...process.env
    });

    return `window.CLIENTSIDE_CONFIG_VARS = ${JSON.stringify( {
      MY_LOCATION_NAME,
      MY_TIMEZONE,
      AVAILABLE_START_HOUR,
      AVAILABLE_END_HOUR
    })}`
  });

  eleventyConfig.addJavaScriptFunction('isDevMode', () => {
    return process.env.ELEVENTY_ENV === 'development';
  });
}