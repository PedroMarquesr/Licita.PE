"use Client";

import { Grid, Text } from "@chakra-ui/react";

export default function TitleRows() {
  return (
    <Grid
      templateColumns="repeat(7, 1fr)"
      gap={4}
      bg="gray.50"
      px={6}
      py={4}
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      borderRadius="xl"
      mb={1}
    >
      <Text
        fontWeight="semibold"
        fontSize="xs"
        color="gray.600"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        Nº identificador
      </Text>
      <Text
        fontWeight="semibold"
        fontSize="xs"
        color="gray.600"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        Modalidade
      </Text>
      <Text
        fontWeight="semibold"
        fontSize="xs"
        color="gray.600"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        Órgão
      </Text>
      <Text
        fontWeight="semibold"
        fontSize="xs"
        color="gray.600"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        Cidade
      </Text>
      <Text
        fontWeight="semibold"
        fontSize="xs"
        color="gray.600"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        Status
      </Text>
      <Text
        fontWeight="semibold"
        fontSize="xs"
        color="gray.600"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        Data de disputa
      </Text>
      <Text
        fontWeight="semibold"
        fontSize="xs"
        color="gray.600"
        textTransform="uppercase"
        letterSpacing="wider"
        textAlign={"center"}
      >
        Ação
      </Text>
    </Grid>
  );
}
