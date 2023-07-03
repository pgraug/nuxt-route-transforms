import { defineNuxtModule, extendPages } from "@nuxt/kit";
import { formatPathSegment } from "./utils";
import { NuxtPage } from "@nuxt/schema";

interface RouteTransforms {
  [key: string]:
    | string
    | boolean
    | RouteTransforms
    | [string | boolean, RouteTransforms];
}

interface ParsedTransforms {
  [key: string]: string | false;
}

// Module options TypeScript interface definition
export interface ModuleOptions extends RouteTransforms {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-route-transforms",
    configKey: "routeTransforms",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(transforms: RouteTransforms) {
    if (!transforms) return;

    const parsedTransforms = parseTransforms(transforms);

    extendPages((pages) => {
      // Transform routes
      const transformedPages = transformPages(pages, parsedTransforms);

      // Replace pages with transformed pages
      pages.length = 0;
      pages.push(...transformedPages);
    });
  },
});

function parseTransforms(
  transforms: RouteTransforms,
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

function transformPages(
  pages: NuxtPage[],
  parsedTransforms: ParsedTransforms,
  pathPrefix: string = ""
) {
  return pages.reduce((pagesAcc: NuxtPage[], page) => {
    // Transform potential children first
    if (page.children && page.children.length > 0) {
      page.children = transformPages(
        page.children ?? [],
        parsedTransforms,
        page.path + "/"
      );
    }

    for (const [from, to] of Object.entries(parsedTransforms)) {
      const pathWithSlash = pathPrefix + page.path + "/";
      const fromWithSlash = from + "/";

      const isMatch = pathWithSlash.startsWith(fromWithSlash);
      const onlyMatchesParent = fromWithSlash.length <= pathPrefix.length;

      // Skip transform if the paths don't match or if the transform only matches the parent
      if (!isMatch || onlyMatchesParent) continue;

      // Delete page if transform is false
      if (to === false) return pagesAcc;

      // Apply transform
      page = {
        ...page,
        path: (to + page.path.slice(from.length)).slice(pathPrefix.length),
      };
    }

    return [...pagesAcc, page];
  }, [] as NuxtPage[]);
}
