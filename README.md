# nuxt-route-transforms

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt module for transforming routes. Useful for i18n, multi-tenant apps and disabling routes

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/pgraug/nuxt-route-transforms?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- 🖋️ &nbsp;Rename and disable routes
- 🤝 &nbsp;Works with both /pages and manually added routes
- 🪜 &nbsp;Supports nested routes too

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
    /* Transforms go here */
  },
});
```

That's it! You can now use nuxt-route-transforms in your Nuxt app ✨

## Transform config format

Route transforms are configured in the `routeTransforms` part of your `nuxt.config.ts` like this:

```js
export default defineNuxtConfig({
  routeTransforms: {
    // Renaming a route: This renames /cheeses to /fromages. (Also affects subroutes)
    cheeses: "fromages",

    // Disabling routes: This removes the /jams route and it's subroutes (true doesn't do anything so you can use a boolean determine if it should be disabled or not)
    jams: false,

    //  Use an object to rename or disable subroutes but not their parent route
    // It's typed the same as 'routeTransforms' itself
    souffles: {
      // This renames /souffles/lemon to /souffles/citron
      lemon: "citron",
    },

    // Finally you can rename or disable both a parent route and its subroutes using an array with two items
    soups: [
      // The first item works like the first two examples. A string renames the route and false disables it and its subroutes
      "soupe",

      // The second items is an object and works the same as the third example.
      // It's typed the same as 'routeTransforms' itself
      {
        fish: "poisonns",
        "big-mac": false,
      },
    ],
  },
});
```

I know it seems a little weird but I found it to be the simplest way to support transforming routes at multiple levels of the route tree.

Very open to other ideas though.

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Develop with the playground
pnpm run dev

# Build the playground
pnpm run dev:build

# Run ESLint
pnpm run lint

# Run Vitest
pnpm run test
pnpm run test:watch

# Release new version
pnpm run release
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
