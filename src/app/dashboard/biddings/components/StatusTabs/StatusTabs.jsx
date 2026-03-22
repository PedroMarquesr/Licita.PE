"use client";

import { Flex, Text, Box, Icon } from "@chakra-ui/react";

import { useState } from "react";

import { MdDensitySmall } from "react-icons/md";
import { TbBookmarkQuestion } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import { FaTrophy } from "react-icons/fa6";
import { button } from "motion/react-client";

export default function StatusTabs({ statusName, icon, amount }) {
  const [active, setActive] = useState(false);

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

    default:
      IconComponent = null;
  }

  return (
    <Flex as={button} cursor={"pointer"} onClick={() => setActive(!active)}>
      <Flex
        bg={active ? "blue.500" : "gray.200"}
        color={active ? "gray.100" : "gray.800"}
        fontWeight={"medium"}
        align={"center"}
        p={2}
        gap={2}
        borderRadius={23}
      >
        {IconComponent && <Icon as={IconComponent} />}
        <Text>{statusName}</Text>
        <Text>{amount}</Text>
      </Flex>
    </Flex>
  );
}
