"use client";

import { Button, Icon, Text, Flex, Box } from "@chakra-ui/react";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db, app } from "@/components/libs/firebaseinit";
import useStore from "../../../../components/globalStates/store";
import { useRouter } from "next/navigation";

import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

import { FcGoogle } from "react-icons/fc";

export default function BtnGoogle() {
  const auth = getAuth(app);
  const getUser = useStore((state) => state.getUser);
  const router = useRouter();

  async function loginGoogle() {
    const provider = new GoogleAuthProvider();
    console.log(`Clicou no botão`);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(result);
        console.log(`Objeto recebido no login`, user);
        getUser();
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Erro no login:", error);
      });
  }
  return (
    <>
      <Button
        onClick={loginGoogle}
        w={{ base: "100%", md: "300px" }}
        bgColor="gray.50"
        _hover={{
          backgroundColor: "gray.200",
          borderColor: "gray.500",
        }}
        p={{ base: "4", md: "7" }}
        border={"1px solid"}
        borderColor="gray.200"
      >
        <Icon size={{ base: "xl", md: "2xl" }}>
          <FcGoogle />
        </Icon>
        <Text color="gray.800" fontSize={{ base: "sm", md: "md" }} ml={2}>
          Continue com Google
        </Text>
      </Button>
    </>
  );
}
