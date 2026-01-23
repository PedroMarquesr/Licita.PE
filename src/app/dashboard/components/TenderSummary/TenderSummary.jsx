"use client";

import { Flex, Text } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/components/libs/firebaseinit";
import { useState, useEffect } from "react";

export default function TenderSummary() {
  function getWeekRange() {
    const now = new Date();

    const day = now.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;

    const startOfWeek = new Date(now);

    startOfWeek.setDate(now.getDate() + diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { startOfWeek, endOfWeek };
  }

  return (
    <Flex>
      <Text>Tender Summary </Text>
    </Flex>
  );
}
