"use client"

import { Flex, Text } from "@chakra-ui/react"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"
import { db } from "@/components/libs/firebaseinit"
import { useState, useEffect } from "react"
import { SiOpencollective } from "react-icons/si"

export default function TenderSummary() {
  const [biddings, setBiddings] = useState([])

  useEffect(() => {
    const fetchBiddings = async () => {
      try {
        const biddingsRef = collection(db, "biddings")
        const q = query(biddingsRef, orderBy("disputeDate"), limit(3))

        const querySnapshot = await getDocs(q)
        const listaTemporaria = []

        querySnapshot.forEach((doc) => {
          listaTemporaria.push({ id: doc.id, ...doc.data() })
        })
        setBiddings(listaTemporaria)
        console.log(listaTemporaria)
      } catch (error) {
        console.log("Erro ao buscar dados: ", error)
      } finally {
        // setLoading(false)
      }
    }
    fetchBiddings()
  }, [])
  return (
    <Flex direction="column">
      {biddings.map((bidding) => (
        <Text color={"black"} key={bidding.id}>
          {bidding.agencyCity}
        </Text>
      ))}
    </Flex>
  )
}
