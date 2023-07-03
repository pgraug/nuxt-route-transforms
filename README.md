# nuxt-route-transforms

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

My new Nuxt module for doing amazing things.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-route-transforms?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->

- ⛰ &nbsp;Foo
- 🚠 &nbsp;Bar
- 🌲 &nbsp;Baz

## Quick Setup

1. Add `nuxt-route-transforms` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-route-transforms

# Using yarn
yarn add --dev nuxt-route-transforms

# Using npm
npm install --save-dev nuxt-route-transforms
```

2. Add `nuxt-route-transforms` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["nuxt-route-transforms"],
});
```

3. Add a `routeTransforms` section to your `nuxt.config.ts` to start transforming routes

```js
export default defineNuxtConfig({
  routeTransforms: {
    /* 
    // Transforms /cheese to /fromage
    transforms: { cheese: 'fromage' },
  */
  },
});
```

That's it! You can now use nuxt-route-transforms in your Nuxt app ✨

## Transform config form

I know... I know

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-route-transforms/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-route-transforms
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-route-transforms.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-route-transforms
[license-src]: https://img.shields.io/npm/l/nuxt-route-transforms.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-route-transforms
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
