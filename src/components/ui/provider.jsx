"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider } from "./color-mode"
import { system } from "@/styles/theme"
import { ThemeProvider } from "next-themes"

export function Provider({ children }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
      {/* <ThemeProvider {...props} /> */}
    </ChakraProvider>
  )
}
