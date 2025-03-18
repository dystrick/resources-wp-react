"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Global, css } from "@emotion/react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { ResourcesWP } from "@/lib/client";
import { generateTheme } from "@/styles/theme";
import GlobalStyles from "@/styles/GlobalStyles";

export const ResourcesContext = createContext<{
  basePath: string | undefined;
  client: ResourcesWP;
  settings: any;
} | null>(null);

export function useResourcesContext() {
  const context = useContext(ResourcesContext);

  if (!context) {
    throw new Error("useResourcesContext must be used within a Provider");
  }

  return context;
}

export function Provider({
  children,
  baseUrl,
  basePath,
}: {
  children: React.ReactNode;
  baseUrl?: string;
  basePath?: string;
}) {
  const client = new ResourcesWP({
    baseUrl,
  });

  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    if (!client) return;

    client.getSettings().then((res) => setSettings(res.data));
  }, [baseUrl]);

  if (!client) {
    throw new Error("ResourcesWP client is not initialized");
  }

  if (!settings) {
    return null;
  }

  const theme = generateTheme({
    theme: settings.theme_json,
    fonts: {
      body: settings.theme_body_font_family,
      heading: settings.theme_heading_font_family,
      mono: settings.theme_mono_font_family,
    },
  });

  return (
    <ResourcesContext.Provider value={{ basePath, client, settings }}>
      <ChakraProvider theme={theme} resetCSS={true}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <GlobalStyles />
        <Global
          styles={css({
            "#wp-resources-pro": {
              backgroundColor: settings.theme_background_color
                ? settings.theme_background_color
                : null,
            },
          })}
        />
        <div id="wp-resources-pro">{children}</div>
      </ChakraProvider>
    </ResourcesContext.Provider>
  );
}
