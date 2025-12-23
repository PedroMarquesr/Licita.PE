"use client"
import { GridItem, Text } from "@chakra-ui/react"

export default function CustomItemGrid({ textGrid }) {
  return (
    <>
      <GridItem>
        <Text color={"gray.700"} fontSize={"sm"}>
          {textGrid}
        </Text>
      </GridItem>
    </>
  )
}
