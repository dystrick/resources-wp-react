import { extendTheme, theme as baseTheme } from "@chakra-ui/react";
import merge from "deepmerge";
import { isJSON } from "@/lib/helpers";

const config = {
  cssVarPrefix: "wp-resources-pro",
  initialColorMode: "light",
  useSystemColorMode: false,
};

const fonts = {
  body: `-apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  heading: `-apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  mono: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
};

const components = {
  Input: {
    parts: ["field", "addon"],
    baseStyle: {
      field: {
        bgColor: "white !important",
      },
    },
    variant: {
      outline: {
        field: {
          bgColor: "white !important",
        },
      },
      unstyled: {},
      filled: {},
      flushed: {},
    },
  },
  Checkbox: {
    parts: ["control"],
    baseStyle: {
      control: {
        bgColor: "white",
      },
    },
  },
};

const styles = {
  global: () => ({
    body: {
      fontFamily: null,
      color: null, // mode("gray.800", "whiteAlpha.900")(props),
      bg: null, // mode("white", "gray.800")(props),
    },
    img: {
      "&.alignleft": {
        float: "left",
        margin: "0 1em 1em 0",
      },
      "&.aligncenter": {
        display: "block",
        margin: "0 auto 1em",
      },
      "&.alignright": {
        float: "right",
        margin: "0 0 1em 1em",
      },
    },
    a: {
      img: {
        "&.alignleft": {
          float: "left",
          margin: "0 1em 1em 0",
        },
        "&.aligncenter": {
          display: "block",
          margin: "0 auto 1em",
        },
        "&.alignright": {
          float: "right",
          margin: "0 0 1em 1em",
        },
      },
    },
  }),
};

export const defaultTheme = extendTheme({
  config,
  fonts,
  components,
  styles,
});

export function generateTheme({
  theme,
  ...args
}: {
  theme: string;
  [key: string]: any;
}) {
  const customThemeObj = isJSON(theme) ? JSON.parse(theme) : {};
  let customTheme = merge(defaultTheme, customThemeObj);

  for (let key in args) {
    if (baseTheme.hasOwnProperty(key)) {
      for (let property in args[key]) {
        if (args[key][property]) {
          customTheme[key] = customTheme[key] || {};
          customTheme.fonts[property] = args[key][property];
        }
      }
    }
  }

  return extendTheme(customTheme);
}
