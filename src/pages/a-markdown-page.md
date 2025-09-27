---
title: A Markdown Page
---

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