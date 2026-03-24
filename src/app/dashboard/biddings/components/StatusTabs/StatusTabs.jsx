"use client";

import { Flex, Text, Icon, Box } from "@chakra-ui/react";
import { useState } from "react";

import { MdDensitySmall } from "react-icons/md";
import { TbBookmarkQuestion } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";

import { AiFillCaretDown } from "react-icons/ai";
import { FaTrophy } from "react-icons/fa6";

export default function StatusTabs({
  statusName,
  icon,
  amount,
  isActive,
  onClick,
}) {
  let IconComponent;

  switch (icon) {
    case "all":
      IconComponent = MdDensitySmall;
      break;
    case "underAnalysis":
      IconComponent = TbBookmarkQuestion;
      break;
    case "inProgress":
      IconComponent = FaPlay;
      break;
    case "finished":
      IconComponent = AiFillCaretDown;
      break;
    case "victory":
      IconComponent = FaTrophy;
      break;
    case "suspended":
      IconComponent = FaPause;
      break;
    default:
      IconComponent = null;
  }

  return (
    <Flex
      as="button"
      cursor="pointer"
      transition="all 0.2s ease-in-out"
      _active={{ transform: "scale(0.96)" }}
      onClick={onClick}
    >
      <Flex
        bg={isActive ? "blue.500" : "white"}
        color={isActive ? "white" : "gray.700"}
        fontWeight="medium"
        align="center"
        px={4}
        py={2.5}
        gap={2.5}
        borderRadius="full"
        borderWidth={isActive ? "none" : "1px"}
        borderColor="gray.200"
        boxShadow={isActive ? "0 4px 12px rgba(59, 130, 246, 0.25)" : "sm"}
        transition="all 0.2s ease-in-out"
        _hover={{
          bg: isActive ? "blue.600" : "gray.50",
          borderColor: isActive ? "none" : "blue.200",
          transform: "translateY(-1px)",
          boxShadow: isActive
            ? "0 6px 16px rgba(59, 130, 246, 0.3)"
            : "0 4px 12px rgba(0, 0, 0, 0.08)",
        }}
      >
        {IconComponent && (
          <Icon
            as={IconComponent}
            boxSize={4}
            transition="transform 0.2s"
            _groupHover={{ transform: "scale(1.1)" }}
          />
        )}

        <Text
          fontSize="sm"
          fontWeight={isActive ? "semibold" : "medium"}
          letterSpacing="0.3px"
        >
          {statusName}
        </Text>

        <Box
          as="span"
          bg={isActive ? "rgba(255, 255, 255, 0.2)" : "gray.100"}
          color={isActive ? "white" : "gray.600"}
          px={2}
          py={0.5}
          borderRadius="full"
          fontSize="xs"
          fontWeight="semibold"
          lineHeight="1.2"
          transition="all 0.2s"
        >
          {amount}
        </Box>
      </Flex>
    </Flex>
  );
}
