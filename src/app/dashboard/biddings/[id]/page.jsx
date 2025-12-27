import { doc, getDoc } from "firebase/firestore";
import { db } from "@/components/libs/firebaseinit";
import { Flex, Text } from "@chakra-ui/react";

export default async function BiddingDetails({ params }) {
  const { id } = await params;

  const docRef = doc(db, "biddings", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return <Text>Licitação não encontrada</Text>;
  }

  const bidding = docSnap.data();

  return (
    <Flex direction="column" gap={2}>
      <Text fontWeight="bold">{bidding.responsibleAgency}</Text>
      <Text>Processo: {bidding.processNumber}</Text>
      <Text>Status: {bidding.status}</Text>
    </Flex>
  );
}
