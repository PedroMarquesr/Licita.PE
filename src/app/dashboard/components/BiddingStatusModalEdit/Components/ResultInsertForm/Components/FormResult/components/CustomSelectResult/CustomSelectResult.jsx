"use client"
import {
  Flex,
  useFilter,
  Combobox,
  useListCollection,
  Portal,
} from "@chakra-ui/react"

export default function CustomSelectResult({
  legend,
  placeholder,
  onValueChange,
  options,
  value,
  edit,
  width,
  columnTitle,
}) {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: options || [],
    filter: contains,
  })
  return (
    <Flex>
      <Text p={0} m={0} color={"gray.700"} fontSize={"sm"} textAlign={"left"}>
        {columnTitle}
      </Text>
      <Combobox.Root
        disabled={edit}
        collection={collection}
        onInputValueChange={(e) => filter(e.inputValue)}
        onValueChange={(e) => onValueChange && onValueChange(e.value)}
        width={width}
        h={6}
      >
        <Flex alignItems="center" gap={2} h={6}>
          <Combobox.Label fontWeight={"semibold"}>{legend}</Combobox.Label>
          <Combobox.Control>
            <Combobox.Input
              _hover={{ borderColor: "gray.500" }}
              _focus={{ borderColor: "primary.500", boxShadow: "outline" }}
              placeholder={placeholder}
            />
            <Combobox.IndicatorGroup>
              <Combobox.ClearTrigger />
              <Combobox.Trigger />
            </Combobox.IndicatorGroup>
          </Combobox.Control>
        </Flex>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content zIndex="1500">
              <Combobox.Empty>No items found</Combobox.Empty>
              {collection.items.map((item) => (
                <Combobox.Item item={item} key={item.value}>
                  {item.label}
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
    </Flex>
  )
}
