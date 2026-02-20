// "use client"

// import { Flex, Dialog, Text, Button, Input } from "@chakra-ui/react"
// import { getAuth, sendPasswordResetEmail } from "firebase/auth"
// import { useState } from "react"

// export default function PasswordReset({ open, onClose, message }) {
//   const [email, setEmail] = useState("")

//   const triggerPasswordReset = async () => {
//     try {
//       const auth = getAuth()
//       sendPasswordResetEmail(auth, email)
//       console.log("Email de definição enviado")
//     } catch (error) {
//       console.log("Erro:", error)
//     }
//   }
//   return (
//     <Flex>
//       <Dialog.Root open={open} onClose={onClose} size={"md"}>
//         <Dialog.Backdrop bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(4px)" />
//         <Dialog.Positioner>
//           <Dialog.Content
//             bg="gray.800"
//             borderRadius="xl"
//             boxShadow="2xl"
//             border="1px solid"
//             borderColor="gray.700"
//             p={2}
//           >
//             <Dialog.Header>
//               <Text>Recuperação de senha</Text>
//             </Dialog.Header>
//             <Dialog.Body>
//               <Flex
//                 direction="column"
//                 align="center"
//                 justify="center"
//                 minH="120px"
//                 px={6}
//                 py={4}
//               >
//                 <Text
//                   fontSize="lg"
//                   color="gray.100"
//                   fontWeight="medium"
//                   lineHeight="tall"
//                   justifyContent={"left"}
//                   border={"1px solid red"}
//                   w={"100%"}
//                 >
//                   Informe seu email
//                 </Text>
//                 <Input
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Digite seu email"
//                   type="email"
//                   size={{ base: "md", md: "lg" }}
//                   border={"1px solid"}
//                   borderColor="gray.300"
//                   _hover={{ borderColor: "gray.500" }}
//                   _focus={{ borderColor: "primary.500", boxShadow: "outline" }}
//                   mt={1}
//                   color={"white"}
//                 />
//               </Flex>
//             </Dialog.Body>

//             <Dialog.Footer justifyContent="center" pt={2} pb={4}>
//               <Button
//                 onClick={triggerPasswordReset}
//                 bg="blue.500"
//                 color="white"
//                 px={8}
//                 py={6}
//                 fontSize="md"
//                 fontWeight="medium"
//                 borderRadius="lg"
//                 _hover={{
//                   bg: "blue.600",
//                 }}
//                 w="50px"
//               >
//                 Enviar
//               </Button>
//             </Dialog.Footer>
//           </Dialog.Content>
//         </Dialog.Positioner>
//       </Dialog.Root>
//     </Flex>
//   )
// }

"use client"

import {
  Flex,
  Dialog,
  Text,
  Button,
  Input,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { FiMail, FiArrowLeft } from "react-icons/fi"

export default function PasswordReset({ open, onClose, message }) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  const triggerPasswordReset = async () => {
    if (!email) return

    setIsLoading(true)
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      setResetSent(true)
      console.log("Email de definição enviado")

      // Fechar após 3 segundos se sucesso
      setTimeout(() => {
        handleClose()
      }, 3000)
    } catch (error) {
      console.log("Erro:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setEmail("")
    setResetSent(false)
    onClose()
  }

  return (
    <Dialog.Root open={open} onClose={handleClose} size="md">
      <Dialog.Backdrop
        bg="rgba(0, 0, 0, 0.7)"
        backdropFilter="blur(8px)"
        transition="all 0.2s"
      />

      <Dialog.Positioner>
        <Dialog.Content
          bg="gray.800"
          borderRadius="2xl"
          boxShadow="2xl"
          border="1px solid"
          borderColor="gray.700"
          overflow="hidden"
          animation="fadeIn 0.3s ease-out"
        >
          {/* Header com gradiente */}
          <Dialog.Header
            bg="gray.900"
            borderBottom="1px solid"
            borderColor="gray.700"
            py={6}
          >
            <VStack spacing={1} align="center" w="full">
              <Icon as={FiMail} boxSize={8} color="blue.400" mb={2} />
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="white"
                letterSpacing="tight"
              >
                Recuperar senha
              </Text>
              <Text fontSize="sm" color="gray.400" textAlign="center">
                Enviaremos instruções para redefinir sua senha
              </Text>
            </VStack>
          </Dialog.Header>

          <Dialog.Body py={8} px={8}>
            {!resetSent ? (
              <VStack spacing={6}>
                <Flex w="full">
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.300"
                    mb={2}
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Icon as={FiMail} color="blue.400" />
                    Seu e-mail
                  </Text>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    type="email"
                    size="lg"
                    bg="gray.700"
                    border="1px solid"
                    borderColor="gray.600"
                    color="white"
                    fontSize="md"
                    py={6}
                    _hover={{
                      borderColor: "gray.500",
                      bg: "gray.650",
                    }}
                    _focus={{
                      borderColor: "blue.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)",
                      bg: "gray.700",
                    }}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                </Flex>

                <Text fontSize="xs" color="gray.500" textAlign="center">
                  Você receberá um e-mail com um link para redefinir sua senha.
                  O link expira em 1 hora.
                </Text>
              </VStack>
            ) : (
              <VStack spacing={4} py={6}>
                <Flex
                  w="16"
                  h="16"
                  bg="green.500"
                  borderRadius="full"
                  align="center"
                  justify="center"
                >
                  <Icon as={FiMail} boxSize={8} color="white" />
                </Flex>
                <Text color="white" fontSize="lg" fontWeight="medium">
                  E-mail enviado!
                </Text>
                <Text color="gray.400" fontSize="sm" textAlign="center">
                  Verifique sua caixa de entrada e siga as instruções
                </Text>
              </VStack>
            )}
          </Dialog.Body>

          <Dialog.Footer
            bg="gray.900"
            borderTop="1px solid"
            borderColor="gray.700"
            py={6}
            px={8}
          >
            <VStack spacing={3} w="full">
              {!resetSent ? (
                <>
                  <Button
                    onClick={triggerPasswordReset}
                    isLoading={isLoading}
                    loadingText="Enviando..."
                    bg="blue.500"
                    color="white"
                    w="full"
                    h="14"
                    fontSize="md"
                    fontWeight="semibold"
                    borderRadius="lg"
                    _hover={{
                      bg: "blue.600",
                      transform: "translateY(-1px)",
                      boxShadow: "lg",
                    }}
                    _active={{
                      bg: "blue.700",
                      transform: "translateY(0)",
                    }}
                    transition="all 0.2s"
                    isDisabled={!email}
                  >
                    Enviar instruções
                  </Button>

                  <Button
                    onClick={handleClose}
                    variant="ghost"
                    color="gray.400"
                    w="full"
                    h="12"
                    fontSize="sm"
                    _hover={{
                      color: "white",
                      bg: "gray.800",
                    }}
                    leftIcon={<Icon as={FiArrowLeft} />}
                  >
                    Voltar
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleClose}
                  bg="gray.700"
                  color="white"
                  w="full"
                  h="14"
                  fontSize="md"
                  fontWeight="semibold"
                  borderRadius="lg"
                  _hover={{
                    bg: "gray.600",
                  }}
                >
                  Fechar
                </Button>
              )}
            </VStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
