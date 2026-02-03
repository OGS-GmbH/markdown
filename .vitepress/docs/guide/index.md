---
prev: false
next: false
---

# Gettings started

## Installation

- Node.js version 18 or higher.
- A package manager: e.g. npm, pnpm, ...

::: code-group

```sh [npm]
$ npm install @ogs-gmbh/markdown
```

```sh [pnpm]
$ pnpm add @ogs-gmbh/markdown
```

```sh [yarn]
$ yarn add @ogs-gmbh/markdown
```

```sh [bun]
$ bun add @ogs-gmbh/markdown
```

:::

## Building

Markdown can now be easily build. But make sure to import it first with your Markdown elements.

```ts [example.ts]
import { define } from "@ogs-gmbh/markdown";
```

Now you can start adding Markdown elements. Each element has an example. Just check it out at [reference](/reference/).
