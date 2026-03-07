"use client";

import { Flex, Field, Icon, Button, Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

import SelectTypeDispute from "./components/SelectTypeDispute/SelectTypeDispute";
import ResultItemRow from "./components/ResultItemRow/ResultItemRow";
import ResultParticipantRow from "./components/ResultParticipantRow/ResultParticipantRow";

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
                            colorPalette="blue"
                            size="xs"
                            w="10"
                            onClick={() =>
                              handleAddParticipant(group.groupId, item.itemId)
                            }
                          >
                            <Icon>
                              <FaUserPlus />
                            </Icon>
                          </Button>
                          <Text pl={3}>Adicionar Participante</Text>
                        </Flex>
                      </Tooltip>
                    </Flex>
                  </Flex>
                ))}

                <Flex gap={2} ml={3} flexDir="column" mt={3}>
                  <Tooltip content="Adicionar item">
                    <Flex align="center">
                      <Button
                        colorPalette="green"
                        size="xs"
                        w="10"
                        onClick={() => handleAddItem(group.groupId)}
                      >
                        <Icon>
                          <BsFillPlusCircleFill />
                        </Icon>
                      </Button>
                      <Text pl={3}>Adicionar Item</Text>
                    </Flex>
                  </Tooltip>

                  <Tooltip content="Adicionar lote">
                    <Flex align="center">
                      <Button
                        disabled={dispute.type === "item"}
                        colorPalette="purple"
                        size="xs"
                      >
                        <Icon>
                          <FaBoxesStacked />
                        </Icon>
                      </Button>
                      <Text pl={3}>Adicionar Lote</Text>
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
          <Text>Lote</Text>

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
                        // Delete participant
                        // deleteParticipant={() => {
                        //   handleDeleteParticipant(
                        //     group.groupId,
                        //     item.itemId,
                        //     participant.id,
                        //   );
                        // }}

                        deleteParticipant={() =>
                          console.log(`Botão funcionando`)
                        }
                      />
                    ))}

                    <Flex gap={2} ml={3} flexDir="column" mt={3} mb={4}>
                      <Tooltip content="Adicionar participante para este item">
                        <Flex align="center">
                          <Button
                            colorPalette="blue"
                            size="xs"
                            w="10"
                            onClick={() =>
                              handleAddParticipant(group.groupId, item.itemId)
                            }
                          >
                            <Icon>
                              <FaUserPlus />
                            </Icon>
                          </Button>
                          <Text pl={3}>Adicionar Participante</Text>
                        </Flex>
                      </Tooltip>
                    </Flex>
                  </Flex>
                ))}

                <Flex gap={2} ml={3} flexDir="column" mt={3}>
                  <Tooltip content="Adicionar item">
                    <Flex align="center">
                      <Button
                        colorPalette="green"
                        size="xs"
                        w="10"
                        onClick={() => handleAddItem(group.groupId)}
                      >
                        <Icon>
                          <BsFillPlusCircleFill />
                        </Icon>
                      </Button>
                      <Text pl={3}>Adicionar Item</Text>
                    </Flex>
                  </Tooltip>

                  <Tooltip content="Adicionar lote">
                    <Flex align="center">
                      <Button
                        disabled={dispute.type === "item"}
                        colorPalette="purple"
                        size="xs"
                      >
                        <Icon>
                          <FaBoxesStacked />
                        </Icon>
                      </Button>
                      <Text pl={3}>Adicionar Lote</Text>
                    </Flex>
                  </Tooltip>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      )}
      <Text mt={6} fontSize="sm" whiteSpace="pre-wrap">
        {JSON.stringify(dispute, null, 2)}
      </Text>
    </Flex>
  );
}
