"use client"

import { Flex, Box, Text } from "@chakra-ui/react"
import { FaCheck } from "react-icons/fa"
import { useState } from "react"

export default function ChangeButtonResult({ changeResultTitle, type }) {
  const [resultSelectedSucess, setResultSelectedSucess] = useState(false)
  const [resultSelectedLose, setResultSelectedLose] = useState(false)

  const resultTypes = ["sucess", "lose"]
  return (
    <Box
      as={"button"}
      cursor={"pointer"}
      onClick={() => {
        setResultSelectedSucess(!resultSelectedSucess)
        setResultSelectedLose(!resultSelectedLose)
      }}
      px={8}
      py={5}
      border={"2px solid "}
      borderColor={
        type === "sucess" && resultSelectedSucess === true
          ? "green.500"
          : type === "lose" && resultSelectedLose === true
          ? "red.500"
          : "gray.500"
      }
      borderRadius={"md"}
    >
      <Text fontSize={"xl"} color={"gray.700"}>
        {changeResultTitle}
      </Text>
    </Box>
  )
}
