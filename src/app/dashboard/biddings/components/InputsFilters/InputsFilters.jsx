"use client";

import {
  Flex,
  Text,
  Box,
  Input,
  Field,
  Menu,
  Portal,
  Button,
} from "@chakra-ui/react";

export default function InputsFilters() {
  return (
    <Flex gap={4} flexDir={{ base: "column", md: "row" }}>
      <Field.Root>
        <Field.Label>Identificador</Field.Label>
        <Input />
      </Field.Root>
      <Field.Root>
        <Field.Label>Órgão</Field.Label>
        <Input />
      </Field.Root>
      <Field.Root>
        <Field.Label>Cidade</Field.Label>
        <Input />
      </Field.Root>
      <Field.Root>
        <Field.Label>Status</Field.Label>

        <Menu.Root>
          <Menu.Trigger asChild w={"100%"}>
            <Button variant="outline" color={"gray.500"}>
              Selecione
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="suspended">Suspensa</Menu.Item>
                <Menu.Item value="reopened">Reaberta</Menu.Item>
                <Menu.Item value="cancelled">Cancelada</Menu.Item>
                <Menu.Item value="finished">Finalizada </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Field.Root>
      <Field.Root>
        <Field.Label>Modalidade</Field.Label>

        <Menu.Root>
          <Menu.Trigger asChild w={"100%"}>
            <Button variant="outline" color={"gray"}>
              Selecione
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="suspended">Dispensa de Licitação</Menu.Item>
                <Menu.Item value="reopened">Pregão eletrônico</Menu.Item>
                <Menu.Item value="cancelled">Convite eletrônico</Menu.Item>
                <Menu.Item value="finished">Concorrência</Menu.Item>
                <Menu.Item value="finished">Tomada de Preços</Menu.Item>
                <Menu.Item value="finished">Inexigibilidade</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Field.Root>{" "}
    </Flex>
  );
}
