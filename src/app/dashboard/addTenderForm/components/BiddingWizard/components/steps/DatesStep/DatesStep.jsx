// "use client";

// import { Flex, Text, Grid, GridItem } from "@chakra-ui/react";
// import InputDefaultForm from "../components/InputDefaultForm/InputDefaultForm.jsx";

// export default function DatesStep({
//   biddingData,
//   setBiddingData,
//   edit,
//   setEdit,
// }) {
//   return (
//     <Flex direction="column" w="100%" align="center" gap={6}>
//       <Text
//         display={{ base: "flex", md: "none" }}
//         color={"blue.800"}
//         fontWeight={"bold"}
//         textShadow={"2px 2px 4px rgba(0,0,0,0.2)"}
//         fontSize={"2xl"}
//         textAlign="center"
//       >
//         Datas e Prazos
//       </Text>

//       <Grid templateColumns={{ base: "1fr", md: "1fr " }} gap={6} w="100%">
//         <GridItem>
//           <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
//             Disputa
//           </Text>
//           <Flex gap={3} direction={{ base: "column", md: "row" }}>
//             <InputDefaultForm
//               edit={edit}
//               typeInput={"date"}
//               legend={"Data*"}
//               inputValue={biddingData.disputeDate}
//               onChange={(e) =>
//                 setBiddingData({ ...biddingData, disputeDate: e.target.value })
//               }
//               flex={1}
//               layout="vertical"
//             />
//             <InputDefaultForm
//               edit={edit}
//               typeInput={"time"}
//               legend={"Horário*"}
//               inputValue={biddingData.disputeTime}
//               onChange={(e) =>
//                 setBiddingData({ ...biddingData, disputeTime: e.target.value })
//               }
//               flex={1}
//               maxW={"100px"}
//             />
//           </Flex>
//         </GridItem>

//         <GridItem>
//           <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
//             Prazo para Propostas
//           </Text>
//           <Flex gap={3} direction={{ base: "column", md: "row" }}>
//             <InputDefaultForm
//               w={"100vw"}
//               edit={edit}
//               typeInput={"date"}
//               legend={"Data"}
//               inputValue={biddingData.proposalDeadlineDate}
//               onChange={(e) =>
//                 setBiddingData({
//                   ...biddingData,
//                   proposalDeadlineDate: e.target.value,
//                 })
//               }
//               flex={1}
//               layout="vertical"
//               minWidth="10px"
//             />
//             <InputDefaultForm
//               edit={edit}
//               typeInput={"time"}
//               legend={"Hora limite"}
//               inputValue={biddingData.proposalDeadlineTime}
//               onChange={(e) =>
//                 setBiddingData({
//                   ...biddingData,
//                   proposalDeadlineTime: e.target.value,
//                 })
//               }
//               maxW={"20"}
//               flex={1}
//             />
//           </Flex>
//         </GridItem>

//         <GridItem>
//           <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
//             Abertura de Propostas
//           </Text>
//           <Flex gap={3} direction={{ base: "column", md: "row" }}>
//             <InputDefaultForm
//               edit={edit}
//               typeInput={"date"}
//               legend={"Data*"}
//               inputValue={biddingData.proposalOpeningDate}
//               onChange={(e) =>
//                 setBiddingData({
//                   ...biddingData,
//                   proposalOpeningDate: e.target.value,
//                 })
//               }
//               flex={1}
//             />
//             <InputDefaultForm
//               edit={edit}
//               typeInput={"time"}
//               legend={"Horário*"}
//               inputValue={biddingData.proposalOpeningTime}
//               onChange={(e) =>
//                 setBiddingData({
//                   ...biddingData,
//                   proposalOpeningTime: e.target.value,
//                 })
//               }
//               maxW={"20"}
//               flex={1}
//             />
//           </Flex>
//         </GridItem>

//         <GridItem>
//           <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
//             Encerramento
//           </Text>
//           <Flex gap={3} direction={{ base: "column", md: "row" }}>
//             <InputDefaultForm
//               edit={edit}
//               typeInput={"date"}
//               legend={"Data"}
//               inputValue={biddingData.closingDate}
//               onChange={(e) =>
//                 setBiddingData({
//                   ...biddingData,
//                   closingDate: e.target.value,
//                 })
//               }
//               flex={1}
//             />
//             <InputDefaultForm
//               edit={edit}
//               typeInput={"time"}
//               legend={"Horário"}
//               inputValue={biddingData.closingTime}
//               onChange={(e) =>
//                 setBiddingData({
//                   ...biddingData,
//                   closingTime: e.target.value,
//                 })
//               }
//               maxW={"20"}
//               flex={1}
//             />
//           </Flex>
//         </GridItem>
//       </Grid>
//     </Flex>
//   );
// }

"use client";

import { Flex, Text, Grid, GridItem, Box } from "@chakra-ui/react";
import InputDefaultForm from "../components/InputDefaultForm/InputDefaultForm.jsx";

export default function DatesStep({
  biddingData,
  setBiddingData,
  edit,
  setEdit,
}) {
  return (
    <Flex direction="column" w="100%" align="center" gap={6}>
      <Text
        display={{ base: "flex", md: "none" }}
        color={"blue.800"}
        fontWeight={"bold"}
        textShadow={"2px 2px 4px rgba(0,0,0,0.2)"}
        fontSize={"2xl"}
        textAlign="center"
      >
        Datas e Prazos
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "1fr" }} gap={6} w="100%">
        {/* Disputa */}
        <GridItem>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Disputa
          </Text>
          <Flex gap={4} direction={{ base: "column", md: "row" }} w="100%">
            <Box flex={2}>
              <InputDefaultForm
                edit={edit}
                typeInput={"date"}
                legend={"Data*"}
                inputValue={biddingData.disputeDate}
                onChange={(e) =>
                  setBiddingData({
                    ...biddingData,
                    disputeDate: e.target.value,
                  })
                }
                layout="vertical"
              />
            </Box>
            <Box flex={1}>
              <InputDefaultForm
                edit={edit}
                typeInput={"time"}
                legend={"Horário*"}
                inputValue={biddingData.disputeTime}
                onChange={(e) =>
                  setBiddingData({
                    ...biddingData,
                    disputeTime: e.target.value,
                  })
                }
              />
            </Box>
          </Flex>
        </GridItem>

        {/* Prazo para Propostas */}
        <GridItem>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Prazo para Propostas
          </Text>
          <Flex gap={4} direction={{ base: "column", md: "row" }} w="100%">
            <Box flex={2}>
              <InputDefaultForm
                edit={edit}
                typeInput={"date"}
                legend={"Data"}
                inputValue={biddingData.proposalDeadlineDate}
                onChange={(e) =>
                  setBiddingData({
                    ...biddingData,
                    proposalDeadlineDate: e.target.value,
                  })
                }
                layout="vertical"
              />
            </Box>
            <Box flex={1}>
              <InputDefaultForm
                edit={edit}
                typeInput={"time"}
                legend={"Hora limite"}
                inputValue={biddingData.proposalDeadlineTime}
                onChange={(e) =>
                  setBiddingData({
                    ...biddingData,
                    proposalDeadlineTime: e.target.value,
                  })
                }
              />
            </Box>
          </Flex>
        </GridItem>

        {/* Abertura de Propostas */}
        <GridItem>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Abertura de Propostas
          </Text>
          <Flex gap={4} direction={{ base: "column", md: "row" }} w="100%">
            <Box flex={2}>
              <InputDefaultForm
                edit={edit}
                typeInput={"date"}
                legend={"Data*"}
                inputValue={biddingData.proposalOpeningDate}
                onChange={(e) =>
                  setBiddingData({
                    ...biddingData,
                    proposalOpeningDate: e.target.value,
                  })
                }
              />
            </Box>
            <Box flex={1}>
              <InputDefaultForm
                edit={edit}
                typeInput={"time"}
                legend={"Horário*"}
                inputValue={biddingData.proposalOpeningTime}
                onChange={(e) =>
                  setBiddingData({
                    ...biddingData,
                    proposalOpeningTime: e.target.value,
                  })
                }
              />
            </Box>
          </Flex>
        </GridItem>

        {/* Encerramento */}
        <GridItem>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={3}>
            Encerramento
          </Text>
          <Flex gap={4} direction={{ base: "column", md: "row" }} w="100%">
            <Box flex={2}>
              <InputDefaultForm
                edit={edit}
                typeInput={"date"}
                legend={"Data"}
                inputValue={biddingData.closingDate}
                onChange={(e) =>
                  setBiddingData({
                    ...biddingData,
                    closingDate: e.target.value,
                  })
                }
              />
            </Box>
            <Box flex={1}>
              <InputDefaultForm
                edit={edit}
                typeInput={"time"}
                legend={"Horário"}
                inputValue={biddingData.closingTime}
                onChange={(e) =>
                  setBiddingData({
                    ...biddingData,
                    closingTime: e.target.value,
                  })
                }
              />
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
}
