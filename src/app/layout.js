"use client"

import { Provider } from "@/components/ui/provider"
import Navbar from "@/components/Navbar/Navbar"
import { usePathname } from "next/navigation"
import { Flex } from "@chakra-ui/react"
import "@/app/globals.css"

export default function RootLayout({ children }) {
  const pathName = usePathname()
  const isHomePage = pathName === "/"
  const isLoginPage = pathName === "/login"

  const shouldShowNavbar = isHomePage || isLoginPage
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Provider>
          <Flex
            color={"gray.700"}
            flexDir={"column"}
            bgColor={"white"}
            minH="100vh"
          >
            {shouldShowNavbar ? <Navbar /> : null} {children}
          </Flex>
        </Provider>
      </body>
    </html>
  )
}
