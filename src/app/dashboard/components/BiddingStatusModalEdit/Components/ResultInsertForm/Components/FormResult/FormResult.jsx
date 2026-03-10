"use client";

import { Flex, Field, Icon, Button, Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

import SelectTypeDispute from "./components/SelectTypeDispute/SelectTypeDispute";
import ResultItemRow from "./components/ResultItemRow/ResultItemRow";
import ResultParticipantRow from "./components/ResultParticipantRow/ResultParticipantRow";
import ResultLotItemRow from "./components/LotItemRow/ResultLotItemRow";

import { FaUserPlus, FaBoxesStacked } from "react-icons/fa6";
import { BsFillPlusCircleFill } from "react-icons/bs";

import { useState } from "react";

export default function FormResult() {
  const [dispute, setDispute] = useState({
    type: "",
    groups: [
      {
        groupId: 1,
        participants: [],
        lotNumber: 1,

        items: [
          {
            itemId: 1,
            itemNumber: "",
            descriptive: "",
            amount: 0,
            supplyUnit: "",
            participants: [],
          },
        ],
      },
    ],
  });
  function handleItemChange(groupId, itemId, field, value) {
    setDispute((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.groupId === groupId
          ? {
              ...group,
              items: group.items.map((item) =>
                item.itemId === itemId ? { ...item, [field]: value } : item,
              ),
            }
          : group,
      ),
    }));
  }
  function handleTypeChange(value) {
    setDispute((prev) => ({
      ...prev,
      type: value,
      groups: [
        {
          groupId: 1,
          participants: [],
          lotNumber: 1,

          items: [
            {
              itemId: 1,
              itemNumber: "",
              descriptive: "",
              amount: 0,
              supplyUnit: "",
              participants: [],
            },
          ],
        },
      ],
    }));
  }

  function handleAddParticipant(groupId, itemId) {
    setDispute((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.groupId === groupId
          ? {
              ...group,
              items: group.items.map((item) =>
                item.itemId === itemId
                  ? {
                      ...item,
                      participants: [
                        ...item.participants,
                        {
                          id: crypto.randomUUID(),
                          position: item.participants.length + 1,
                          bidder: "",
                          brand: "",
                          price: "",
                          isSelf: false,
                          win: false,
                          disqualified: false,
                          disqualificationReason: "",
                        },
                      ],
                    }
                  : item,
              ),
            }
          : group,
      ),
    }));
  }

  function handleSelectSelf(groupId, itemId, participantId, checked) {
    setDispute((prev) => ({
      ...prev,
      groups: prev.groups.map((group) => {
        if (group.groupId !== groupId) return group;

        return {
          ...group,
          items: group.items.map((item) => {
            if (item.itemId !== itemId) return item;

            return {
              ...item,
              participants: item.participants.map((participant) => ({
                ...participant,

                isSelf: checked ? participant.id === participantId : false,
              })),
            };
          }),
        };
      }),
    }));
  }

  function handleSelectWinner(groupId, itemId, participantId, checked) {
    setDispute((prev) => ({
      ...prev,
      groups: prev.groups.map((group) => {
        if (group.groupId !== groupId) return group;

        return {
          ...group,
          items: group.items.map((item) => {
            if (item.itemId !== itemId) return item;

            return {
              ...item,
              participants: item.participants.map((participant) => ({
                ...participant,
                win: checked ? participant.id === participantId : false,
              })),
            };
          }),
        };
      }),
    }));
  }

  function handleSelectIneligible(groupId, itemId, participantId, checked) {
    setDispute((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.groupId === groupId
          ? {
              ...group,
              items: group.items.map((item) =>
                item.itemId === itemId
                  ? {
                      ...item,
                      participants: item.participants.map((participant) =>
                        participant.id === participantId
                          ? {
                              ...participant,
                              ineligible: checked,
                              ineligibleReason: checked
                                ? participant.ineligibleReason
                                : "",
                            }
                          : participant,
                      ),
                    }
                  : item,
              ),
            }
          : group,
      ),
    }));
  }

  function handleSelectDisqualified(groupId, itemId, participantId, checked) {
    setDispute((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.groupId === groupId
          ? {
              ...group,
              items: group.items.map((item) =>
                item.itemId === itemId
                  ? {
                      ...item,
                      participants: item.participants.map((participant) =>
                        participant.id === participantId
                          ? {
                              ...participant,
                              disqualified: checked,
                              disqualificationReason: checked
                                ? participant.disqualificationReason
                                : "",
                            }
                          : participant,
                      ),
                    }
                  : item,
              ),
            }
          : group,
      ),
    }));
  }

  function handleParticipantChange(
    groupId,
    itemId,
    participantId,
    field,
    value,
  ) {
    setDispute((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.groupId === groupId
          ? {
              ...group,
              items: group.items.map((item) =>
                item.itemId === itemId
                  ? {
                      ...item,
                      participants: item.participants.map((participant) =>
                        participant.id === participantId
                          ? { ...participant, [field]: value }
                          : participant,
                      ),
                    }
                  : item,
              ),
            }
          : group,
      ),
    }));
  }

  function handleAddItem(groupId) {
    setDispute((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.groupId === groupId
          ? {
              ...group,
              items: [
                ...group.items,
                {
                  itemId: group.items.length + 1,
                  descriptive: "",
                  amount: 0,
                  supplyUnit: "",
                  participants: [],
                },
              ],
            }
          : group,
      ),
    }));
  }

  function handleDeleteParticipant(groupId, itemId, participantId) {
    setDispute((prev) => ({
      ...prev,

      groups: prev.groups.map((group) => {
        if (group.groupId !== groupId) return group;

        return {
          ...group,

          items: group.items.map((item) => {
            if (item.itemId !== itemId) return item;

            return {
              ...item,

              participants: item.participants.filter(
                (participant) => participant.id !== participantId,
              ),
            };
          }),
        };
      }),
    }));
  }

  function handleAddBatch() {
    setDispute((prev) => ({
      ...prev,
      groups: [
        ...prev.groups,
        {
          groupId: prev.groups.length + 1,
          lotNumber: prev.groups.length + 1,

          participants: [],
          items: [
            {
              itemId: 1,
              itemNumber: "",
              descriptive: "",
              amount: 0,
              supplyUnit: "",
              participants: [],
            },
          ],
        },
      ],
    }));
  }
  function handleAddItemOfBatch(groupId) {
    setDispute((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.groupId === groupId
          ? {
              ...group,
              items: [
                ...group.items,
                {
                  itemId: group.items.length + 1,
                  itemNumber: "",
                  descriptive: "",
                  amount: 0,
                  supplyUnit: "",
                  participants: [],
                },
              ],
            }
          : group,
      ),
    }));
  }
  function handleAddParticipantOfBatch(groupId) {
    setDispute((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.groupId === groupId
          ? {
              ...group,
              participants: [
                ...group.participants,
                {
                  id: crypto.randomUUID(),
                  position: group.participants.length + 1,
                  bidder: "",
                  brand: "",
                  price: "",
                  isSelf: false,
                  win: false,
                  disqualified: false,
                  disqualificationReason: "",
                },
              ],
            }
          : group,
      ),
    }));
  }

  function handleSelectSelfBatch(groupId, participantId, checked) {
    setDispute((prev) => ({
      ...prev,
      groups: prev.groups.map((group) => {
        if (group.groupId !== groupId) return group;

        return {
          ...group,
          participants: group.participants.map((participant) => ({
            ...participant,
            isSelf: checked ? participant.id === participantId : false,
          })),
        };
      }),
    }));
  }

  function handleSelectWinnerBatch(groupId, participantId, checked) {
    setDispute((prev) => ({
      ...prev,
      groups: prev.groups.map((group) => {
        if (group.groupId !== groupId) return group;

        return {
          ...group,
          participants: group.participants.map((participant) => ({
            ...participant,
            win: checked ? participant.id === participantId : false,
          })),
        };
      }),
    }));
  }

  function handleSelectDisqualifiedBatch(groupId, participantId, checked) {
    setDispute((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.groupId === groupId
          ? {
              ...group,
              participants: group.participants.map((participant) =>
                participant.id === participantId
                  ? {
                      ...participant,
                      disqualified: checked,
                      disqualificationReason: checked
                        ? participant.disqualificationReason
                        : "",
                    }
                  : participant,
              ),
            }
          : group,
      ),
    }));
  }

  function handleSelectIneligibleBatch(groupId, participantId, checked) {
    setDispute((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.groupId === groupId
          ? {
              ...group,
              participants: group.participants.map((participant) =>
                participant.id === participantId
                  ? {
                      ...participant,
                      ineligible: checked,
                      ineligibleReason: checked
                        ? participant.ineligibleReason
                        : "",
                    }
                  : participant,
              ),
            }
          : group,
      ),
    }));
  }

  function handleParticipantChangeBatch(groupId, participantId, field, value) {
    setDispute((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.groupId === groupId
          ? {
              ...group,
              participants: group.participants.map((participant) =>
                participant.id === participantId
                  ? { ...participant, [field]: value }
                  : participant,
              ),
            }
          : group,
      ),
    }));
  }
  function handleDeleteParticipantBatch(groupId, participantId) {
    setDispute((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.groupId === groupId
          ? {
              ...group,
              participants: group.participants.filter(
                (participant) => participant.id !== participantId,
              ),
            }
          : group,
      ),
    }));
  }

  function handleLotNumberChange(groupId, value) {
    setDispute((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.groupId === groupId ? { ...group, lotNumber: value } : group,
      ),
    }));
  }

  function handleBatchItemChange(groupId, itemId, participantId, field, value) {
    setDispute((prev) => ({
      ...prev,

      groups: prev.groups.map((group) => {
        if (group.groupId !== groupId) return group;

        return {
          ...group,

          participants: group.participants.map((participant) => {
            if (participant.id !== participantId) return participant;

            return {
              ...participant,

              items: {
                ...(participant.items || {}),

                [itemId]: {
                  ...(participant.items?.[itemId] || {}),
                  [field]: value,
                },
              },
            };
          }),
        };
      }),
    }));
  }
  return (
    <Flex w="100%" py={4} px={5} flexDir="column">
      <Field.Root>
        <SelectTypeDispute
          value={dispute.type}
          onValueChange={handleTypeChange}
        />
      </Field.Root>

      {dispute.type === "item" && (
        <Flex mt={10} justify="center" align="center">
          <Flex flexDir="column" w="100%">
            {dispute.groups.map((group) => (
              <Flex key={group.groupId} direction="column" mt={4}>
                {group.items.map((item) => (
                  <Flex key={item.itemId} direction="column">
                    <ResultItemRow
                      item={item}
                      onChange={(field, value) =>
                        handleItemChange(
                          group.groupId,
                          item.itemId,
                          field,
                          value,
                        )
                      }
                    />

                    {item.participants.map((participant) => (
                      <ResultParticipantRow
                        amountItemParticipant={item.amount}
                        key={participant.id}
                        participant={participant}
                        onChange={(field, value) =>
                          handleParticipantChange(
                            group.groupId,
                            item.itemId,
                            participant.id,
                            field,
                            value,
                          )
                        }
                        mb={2}
                        ml={8}
                        // My result
                        onCheckedChangeSelf={(checked) =>
                          handleSelectSelf(
                            group.groupId,
                            item.itemId,
                            participant.id,
                            checked,
                          )
                        }
                        isSelfChecked={participant.isSelf}
                        // Winner
                        onCheckedChangeWinner={(checked) =>
                          handleSelectWinner(
                            group.groupId,
                            item.itemId,
                            participant.id,
                            checked,
                          )
                        }
                        winnerChecked={participant.win}
                        // "Participante desclassificado"
                        onCheckedChangeDisqualified={(checked) =>
                          handleSelectDisqualified(
                            group.groupId,
                            item.itemId,
                            participant.id,
                            checked,
                          )
                        }
                        disqualificationChecked={participant.disqualified}
                        showCheckDisqualification={!participant.win}
                        // "Participante inabilitado"
                        onCheckedChangeIneligible={(checked) =>
                          handleSelectIneligible(
                            group.groupId,
                            item.itemId,
                            participant.id,
                            checked,
                          )
                        }
                        ineligibleChecked={participant.ineligible}
                        showCheckIneligible={!participant.win}
                        // Delete participant

                        deleteParticipant={() =>
                          handleDeleteParticipant(
                            group.groupId,
                            item.itemId,
                            participant.id,
                          )
                        }
                      />
                    ))}
                    <Flex gap={2} ml={3} flexDir="column" mt={3} mb={4}>
                      <Tooltip content="Adicionar participante para este item">
                        <Flex align="center">
                          <Button
                            variant="outline"
                            colorPalette="blue"
                            size="xs"
                            h="8"
                            w="10"
                            onClick={() =>
                              handleAddParticipant(group.groupId, item.itemId)
                            }
                            borderRadius="lg"
                            borderWidth="1.5px"
                            borderColor="blue.200"
                            bg="transparent"
                            _hover={{
                              bg: "blue.50",
                              borderColor: "blue.400",
                              transform: "scale(1.05)",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                            }}
                            _active={{
                              bg: "blue.100",
                              transform: "scale(0.95)",
                            }}
                            transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                          >
                            <Icon color="blue.500" boxSize={4}>
                              <FaUserPlus />
                            </Icon>
                          </Button>
                          <Text
                            pl={3}
                            fontSize="sm"
                            color="gray.600"
                            fontWeight="normal"
                          >
                            Adicionar Participante
                          </Text>
                        </Flex>
                      </Tooltip>
                    </Flex>
                  </Flex>
                ))}

                <Flex gap={2} ml={3} flexDir="column" mt={3}>
                  <Tooltip content="Adicionar item">
                    <Flex align="center">
                      <Button
                        variant="outline"
                        colorPalette="green"
                        size="xs"
                        h="8"
                        w="10"
                        onClick={() => handleAddItem(group.groupId)}
                        borderRadius="lg"
                        borderWidth="1.5px"
                        borderColor="green.200"
                        bg="transparent"
                        _hover={{
                          bg: "green.50",
                          borderColor: "green.400",
                          transform: "scale(1.05)",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                        }}
                        _active={{
                          bg: "green.100",
                          transform: "scale(0.95)",
                        }}
                        transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                      >
                        <Icon color="green.500" boxSize={4}>
                          <BsFillPlusCircleFill />
                        </Icon>
                      </Button>
                      <Text
                        pl={3}
                        fontSize="sm"
                        color="gray.600"
                        fontWeight="normal"
                      >
                        Adicionar Item
                      </Text>
                    </Flex>
                  </Tooltip>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      )}
      {dispute.type === "batch" && (
        <Flex mt={10} justify="center" align="center" flexDir={"column"}>
          <Flex flexDir="column" w="100%">
            {dispute.groups.map((group) => (
              // renderiza o lote
              <Flex
                key={group.groupId}
                direction="column"
                mt={4}
                bg="blue.50"
                borderRadius="md"
                borderWidth="1px"
                boxShadow="sm"
                borderColor="gray.400"
              >
                <Flex flexDir={"column"} w={{ base: "100%", lg: "90%" }}>
                  {group.items.map((item) => (
                    <ResultLotItemRow
                      key={item.itemId}
                      lotNumber={group.lotNumber}
                      groupId={group.groupId}
                      item={item}
                      onChange={(field, value) =>
                        handleItemChange(
                          group.groupId,
                          item.itemId,
                          field,
                          value,
                        )
                      }
                    />
                  ))}
                </Flex>
                <Flex gap={2} ml={3} flexDir="column" mt={3} mb={4}>
                  {group.participants.map((participant) => (
                    <ResultParticipantRow
                      // amountItemParticipant={item.amount}
                      typeDispute="batch"
                      key={participant.id}
                      participant={participant}
                      onChange={(field, value) =>
                        handleParticipantChangeBatch(
                          group.groupId,
                          participant.id,
                          field,
                          value,
                        )
                      }
                      mb={2}
                      ml={8}
                      // My result
                      onCheckedChangeSelf={(checked) =>
                        handleSelectSelfBatch(
                          group.groupId,
                          participant.id,
                          checked,
                        )
                      }
                      isSelfChecked={participant.isSelf}
                      // Winner
                      onCheckedChangeWinner={(checked) =>
                        handleSelectWinnerBatch(
                          group.groupId,
                          participant.id,
                          checked,
                        )
                      }
                      winnerChecked={participant.win}
                      // "Participante desclassificado"
                      onCheckedChangeDisqualified={(checked) =>
                        handleSelectDisqualifiedBatch(
                          group.groupId,
                          participant.id,
                          checked,
                        )
                      }
                      disqualificationChecked={participant.disqualified}
                      showCheckDisqualification={!participant.win}
                      // "Participante inabilitado"
                      onCheckedChangeIneligible={(checked) =>
                        handleSelectIneligibleBatch(
                          group.groupId,
                          participant.id,
                          checked,
                        )
                      }
                      ineligibleChecked={participant.ineligible}
                      showCheckIneligible={!participant.win}
                      // Delete participant

                      deleteParticipant={() =>
                        handleDeleteParticipantBatch(
                          group.groupId,
                          participant.id,
                        )
                      }
                      groupId={group.groupId}
                      group={group}
                      // itemId={item.itemId}
                      participantId={participant.id}
                      unitPriceChange={handleBatchItemChange}
                    />
                  ))}

                  <Flex gap={2} ml={3} flexDir="column" mt={3}>
                    <Tooltip content="Adicionar item">
                      <Flex align="center">
                        <Button
                          variant="outline"
                          colorPalette="green"
                          size="xs"
                          h="8"
                          w="10"
                          onClick={() => handleAddItemOfBatch(group.groupId)}
                          borderRadius="lg"
                          borderWidth="1.5px"
                          borderColor="green.200"
                          bg="transparent"
                          _hover={{
                            bg: "green.50",
                            borderColor: "green.400",
                            transform: "scale(1.05)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                          }}
                          _active={{
                            bg: "green.100",
                            transform: "scale(0.95)",
                          }}
                          transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                        >
                          <Icon color="green.500" boxSize={4}>
                            <BsFillPlusCircleFill />
                          </Icon>
                        </Button>
                        <Text
                          pl={3}
                          fontSize="sm"
                          color="gray.600"
                          fontWeight="normal"
                        >
                          Adicionar Item ao Lote
                        </Text>
                      </Flex>
                    </Tooltip>
                  </Flex>

                  {/* // Add participant */}
                  <Flex gap={2} ml={3} flexDir="column" mt={3} mb={4}>
                    <Tooltip content="Adicionar participante para este item">
                      <Flex align="center">
                        <Button
                          variant="outline"
                          colorPalette="blue"
                          size="xs"
                          h="8"
                          w="10"
                          onClick={() =>
                            handleAddParticipantOfBatch(group.groupId)
                          }
                          borderRadius="lg"
                          borderWidth="1.5px"
                          borderColor="blue.200"
                          bg="transparent"
                          _hover={{
                            bg: "blue.50",
                            borderColor: "blue.400",
                            transform: "scale(1.05)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                          }}
                          _active={{
                            bg: "blue.100",
                            transform: "scale(0.95)",
                          }}
                          transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                        >
                          <Icon color="blue.500" boxSize={4}>
                            <FaUserPlus />
                          </Icon>
                        </Button>
                        <Text
                          pl={3}
                          fontSize="sm"
                          color="gray.600"
                          fontWeight="normal"
                        >
                          Adicionar Participante ao Lote
                        </Text>
                      </Flex>
                    </Tooltip>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Flex>

          <Tooltip content="Adicionar lote">
            <Flex align="center" w={"100%"} mt={5}>
              <Button
                w={"25%"}
                colorPalette="purple"
                size="xs"
                onClick={() => handleAddBatch()}
              >
                <Icon>
                  <FaBoxesStacked />
                </Icon>
                <Text pl={2} fontSize={"md"}>
                  Adicionar Lote
                </Text>
              </Button>
            </Flex>
          </Tooltip>
        </Flex>
      )}
      <Text mt={6} fontSize="sm" whiteSpace="pre-wrap">
        {JSON.stringify(dispute, null, 2)}
      </Text>
    </Flex>
  );
}
