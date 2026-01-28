// "use client"

// import { Flex, Text, Tag, Box } from "@chakra-ui/react"

// export default function MobileCardTenderSummary({
//   orgao,
//   dateFormated,
//   fontWeight,
//   bgColor,
//   identificationNumber,
//   bgColorStatus,
//   colorStatus,
//   biddingStatus,
//   biddingType,
// }) {
//   return (
//     <Flex
//       display={{ base: "flex", md: "none" }}
//       w={"100%"}
//       p="4"
//       boxShadow="md"
//       borderRadius="12px"
//       bg="gray.50"
//       mb={4}
//       bgColor={bgColor}
//     >
//       <Flex flexDir={"column"} flex={1} fontWeight={fontWeight}>
//         <Text fontSize="sm" color="gray.600" mb={1}>
//           {dateFormated}
//         </Text>
//         <Text fontSize="md" fontWeight="semibold" color={"gray.800"} mb={1}>
//           {orgao}
//         </Text>
//         <Text fontSize="sm" color="gray.700" mb={1}>
//           {identificationNumber}
//         </Text>
//       </Flex>

//       <Flex
//         flexDir="column"
//         justifyContent="flex-start"
//         alignItems="flex-end"
//         ml="4"
//         flex={1}
//       >
//         <Tag.Root
//           size="md"
//           variant="solid"
//           bg={bgColorStatus}
//           color={colorStatus}
//           fontWeight="bold"
//           borderRadius="10%"
//           px={3}
//           py={1}
//           boxShadow="sm"
//           textTransform="uppercase"
//           fontSize="xs"
//           letterSpacing="wide"
//           textAlign={"center"}
//         >
//           {biddingStatus}
//         </Tag.Root>
//         <Text>{biddingType}</Text>
//       </Flex>
//     </Flex>
//   )
// }
"use client"

import { Flex, Text, Tag, Box } from "@chakra-ui/react"

export default function MobileCardTenderSummary({
  orgao,
  dateFormated,
  fontWeight,
  bgColor,
  identificationNumber,
  bgColorStatus,
  colorStatus,
  biddingStatus,
  biddingType,
}) {
  return (
    <Flex
      display={{ base: "flex", md: "none" }}
      w={"100%"}
      p="3"
      bg="white"
      mb="3"
      borderRadius="xl"
      boxShadow="0 1px 3px rgba(0,0,0,0.1)"
      border="1px solid"
      borderColor="gray.100"
      alignItems="flex-start"
      gap="3"
    >
      {/* Indicador de data */}
      <Box
        bg="blue.50"
        color="blue.700"
        px="2"
        py="1"
        borderRadius="md"
        fontSize="xs"
        fontWeight="bold"
        minW="60px"
        textAlign="center"
      >
        {dateFormated}
      </Box>

      {/* Conteúdo principal */}
      <Flex flexDir="column" flex="1" minW="0">
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color="gray.800"
          mb="1"
          noOfLines={1}
        >
          {orgao}
        </Text>

        <Flex alignItems="center" gap="2" mb="2">
          <Text fontSize="xs" color="gray.600">
            {identificationNumber}
          </Text>
          <Box w="1" h="1" bg="gray.300" borderRadius="full" />
          <Text fontSize="xs" color="gray.500">
            {biddingType}
          </Text>
        </Flex>

        {/* Status badge */}
        <Tag.Root
          size="sm"
          variant="subtle"
          bg={bgColorStatus}
          color={colorStatus}
          borderRadius="full"
          px="3"
          alignSelf="flex-start"
          fontWeight="bold"
          fontSize="2xs"
          textTransform="uppercase"
        >
          {biddingStatus}
        </Tag.Root>
      </Flex>
    </Flex>
  )
}
