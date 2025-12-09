"use client"

import { Flex, Box, Tag, Text, Grid, GridItem } from "@chakra-ui/react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/components/libs/firebaseinit"
import { useState, useEffect } from "react"

export default function BiddingCalendar() {
  const [biddings, setBiddings] = useState([])
  const [biddingsSort, setBiddingsSort] = useState([])

  useEffect(() => {
    const fetchBiddings = async () => {
      const querySnapshot = await getDocs(collection(db, "biddings"))
      const biddingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setBiddings(biddingsData)

      const biddingsSorted = biddingsData.sort((a, b) => {
        const dateA = a.disputeDate?.toDate?.() ?? new Date(a.disputeDate)
        const dateB = b.disputeDate?.toDate?.() ?? new Date(b.disputeDate)
        return dateA - dateB
      })
      setBiddingsSort(biddingsSorted)
      console.log("Ordenado:", biddingsSorted)
    }
    fetchBiddings()
  }, [])

  const groupBiddingsByDate = () => {
    const grouped = {}

    biddings.forEach((bidding) => {
      if (!bidding || !bidding.disputeDate) return

      const dateKey = formatDate(bidding.disputeDate)

      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }

      grouped[dateKey].push(bidding)
    })

    return grouped
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Data não definida"

    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
      return "Data inválida"
    }

    return date.toLocaleDateString("pt-BR")
  }

  const groupedBiddings = groupBiddingsByDate()

  return (
    <Flex direction="column" gap={1} w={"100%"}>
      {Object.entries(groupedBiddings).map(([date, biddingsForDate]) => (
        <Box key={date}>
          <Flex bgColor={"blue.300"} p={2}>
            <Text fontSize="lg" fontWeight="bold" color="gray.700">
              {date}
            </Text>
          </Flex>
          {biddingsForDate.map((bidding) => (
            <Grid
              key={bidding.id}
              templateColumns="auto 1fr auto"
              gap={3}
              alignItems="center"
              p={2}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              bg="white"
              mb={1}
            >
              <GridItem>
                <Text fontWeight="bold" color="gray.800">
                  {bidding.identificationNumber}
                </Text>
              </GridItem>
              <GridItem>
                <Text fontSize="sm" color="gray.600">
                  {bidding.responsibleAgency}
                </Text>
              </GridItem>

              <GridItem>
                <Text fontSize="sm" color="gray.600">
                  ⏰ {bidding.disputeTime || "Horário não definido"}
                </Text>

                <Flex gap={1} wrap="wrap">
                  {/* // teste */}
                </Flex>
              </GridItem>
            </Grid>
          ))}
        </Box>
      ))}
      {biddingsSort.map((item) => (
        <Text key={item.id}>{String(item.disputeDate)}</Text>
      ))}
    </Flex>
  )
}
