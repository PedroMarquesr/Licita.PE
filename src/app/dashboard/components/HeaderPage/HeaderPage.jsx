"use client"
import { Flex, Text, Button, Link } from "@chakra-ui/react"
import { FaChevronLeft } from "react-icons/fa"

export default function HeaderPage({
  titleHeader,
  subTitleHeader,
  backVisible,
}) {
  return (
    <Flex pl={{ base: "0", md: "5%" }} w={"100%"} className="no-print">
      <Flex align={"center"}>
        <Button
          display={backVisible ? "flex" : "none"}
          mr={"5"}
          bgColor="gray.50"
          transition="transform 0.3s ease-in-out"
          _hover={{
            transform: "scale(1.05)",
            backgroundColor: "#dbeafe",
          }}
        >
          <Link color="blue.600" href={"/dashboard"}>
            <FaChevronLeft />
          </Link>
        </Button>
        <Flex flexDir={"column"}>
          <Text
            textShadow={"1px 2px 5px rgba(0,0,0,0.3)"}
            color={"primary.700"}
            fontSize={"4xl"}
            fontWeight={"bold"}
          >
            {titleHeader}
          </Text>
          <Text color="gray.900">{subTitleHeader}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
