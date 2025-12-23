"use client"

import { Flex, Box, Tag, Text, Grid, GridItem } from "@chakra-ui/react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/components/libs/firebaseinit"
import { useState, useEffect } from "react"

export default function BiddingCalendar() {
  const [biddings, setBiddings] = useState([])

  useEffect(() => {
    async function fetchBiddings() {
      const snapshot = await getDocs(collection(db, "biddings"))
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setBiddings(data)
    }
    fetchBiddings()
  }, [])

  function toDate(value) {
    if (!value) return null
    if (value.toDate) return value.toDate()
    return new Date(value)
  }

  const sortedBiddings = [...biddings].sort((a, b) => {
    return toDate(b.disputeDate) - toDate(a.disputeDate)
  })

  function groupByDate(biddings) {
    const grouped = {}

    biddings.forEach((bidding) => {
      const date = toDate(bidding.disputeDate)
      if (!date) return

      const key = date.toLocaleDateString("pt-BR")

      if (!grouped[key]) {
        grouped[key] = []
      }
      grouped[key].push(bidding)
    })
    return grouped
  }

  function formatTime(value) {
    const date = toDate(value)
    if (!date) return "Horário não definido"

    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const groupedBiddings = groupByDate(sortedBiddings)

  return (
    <>
      <Flex direction="column" gap={4} w={"100%"}>
        {Object.entries(groupedBiddings).map(([date, items]) => (
          <Box key={date}>
            <Flex bg="blue.300" p={1}>
              <Text fontWeight="bold">{date}</Text>
            </Flex>

            {items.map((bidding) => (
              <Grid key={bidding.id} templateColumns="repeat(6, 1fr)">
                <Text>{bidding.identificationNumber}</Text>
                <Text>{bidding.responsibleAgency}</Text>
                <Text>{bidding.processNumber}</Text>
                <Text>{bidding.biddingType}</Text>
                <Text>{bidding.modality}</Text>
                <Text>{!bidding.modality ? null : bidding.modality}</Text>
                <Text>⏰ {formatTime(bidding.disputeDate)}</Text>{" "}
              </Grid>
            ))}
          </Box>
        ))}
      </Flex>
    </>
  )
}
