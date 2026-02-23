"use client"

import {
  Flex,
  Text,
  Link,
  Image,
  Input,
  Button,
  Box,
  List,
  Separator,
  Stack,
  Icon,
  Field,
} from "@chakra-ui/react"

import { PasswordInput } from "@/components/ui/password-input"
import BtnGoogle from "./components/BtnGoogle/BtnGoogle"
import DialogDefault from "@/components/DialogDefault/DialogDefault"
import PasswordReset from "./components/PasswordReset/PasswordReset"
import VerificationResendCountdown from "./components/VerificationResendCountdown/VerificationResendCountdown"
import { CiMail } from "react-icons/ci"
import { PiPassword } from "react-icons/pi"
import { MdSmsFailed } from "react-icons/md"
import { FaCheckCircle } from "react-icons/fa"

import {
  getAuth,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"

import useStore from "../../components/globalStates/store"
import { useRouter } from "next/navigation"

import { useState } from "react"

export default function Login() {
  const [showRegister, setShowRegister] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [emailLogin, setEmailLogin] = useState("")

  const [isLengthValid, setIsLengthValid] = useState(false)
  const [passwordLogin, setPasswordLogin] = useState("")
  const [hasUppercase, setHasUppercase] = useState(false)
  const [hasLowercase, setHasLowercase] = useState(false)
  const [hasSpecialChar, setHasSpecialChar] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)
  const [showDialogEmailNotVerified, setShowDialogEmailNotVerified] =
    useState(false)

  const [showDialogSucessRegister, setShowDialogSucessRegister] =
    useState(false)
  const [showLoginError, setShowLoginError] = useState(false)
  const [showCounter, setShowCounter] = useState(false)
  const [showPasswordReset, setShowPasswordReset] = useState(false)
  const [intervalSeconds, setIntervalSeconds] = useState(120)

  const getUser = useStore((state) => state.getUser)

  const router = useRouter()

  const isPasswordValid =
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar &&
    isLengthValid &&
    password === confirmPassword &&
    email === confirmEmail

  const handleRegister = async () => {
    if (!isPasswordValid) {
      alert("Algum requisito de senha não foi cumprido")
      return
    }

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      auth.languageCode = "pt-BR"

      await sendEmailVerification(user)

      setShowDialogSucessRegister(true)
      // await auth.signOut() // ← virificar o que fazer com isso

      setShowRegister(false)
      // ↓ Provisão temprorária, preciso tranformar tudo em apenas um useState
      setEmail("")
      setPassword("")
      setConfirmEmail("")
      setConfirmPassword("")
      setEmailLogin("")
      // ↑ Provisão temprorária, preciso tranformar tudo em apenas um useState
      setShowCounter(true)
    } catch (error) {
      console.log("Erro real:", error)
    }
  }

  const handleResendEmail = async () => {
    try {
      const auth = getAuth()
      const user = auth.currentUser
      if (user) {
        await sendEmailVerification(user)
        console.log("Email reenviado")
        setIntervalSeconds(120)
        setShowSeconds(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const requirementPassword = [
    { requirement: "De 6 a 15 caracteres", valid: isLengthValid },
    {
      requirement: "Caractere maiúsculo",
      valid: hasUppercase,
    },
    {
      requirement: "Caractere minúsculo",
      valid: hasLowercase,
    },
    {
      requirement: "Caractere especial",
      valid: hasSpecialChar,
    },
    {
      requirement: "Caractere numérico",
      valid: hasNumber,
    },
    {
      requirement: "Campos do Email não coincidem",
      valid: email !== "" && email === confirmEmail,
      ref: "email",
    },
    {
      requirement: "Campos se senha não coincidem",
      valid: password !== "" && password === confirmPassword,
      ref: "password",
    },
  ]
  const checkRequirementPassword = (pass) => {
    if (/[A-Z]/.test(pass)) {
      setHasUppercase(true)
    } else {
      setHasUppercase(false)
    }

    if (/[a-z]/.test(pass)) {
      setHasLowercase(true)
    } else {
      setHasLowercase(false)
    }

    if (/\d/.test(pass)) {
      setHasNumber(true)
    } else {
      setHasNumber(false)
    }
    if (/[@#$%&*!?\-_=.,;:]/.test(pass)) {
      setHasSpecialChar(true)
    } else {
      setHasSpecialChar(false)
    }
    if (pass.length >= 6 && pass.length <= 15) {
      setIsLengthValid(true)
    } else {
      setIsLengthValid(false)
    }
  }

  const handleLogin = () => {
    const auth = getAuth()

    signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
      .then((userCredential) => {
        const user = userCredential.user

        if (!user.emailVerified) {
          setShowDialogEmailNotVerified(true)
          auth.signOut()
          return
        }

        getUser()
        router.push("/dashboard")
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setShowLoginError(true)
      })
  }

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
        <DialogDefault
          open={showDialogSucessRegister}
          message="Email de verificação enviado! Após confirmar, faça login com seu email e senha."
          onClose={() => setShowDialogSucessRegister(false)}
        />
        <DialogDefault
          open={showDialogEmailNotVerified}
          message="Email não verificado! Verifique sua caixa de entrada e clique no link de confirmação antes de fazer login."
          onClose={() => setShowDialogEmailNotVerified(false)}
        />
        <DialogDefault
          open={showLoginError}
          message="Email ou senha inválidos"
          onClose={() => setShowLoginError(false)}
        />
        <PasswordReset
          open={showPasswordReset}
          onClose={() => setShowPasswordReset(false)}
        />
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
                value={emailLogin}
                onChange={(e) => setEmailLogin(e.target.value)}
                placeholder="Digite seu email"
                type="email"
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
            <Flex w={"100%"} align={"center"} justify={"center"} mb={5}>
              <Icon color="gray.500" size={{ base: "xl", md: "2xl" }} mr={"3"}>
                <PiPassword />
              </Icon>
              <PasswordInput
                value={passwordLogin}
                onChange={(e) => setPasswordLogin(e.target.value)}
                type="password"
                size={{ base: "md", md: "lg" }}
                border={"1px solid"}
                borderColor="gray.300"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "primary.500", boxShadow: "outline" }}
                mt={1}
              />
            </Flex>
          </Field.Root>

          {showCounter && (
            <VerificationResendCountdown
              resendEmail={handleResendEmail()}
              interval={intervalSeconds}
            />
          )}

          <Flex justify={"center"}>
            <Button
              onClick={handleLogin}
              w={{ base: "100%", md: "300px" }}
              h={{ md: "8" }}
              maxW={"250px"}
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
        <Flex>
          <Text fontSize={{ base: "sm", md: "xs" }} color="gray.600">
            <Link
              color="gray.600"
              _hover={{ color: "blue.500" }}
              as={"button"}
              onClick={() => setShowPasswordReset(!showPasswordReset)}
            >
              Esqueceu sua senha?{" "}
            </Link>
          </Text>
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
              <Flex flexDirection={{ md: "column", base: "column" }} gap={2}>
                <Field.Root mb={3}>
                  <Field.Label>E-mail</Field.Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size={"sm"}
                    placeholder="E-mail"
                    type="email"
                  />
                </Field.Root>

                <Field.Root mb={3}>
                  <Field.Label>Confirme seu E-mail</Field.Label>
                  <Input
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    size={"sm"}
                    placeholder="Confirme seu E-mail"
                    type="email"
                  />
                </Field.Root>
              </Flex>

              <Flex
                flexDirection={{ md: "row", base: "column" }}
                w={"100%"}
                gap={2}
              >
                <Field.Root mb={3}>
                  <Field.Label>Senha</Field.Label>
                  <PasswordInput
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      checkRequirementPassword(e.target.value)
                    }}
                    size={"sm"}
                    placeholder="Senha"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Confirme sua senha</Field.Label>
                  <PasswordInput
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                    }}
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

              <Box fontSize={"xs"}>
                <Text
                  fontWeight="semibold"
                  mb={2}
                  color="gray.700"
                  fontSize="sm"
                >
                  Requisitos de preenchimento:
                </Text>{" "}
                <List.Root fontSize={"xs"} ml={2} unstyled>
                  {requirementPassword.map((item, index) => (
                    <List.Item
                      key={index}
                      mb={1.5}
                      display={
                        (item.ref === "password" && item.valid) ||
                        (item.ref === "email" && item.valid)
                          ? "none"
                          : "flex"
                      }
                    >
                      <Flex alignItems="center" gap={2}>
                        <Flex
                          w="18px"
                          h="18px"
                          borderRadius="full"
                          bg={item.valid ? "green.100" : "red.100"}
                          align="center"
                          justify="center"
                          transition="all 0.2s"
                        >
                          <Icon
                            as={item.valid ? FaCheckCircle : MdSmsFailed}
                            color={item.valid ? "green.600" : "red.500"}
                            fontSize="12px"
                          />
                        </Flex>
                        <Text
                          color={item.valid ? "green.700" : "gray.600"}
                          fontWeight={item.valid ? "medium" : "normal"}
                          textDecoration={item.valid ? "none" : "none"}
                          transition="all 0.2s"
                        >
                          {item.requirement}
                        </Text>
                      </Flex>
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
            </Flex>
            <Flex justify={"center"}>
              <Button
                w={{ base: "100%", md: "300px" }}
                h={{ md: "8" }}
                maxW={"250px"}
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
                onClick={handleRegister}
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
  )
}
