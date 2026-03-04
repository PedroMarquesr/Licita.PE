"use client"

import { Flex, Box, Text, Icon } from "@chakra-ui/react"
import { BiSolidDislike } from "react-icons/bi"
import { HiMiniTrophy } from "react-icons/hi2"

import { useState } from "react"

export default function ChangeButtonResult({
  changeResultTitle,
  type,
  onClick,
  ative,
}) {
  return (
    <Flex
      as={"button"}
      cursor={"pointer"}
      onClick={onClick}
      px={1}
      py={1}
      border={"2px solid "}
      borderColor={
        type === "sucess" && ative
          ? "green.500"
          : type === "lose" && ative
          ? "red.500"
          : "gray.500"
      }
      borderRadius={"md"}
      alignContent={"center"}
      bgColor={
        type === "sucess" && ative
          ? "green.100"
          : type === "lose" && ative
          ? "red.100"
          : "gray.100"
      }
    >
      <Flex align={"center"}>
        <Icon
          display={type === "sucess" ? "flex" : "none"}
          mr={1}
          size={"sm"}
          color={
            type === "sucess" && ative
              ? "green.500"
              : type === "lose" && ative
              ? "red.500"
              : "gray.500"
          }
        >
          <HiMiniTrophy />
        </Icon>
        <Icon
          display={type === "lose" ? "flex" : "none"}
          mr={1}
          size={"sm"}
          color={
            type === "sucess" && ative
              ? "green.500"
              : type === "lose" && ative
              ? "red.500"
              : "gray.500"
          }
        >
          <BiSolidDislike />
        </Icon>
        <Text
          fontSize={"sm"}
          color={
            type === "sucess" && ative
              ? "green.500"
              : type === "lose" && ative
              ? "red.500"
              : "gray.500"
          }
        >
          {changeResultTitle}
        </Text>
      </Flex>
    </Flex>
  )
}
