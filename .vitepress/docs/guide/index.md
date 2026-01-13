# Gettings started

## Introduction

### Features

- **AST-Based Serialization**\
  Converts Markdown into valid Markdown.

- **Programmatic Builder API**\
  Enables deterministic, type-safe construction of Markdown documents.

- **Semantic-Preserving Transformations**  
  Allows structural modifications without altering the intended meaning.

- **Extensibility**\
  Supports common Markdown extensions (e.g., tables, task lists).

- **Deterministic Output**\
  Ensures stable, reproducible Markdown generation independent of input formatting.

### Flavors

We support all available elements in flavors:

- GitHub
- markdown-it
- Vitepress

## Installation

### Prerequisites

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
