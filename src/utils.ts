import { encodePath } from "ufo";

export function formatPathSegment(segment: string): string {
  const routePathWithLeadingSlash = getRoutePath(parseSegment(segment));

  return routePathWithLeadingSlash.slice(1);
}

// Everything below is from nuxt/src/pages/utils.ts but was not exported so I copied it instead

enum SegmentParserState {
  initial,
  static,
  dynamic,
  optional,
  catchall,
}

enum SegmentTokenType {
  static,
  dynamic,
  optional,
  catchall,
}

interface SegmentToken {
  type: SegmentTokenType;
  value: string;
}

function getRoutePath(tokens: SegmentToken[]): string {
  return tokens.reduce((path, token) => {
    return (
      path +
      (token.type === SegmentTokenType.optional
        ? `:${token.value}?`
        : token.type === SegmentTokenType.dynamic
        ? `:${token.value}()`
        : token.type === SegmentTokenType.catchall
        ? `:${token.value}(.*)*`
        : encodePath(token.value).replace(/:/g, "\\:"))
    );
  }, "/");
}

const PARAM_CHAR_RE = /[\w\d_.]/;

function parseSegment(segment: string) {
  let state: SegmentParserState = SegmentParserState.initial;
  let i = 0;

  let buffer = "";
  const tokens: SegmentToken[] = [];

  function consumeBuffer() {
    if (!buffer) {
      return;
    }
    if (state === SegmentParserState.initial) {
      throw new Error("wrong state");
    }

    tokens.push({
      type:
        state === SegmentParserState.static
          ? SegmentTokenType.static
          : state === SegmentParserState.dynamic
          ? SegmentTokenType.dynamic
          : state === SegmentParserState.optional
          ? SegmentTokenType.optional
          : SegmentTokenType.catchall,
      value: buffer,
    });

    buffer = "";
  }

  while (i < segment.length) {
    const c = segment[i];

    switch (state) {
      case SegmentParserState.initial:
        buffer = "";
        if (c === "[") {
          state = SegmentParserState.dynamic;
        } else {
          i--;
          state = SegmentParserState.static;
        }
        break;

      case SegmentParserState.static:
        if (c === "[") {
          consumeBuffer();
          state = SegmentParserState.dynamic;
        } else {
          buffer += c;
        }
        break;

      case SegmentParserState.catchall:
      case SegmentParserState.dynamic:
      case SegmentParserState.optional:
        if (buffer === "...") {
          buffer = "";
          state = SegmentParserState.catchall;
        }
        if (c === "[" && state === SegmentParserState.dynamic) {
          state = SegmentParserState.optional;
        }
        if (
          c === "]" &&
          (state !== SegmentParserState.optional ||
            buffer[buffer.length - 1] === "]")
        ) {
          if (!buffer) {
            throw new Error("Empty param");
          } else {
            consumeBuffer();
          }
          state = SegmentParserState.initial;
        } else if (PARAM_CHAR_RE.test(c)) {
          buffer += c;
        } else {
          // console.debug(`[pages]Ignored character "${c}" while building param "${buffer}" from "segment"`)
        }
        break;
    }
    i++;
  }

  if (state === SegmentParserState.dynamic) {
    throw new Error(`Unfinished param "${buffer}"`);
  }

  consumeBuffer();

  return tokens;
}
