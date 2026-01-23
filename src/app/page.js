"use client"

import { Flex, Text, Box } from "@chakra-ui/react"
import { usePathname } from "next/navigation"

import useStore from "../components/globalStates/store"

import HeroHeader from "@/components/HeroHeader/HeroHeader"
import FeatureSection from "@/components/FeaturesSection/FeaturesSection"
import Footer from "@/components/Footer/Footer"

export default function Home() {
  const user = useStore((state) => state.user)

  return (
    <>
      {/* {" "} Questionar Talita sobre a persistencia do usuario */}
      {/* {user?.uid && (
        <Box bg="green.50" p={3} textAlign="center">
          <Text fontWeight="bold" color="green.800">
            ✅ Usuário logado: {user.displayName || user.email}
          </Text>
          <Text fontSize="sm" color="gray.600">
            ID: {user.uid}
          </Text>
        </Box>
      )} */}
      <HeroHeader />
      <FeatureSection />
      <Footer />
    </>
  )
}
