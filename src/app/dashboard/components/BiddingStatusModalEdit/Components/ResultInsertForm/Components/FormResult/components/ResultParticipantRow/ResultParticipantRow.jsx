"use client"

import { Flex, Text, Checkbox, Button, Icon, Switch } from "@chakra-ui/react"
import InputResult from "../InputResult/InputResult"
import UnitPriceAllocatorBatch from "./components/UnitPriceAllocatorBatch/UnitPriceAllocatorBatch"
import calcTotalPrice from "../../modules/priceTotalCalculator"
import { useState } from "react"
import { TiDelete } from "react-icons/ti"

export default function ResultParticipantRow({
  group,
  participant,
  mb,
  ml,
  onChange,
  typeDispute,
  itemPrices,
  onItemDetailChange,

  // "Meu resultado"
  onCheckedChangeSelf,
  isSelfChecked,

  // "Participante vencedor"
  onCheckedChangeWinner,
  winnerChecked,

  // "Participante desclassificado"
  onCheckedChangeDisqualified,
  disqualificationChecked,
  showCheckDisqualification,

  // "Participante inabilitado"
  onCheckedChangeIneligible,
  ineligibleChecked,
  showCheckIneligible,

  // Ref quantidade (para item)
  amountItemParticipant,

  deleteParticipant,
}) {
  const [showUnitPriceDistributor, setShowUnitPriceDistributor] =
    useState(false)

  const getBgColor = () => {
    if (winnerChecked) return "yellow.50"
    if (ineligibleChecked || disqualificationChecked) return "red.50"
    return "white"
  }

  const calculateTotalPrice = () => {
    if (typeDispute !== "batch" || !group || !itemPrices) {
      return null
    }

    return group.items.reduce((total, item) => {
      const itemPrice = parseFloat(itemPrices[item.itemId]) || 0
      const itemAmount = parseFloat(item.amount) || 0
      return total + itemPrice * itemAmount
    }, 0)
  }

  return (
    <Flex
      w={{ base: "100%", lg: "90%" }}
      mb={mb}
      ml={{ base: 0, md: ml }}
      bg={getBgColor()}
      p={3}
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.200"
      boxShadow="sm"
      flexDir={{ base: "column", lg: "row" }}
      _hover={{
        borderColor: "blue.200",
        boxShadow: "md",
        transition: "all 0.2s",
        bg: winnerChecked
          ? "yellow.100"
          : ineligibleChecked || disqualificationChecked
          ? "red.100"
          : "blue.50",
      }}
      transition="all 0.2s"
    >
      <Flex flexDir="column" w="100%">
        <Flex
          alignItems={{ base: "stretch", md: "center" }}
          flexWrap="wrap"
          gap={3}
          flexDir={{ base: "column", md: "row" }}
        >
          <InputResult
            columnTitle="Coloc."
            width={{ base: "100%", md: "60px" }}
            textAlignInput="center"
            value={participant.position}
            onChange={(e) => onChange("position", e.target.value)}
            bg="white"
            borderColor="gray.300"
            _hover={{ borderColor: "blue.400" }}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px blue.500",
            }}
          />

          <InputResult
            columnTitle="Participante"
            width={{ base: "100%", md: "280px" }}
            textAlignInput="left"
            value={participant.bidder}
            onChange={(e) => onChange("bidder", e.target.value)}
            bg="white"
            borderColor="gray.300"
            _hover={{ borderColor: "blue.400" }}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px blue.500",
            }}
          />

          <InputResult
            value={participant.brand}
            onChange={(e) => onChange("brand", e.target.value)}
            columnTitle="Marca"
            textAlignInput="left"
            width={{ base: "100%", md: "150px" }}
            bg="white"
            borderColor="gray.300"
            _hover={{ borderColor: "blue.400" }}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px blue.500",
            }}
          />

          <InputResult
            value={participant.price}
            onChange={(e) => onChange("price", e.target.value)}
            columnTitle={
              typeDispute === "batch" ? "Preço total do lote" : "Preço"
            }
            textAlignInput="center"
            width={{
              base: "100%",
              md: typeDispute === "batch" ? "160px" : "120px",
            }}
            typeInput="number"
            bg="white"
            borderColor="gray.300"
            _hover={{ borderColor: "blue.400" }}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px blue.500",
            }}
          />

          {typeDispute !== "batch" && amountItemParticipant && (
            <InputResult
              value={calcTotalPrice(amountItemParticipant, participant.price)}
              columnTitle="Valor total"
              textAlignInput="center"
              width={{ base: "100%", md: "140px" }}
              typeInput="number"
              readOnlyInput={true}
              bg="gray.50"
              borderColor="gray.300"
              color="gray.700"
              fontWeight="medium"
            />
          )}

          {typeDispute === "batch" && (
            <InputResult
              value={calculateTotalPrice()}
              columnTitle="Valor total"
              textAlignInput="center"
              width={{ base: "100%", md: "140px" }}
              typeInput="number"
              readOnlyInput={true}
              bg="gray.50"
              borderColor="gray.300"
              color="gray.700"
              fontWeight="medium"
            />
          )}

          {/* CHECKBOXES */}
          <Flex flexDir="column" gap={1} mt={{ base: 2, md: 0 }}>
            <Checkbox.Root
              colorPalette="green"
              size="xs"
              onCheckedChange={(e) => onCheckedChangeSelf(e.checked)}
              checked={isSelfChecked}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control
                borderColor={isSelfChecked ? "green.500" : "gray.400"}
                _checked={{ bg: "green.500", borderColor: "green.500" }}
              />
              <Checkbox.Label color="gray.700" fontSize="xs">
                Meu resultado
              </Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root
              colorPalette="purple"
              size="xs"
              onCheckedChange={(e) => onCheckedChangeWinner(e.checked)}
              checked={winnerChecked}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control
                borderColor={winnerChecked ? "purple.500" : "gray.400"}
                _checked={{ bg: "purple.500", borderColor: "purple.500" }}
              />
              <Checkbox.Label color="gray.700" fontSize="xs">
                Participante vencedor
              </Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root
              colorPalette="red"
              size="xs"
              onCheckedChange={(e) => onCheckedChangeDisqualified(e.checked)}
              checked={disqualificationChecked}
              display={showCheckDisqualification ? "flex" : "none"}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control
                borderColor={disqualificationChecked ? "red.500" : "gray.400"}
                _checked={{ bg: "red.500", borderColor: "red.500" }}
              />
              <Checkbox.Label color="gray.700" fontSize="xs">
                Participante desclassificado
              </Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root
              colorPalette="red"
              size="xs"
              onCheckedChange={(e) => onCheckedChangeIneligible(e.checked)}
              checked={ineligibleChecked}
              display={showCheckIneligible ? "flex" : "none"}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control
                borderColor={ineligibleChecked ? "red.500" : "gray.400"}
                _checked={{ bg: "red.500", borderColor: "red.500" }}
              />
              <Checkbox.Label color="gray.700" fontSize="xs">
                Participante inabilitado
              </Checkbox.Label>
            </Checkbox.Root>
          </Flex>

          {typeDispute === "batch" && group && (
            <Flex flexDir="column" ml={{ md: 2 }}>
              <Switch.Root
                colorPalette="green"
                size="xs"
                onCheckedChange={() =>
                  setShowUnitPriceDistributor(!showUnitPriceDistributor)
                }
              >
                <Switch.HiddenInput />
                <Switch.Control />
                <Switch.Label>
                  <Text fontSize="xs">Redistribuir valores unitários</Text>
                </Switch.Label>
              </Switch.Root>
            </Flex>
          )}
        </Flex>

        {typeDispute === "batch" && showUnitPriceDistributor && group && (
          <Flex flexDir="column" mt={4} gap={3}>
            {group.items.map((item) => {
              const itemPriceData = itemPrices?.find(
                (ip) => ip.itemId === item.itemId
              ) || {
                itemId: item.itemId,
                price: "",
                brand: "",
              }

              return (
                <UnitPriceAllocatorBatch
                  key={item.itemId}
                  item={item}
                  itemPrice={itemPriceData}
                  onPriceChange={(value) =>
                    onItemDetailChange(item.itemId, "price", value)
                  }
                  onBrandChange={(value) =>
                    onItemDetailChange(item.itemId, "brand", value)
                  }
                />
              )
            })}
          </Flex>
        )}

        {disqualificationChecked && (
          <Flex
            borderRadius="md"
            borderWidth="1px"
            borderColor="red.200"
            mt={4}
            p={3}
            bg="red.50"
            flexDir={{ base: "column", md: "row" }}
            gap={3}
            align={{ md: "center" }}
          >
            <Text
              color="red.700"
              fontWeight="medium"
              fontSize="xs"
              minW="130px"
            >
              Motivo da desclassificação:
            </Text>

            <InputResult
              value={participant.disqualificationReason || ""}
              onChange={(e) =>
                onChange("disqualificationReason", e.target.value)
              }
              width={{ base: "100%", md: "50%" }}
              placeholder="Digite o motivo..."
              bg="white"
              borderColor="red.300"
              _hover={{ borderColor: "red.400" }}
              _focus={{
                borderColor: "red.500",
                boxShadow: "0 0 0 1px red.500",
              }}
            />
          </Flex>
        )}

        {ineligibleChecked && (
          <Flex
            borderRadius="md"
            borderWidth="1px"
            borderColor="red.200"
            mt={4}
            p={3}
            bg="red.50"
            flexDir={{ base: "column", md: "row" }}
            gap={3}
            align={{ md: "center" }}
          >
            <Text
              color="red.700"
              fontWeight="medium"
              fontSize="xs"
              minW="130px"
            >
              Motivo da inabilitação:
            </Text>

            <InputResult
              value={participant.ineligibleReason || ""}
              onChange={(e) => onChange("ineligibleReason", e.target.value)}
              width={{ base: "100%", md: "50%" }}
              placeholder="Digite o motivo..."
              bg="white"
              borderColor="red.300"
              _hover={{ borderColor: "red.400" }}
              _focus={{
                borderColor: "red.500",
                boxShadow: "0 0 0 1px red.500",
              }}
            />
          </Flex>
        )}
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="center"
        mt={{ base: 3, lg: 0 }}
        ml={{ lg: 2 }}
      >
        <Button
          colorPalette="red"
          size="sm"
          variant="ghost"
          p={1}
          minW="auto"
          h="auto"
          onClick={() => deleteParticipant?.()}
          _hover={{
            bg: "red.100",
            transform: "scale(1.1)",
            transition: "all 0.2s",
          }}
          color="gray.600"
        >
          <Icon boxSize={5}>
            <TiDelete />
          </Icon>
        </Button>
      </Flex>
    </Flex>
  )
}
