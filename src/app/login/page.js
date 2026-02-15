"use client";

import {
  Flex,
  Text,
  Link,
  Image,
  Input,
  Button,
  Box,
  Separator,
  Stack,
  Icon,
  Field,
} from "@chakra-ui/react";

import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input";
import BtnGoogle from "./components/BtnGoogle/BtnGoogle";
import { CiMail } from "react-icons/ci";
import { PiPassword } from "react-icons/pi";
import useStore from "../../components/globalStates/store";

import { useState } from "react";

export default function Login() {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <>
      <Flex
        bgColor="gray.100"
        flexDir={"column"}
        border={"1px solid"}
        borderColor="gray.200"
        w={{ base: "90%", md: "32%" }}
        mx={"auto"}
        my={{ base: "3", md: "5" }}
        borderRadius={"20px"}
        justifyContent={"center"}
        alignItems={"center"}
        boxShadow={"2xl"}
        p={{ base: 4, md: 6 }}
      >
        <Flex justify={"center"}>
          <Image
            my={{ base: "3", md: "5" }}
            width={{ base: "40vw", md: "10vw" }}
            height={{ base: "6vh", md: "5vh" }}
            src="/logo-licitape.png"
            alt="LiciTape Logo"
          />
        </Flex>

        <Flex flexDir={"column"} align={"center"} mb={{ base: 4, md: 5 }}>
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight={"bold"}
            color="primary.800"
          >
            Bem vindo!
          </Text>
          <Text fontStyle={"italic"} fontSize={{ base: "sm", md: "md" }}>
            Faça o Login para continuar
          </Text>
        </Flex>
        <Flex w={{ base: "100%", md: "auto" }} justify="center">
          <BtnGoogle />
        </Flex>
        <Flex
          align="center"
          w={{ base: "100%", md: "80%" }}
          my={{ base: 3, md: 4 }}
        >
          <Separator flex="1" borderColor="gray.400" />
          <Text mx={4} color="gray.500" fontSize={{ base: "xs", md: "sm" }}>
            OU
          </Text>
          <Separator flex="1" borderColor="gray.400" />
        </Flex>
        <Flex
          flexDir={"column"}
          w={{ base: "100%", md: "80%" }}
          gap={{ base: 3, md: 4 }}
        >
          <Field.Root>
            <Flex justify={"center"} w={"100%"}>
              <Field.Label
                color="gray.600"
                fontWeight={"medium"}
                fontSize={{ base: "sm", md: "md" }}
              >
                Email
              </Field.Label>
            </Flex>
            <Flex w={"100%"} align={"center"} justify={"center"}>
              <Icon color="gray.500" size={{ base: "xl", md: "2xl" }} mr={"3"}>
                <CiMail />
              </Icon>
              <Input
                type="email"
                w={"70%"}
                size={{ base: "md", md: "lg" }}
                border={"1px solid"}
                borderColor="gray.300"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "primary.500", boxShadow: "outline" }}
                mt={1}
              />
            </Flex>
          </Field.Root>

          <Field.Root>
            <Flex justify={"center"} w={"100%"}>
              <Field.Label
                color="gray.600"
                fontWeight={"medium"}
                fontSize={{ base: "sm", md: "md" }}
              >
                Senha
              </Field.Label>
            </Flex>
            <Flex w={"100%"} align={"center"} justify={"center"}>
              <Icon color="gray.500" size={{ base: "xl", md: "2xl" }} mr={"3"}>
                <PiPassword />
              </Icon>
              <Input
                type="password"
                w={"70%"}
                size={{ base: "md", md: "lg" }}
                border={"1px solid"}
                borderColor="gray.300"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "primary.500", boxShadow: "outline" }}
                mt={1}
              />
            </Flex>
          </Field.Root>
          <Flex justifyContent={"center"}>
            <Button
              w={{ base: "100%", md: "300px" }}
              h={{ md: "8" }}
              bgColor="gray.900"
              _hover={{
                backgroundColor: "blue.500",
                transform: "translateY(-1px)",
              }}
              _active={{
                transform: "translateY(0)",
              }}
              p={{ base: "5", md: "7" }}
              border={"1px solid"}
              borderColor="gray.700"
              mt={{ base: 2, md: 3 }}
              size={{ base: "md", md: "lg" }}
            >
              <Text
                color="gray.50"
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="medium"
              >
                Entrar
              </Text>
            </Button>
          </Flex>
        </Flex>

        <Flex mt={{ base: 4, md: 5 }} mb={{ base: 2, md: 3 }}>
          <Text fontSize={{ base: "sm", md: "md" }} color="gray.600">
            Não tem uma conta?{" "}
            <Text
              as="span"
              color="primary.600"
              fontWeight="medium"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              <Link
                color="gray.600"
                _hover={{ color: "blue.500" }}
                as={"button"}
                onClick={() => setShowRegister(true)}
              >
                Cadastre-se
              </Link>
            </Text>
          </Text>
        </Flex>

        {showRegister && (
          <Flex flexDir={"column"}>
            <Flex flexDir={"column"}>
              <Flex flexDirection={{ md: "row", base: "column" }} gap={2}>
                <Field.Root mb={3}>
                  <Field.Label>E-mail</Field.Label>
                  <Input size={"sm"} placeholder="E-mail" />
                </Field.Root>
                <Field.Root mb={3}>
                  <Field.Label>Confirme seu E-mail</Field.Label>
                  <Input size={"sm"} placeholder="Confirme seu E-mail" />
                </Field.Root>
              </Flex>

              <Flex
                flexDirection={{ md: "row", base: "column" }}
                w={"100%"}
                gap={2}
              >
                <Field.Root mb={3}>
                  <Field.Label>Senha</Field.Label>
                  <PasswordInput size={"sm"} placeholder="Senha" />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Confirme sua senha</Field.Label>
                  <PasswordInput
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{
                      borderColor: "primary.500",
                      boxShadow: "outline",
                    }}
                    size={"sm"}
                    color={"gray.600"}
                    placeholder="Confirme sua senha"
                  />
                </Field.Root>
              </Flex>
            </Flex>
            <Flex justify={"center"}>
              <Button
                w={{ base: "100%", md: "300px" }}
                h={{ md: "8" }}
                bgColor="gray.900"
                _hover={{
                  backgroundColor: "blue.500",
                  transform: "translateY(-1px)",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                p={{ base: "5", md: "7" }}
                border={"1px solid"}
                borderColor="gray.700"
                mt={{ base: 2, md: 3 }}
                size={{ base: "md", md: "lg" }}
              >
                <Text
                  color="gray.50"
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="medium"
                >
                  Cadastrar
                </Text>
              </Button>
            </Flex>
          </Flex>
        )}
      </Flex>
    </>
  );
}
