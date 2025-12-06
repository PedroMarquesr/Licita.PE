// src/components/ui/theme.jsx
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    breakpoints: {
      base: "30em", // 480px

      sm: "48em", // 1121px / 16 "48em"
      md: "70.0625em", // 768px "70.0625em"
      lg: "62em", // 992px
      xl: "80em", // 1280px
      "2xl": "96em", // 1536px
    },

    tokens: {
      colors: {
        brand: {
          500: { value: "tomato" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
