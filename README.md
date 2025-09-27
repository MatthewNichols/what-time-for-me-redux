# my-11ty-template
My starting point for new [11ty](https://www.11ty.dev/) projects. 11ty is a Jamstack static site generator that is simple to use/setup. It is easily hostable on Netlify, Github Pages or Cloudflare Pages, and countless other services.  

No guarentees, but I do make an effort to make it generally useful for a new project. It should run anywhere you can run NodeJs If you have any questions, comments, or suggestions, please let open an issue and I will try to respond as soon as I can.  

## Key Dependencies
- nodejs and npm (whatever 11ty requires)
- 11ty
- @11ty/eleventy-plugin-webc

## Usage
- Create a new repo using this as a template by clicking the `Use this template` button, or if you prefer there are some command line options here: https://stackoverflow.com/questions/62630485/is-it-possible-to-create-a-new-git-repository-from-a-template-only-using-the-com/#answer-62632065
- Clone the repo to your local machine
- Run `npm install` to install the dependencies
- Run `npm run dev` to start the development server and watch for changes
- If all is well, you should be able to view the site at http://localhost:8080

## Some 11ty stuff
First, the authoritative reference for 11ty is the [11ty docs](https://www.11ty.dev/docs/). 11ty (like many things) is a bit like German style board games; you can learn enough to get started in 30 minutes, but it will take you a long time to learn everything. But here are a few things that are specific to this setup:
- Layout files: Layout files are used to define the structure of your pages. They are defined in the `/src/pages/_includes/` directory.
- Front Matter: Front Matter is a way to add data to your pages. This data is available in your templates. In this setup in particular it is used to set the title of the page and the layout file being used. There is a defaults file at `/src/pages/pages.json` that sets some defaults for the site. Override in individual files as needed.
- Pages: If you want to create a new page, create a new file in the `/src/pages/` directory. The file name should be the name of the page, and you can use webc (*.webc), markdown (*.md), or Nunjucks (*.njk) in the file, depending on your needs and preferences.
- Components: Webc lets you create reusable components that can be used in your pages. Components are defined in the `/src/pages/_components/` directory. Nunjucks has simular functionality.
- Styling: out of the box you can use scss or css in the `/src/scss/` directory. The output will be output to `/styles-compiled/` prior to being copied to the `_site/styles/` directory. The output will be compiled to css and minified.
- Client side scripting: you can write client side scripts in the `/src/client-side/` directory as typescript. The output will be output to `/client-side-compiled/` prior to being copied to the `_site/scripts/` directory.
- Static assets: You can put static assets in the `/src/assets/` directory (which you need to create as git won't create empty directories). These will be copied to the `_site/` directory, preserving the directory structure. So if you have an image in `/src/assets/img/` it will be copied to `/_site/img/`, and any subdirectories will be created as needed.
- `.eleventy.js`: This is the main config file for 11ty. A couple of specific things to note:
  - `addPassthroughCopy` is pretty powerful. There are a fewe examples in the `.eleventy.js` file, and is what handles the copying of static assets mentioned above.
  - In particular, If you need to copy files to the root (like your favicon, robots.txt, etc) create a folder in `src` called `copy-to-root` and uncomment the line:
  `//eleventyConfig.addPassthroughCopy({"./src/copy-to-root/*": "."});`

## Markdown Features
[Markdown](https://commonmark.org/) is a neat way to write content in the cases where it is suffiant. It starts to break down a bit at the edges, but there are some nice extentions, some of which I have included in this template. Here are a few of the features that are included, along with a tip/trick or two:
- Use markdown in WebC components: If you include the following in a webc component or page:
  ```
  <template webc:type="11ty" 11ty:type="liquid,md">
  ## This is markdown

  - This is a list
  - of import things
  - rendered from markdown?
  </template>
  ```
  it will be rendered as html, and you can also use `liquid` template features. See more at the [11ty WebC docs](https://www.11ty.dev/docs/languages/webc/#using-template-syntax-to-generate-content)

- Attributes and fenced divs: the `markdown-it-attrs` (https://github.com/arve0/markdown-it-attrs) plugin allows you to add classes and ids to elements in markdown, and the 'markdown-it-div' (https://github.com/kickscondor/markdown-it-div) plugin allows you to add fenced divs in markdown.
  ```
  ### This is a markdown page

  This is a paragraph.

  This is a paragraph with a class. { .class-name }

  This is a paragraph with an id. { #id-name }

  ::: warning #id-name
  This is rendered in a div with a class of `warning` and an id of `id-name`
  :::

  ::: outer-div
  ### This is rendered in a div with a class of `outer-div`

  ::: inner-div
  This is rendered in a div with a class of `inner-div`
  :::

  ::: inner-div
  This is another rendered in a div with a class of `inner-div`
  :::

  :::
  ```
  The above will render as:
  ```html
  <h3>This is a markdown page</h3>
  <p>This is a paragraph.</p>
  <p class="class-name">This is a paragraph with a class.</p>
  <p id="id-name">This is a paragraph with an id.</p>

  <div class="warning" id="id-name">
    <h3>This is rendered in a div with a class of `warning` and an id of `id-name`</h3>
  </div>

  <div class="outer-div">
    <h3>This is rendered in a div with a class of `outer-div`</h3>
    <div class="inner-div">
      <h3>This is rendered in a div with a class of `inner-div`</h3>
    </div>
    <div class="inner-div">
      <h3>This is another rendered in a div with a class of `inner-div`</h3>
    </div>
  </div>
  ```
  See more at https://github.com/arve0/markdown-it-attrs


## Some package.json scripts
- `dev`: starts the development server and watches for changes
- `build`: builds the site and all assets
- `clean`: deletes the `_site` directory, and any of the intermediate build artifacts
- `serve-as-prod`: builds the site and all assets as a production build then serves the site without watching for changes
- `dev-no-js`: starts the development server and watches for changes, but doesn't build any of the client side scripts

## Desired improvements
- [x] ~~Add the excellent `markdown-it-attrs` (https://github.com/arve0/markdown-it-attrs) plugin to extend the markdown syntax to include classes and ids on elements.~~ Done. 
- [ ] Add walk through for hosting on github pages, netlify, cloudflare pages, etc
- [ ] Add walk through for scheduled deploy.
- [x] ~~Cache busting for assets & client side scripts~~ Done. Needs documentation

## License
MIT