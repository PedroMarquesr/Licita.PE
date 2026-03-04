"use client"
import {
  Flex,
  Field,
  Text,
  Fieldset,
  Stack,
  Input,
  useFilter,
  Combobox,
  useListCollection,
  Portal,
} from "@chakra-ui/react"

export default function CustomSelect({
  legend,
  placeholder,
  onValueChange,
  options,
  value,
  edit,
}) {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: options || [],
    filter: contains,
  })
  return (
    <>
      <Combobox.Root
        disabled={edit}
        collection={collection}
        onInputValueChange={(e) => filter(e.inputValue)}
        onValueChange={(e) => onValueChange && onValueChange(e.value)}
        width="320px"
      >
        <Flex alignItems="center" gap={2}>
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
    </>
  )
}
