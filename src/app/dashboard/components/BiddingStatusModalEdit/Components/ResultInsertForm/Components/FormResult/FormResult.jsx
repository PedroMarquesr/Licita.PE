"use client"

import { Flex, Field, Icon } from "@chakra-ui/react"
import SelectTypeDispute from "./components/SelectTypeDispute/SelectTypeDispute"
import ResultItemRow from "./components/ResultItemRow/ResultItemRow"
import { FaUserPlus } from "react-icons/fa6"

import { useState } from "react"

export default function FormResult() {
  const [typeDispute, setTypeDispute] = useState("")

  return (
    <Flex w={"100%"} py={4} px={5} flexDir={"column"}>
      <Field.Root>
        <SelectTypeDispute
          value={typeDispute}
          onValueChange={(value) => setTypeDispute(value)}
        />
      </Field.Root>
      {typeDispute && (
        <Flex mt={17} gap={5} justify={"center"}>
          <ResultItemRow showBatch={typeDispute} />

          <Icon>
            <FaUserPlus />
          </Icon>
        </Flex>
      )}
    </Flex>
  )
}
