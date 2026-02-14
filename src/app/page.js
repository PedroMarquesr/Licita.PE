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
      <HeroHeader />
      <FeatureSection />
      <Footer />
    </>
  )
}
