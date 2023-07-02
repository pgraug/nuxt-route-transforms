import { defineNuxtModule, extendPages } from "@nuxt/kit";
import { formatPathSegment } from "./utils";
import { NuxtPage } from "@nuxt/schema";

interface Transforms {
  [key: string]: string | boolean | Transforms | [string | boolean, Transforms];
}

interface ParsedTransforms {
  [key: string]: string | false;
}

// Module options TypeScript interface definition
export interface ModuleOptions {
  transforms?: Transforms;
  baseUrl?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-route-transform",
    configKey: "routeTransform",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    baseUrl: "/",
  },
  setup(options, nuxt) {
    if (!options.transforms) return;

    const parsedTransforms = parseTransforms(options.transforms);

    console.dir(parsedTransforms);
    extendPages((pages) => {
      // transform routes
      pages = transformPages(pages, parsedTransforms);

      // print all routes
      pages.forEach((page) => {
        console.dir(page);
      });
    });
  },
});

function parseTransforms(
  transforms: Transforms,
  pathPrefix: string = ""
): ParsedTransforms {
  const transformEntries = Object.entries(transforms);
  return transformEntries.reduce((acc, [key, value]) => {
    if (value === false) {
      return {
        ...acc,
        [`${pathPrefix}/${formatPathSegment(key)}`]: false,
      };
    } else if (typeof value === "string") {
      return {
        ...acc,
        [`${pathPrefix}/${formatPathSegment(key)}`]: `${pathPrefix}/${value}`,
      };
    } else if (Array.isArray(value) && value.length === 2) {
      return {
        ...acc,
        ...parseTransforms(value[1], `${pathPrefix}/${formatPathSegment(key)}`),
        ...parseTransforms({ [key]: value[0] }, pathPrefix),
      };
    } else if (typeof value === "object") {
      return {
        ...acc,
        ...parseTransforms(value, `${pathPrefix}/${formatPathSegment(key)}`),
      };
    }
    return acc;
  }, {});
}

function transformPage(page: NuxtPage, parsedTransforms: ParsedTransforms) {
  return Object.entries(parsedTransforms).reduce(
    (pageAcc: NuxtPage | undefined, [from, to]) => {
      if (pageAcc === undefined) return;

      const pathWithTrailingSlash = pageAcc.path + "/";
      if (!pathWithTrailingSlash.startsWith(from + "/")) return pageAcc;

      if (to === false) return;

      return {
        ...pageAcc,
        path: to + pageAcc.path.slice(from.length),
      };
    },
    page
  );
}

function transformPages(pages: NuxtPage[], parsedTransforms: ParsedTransforms) {
  return pages.reduce((acc: NuxtPage[], page) => {
    const transformedPage = transformPage(page, parsedTransforms);

    if (transformedPage === undefined) return acc;

    return [...acc, transformedPage];
  }, [] as NuxtPage[]);
}
