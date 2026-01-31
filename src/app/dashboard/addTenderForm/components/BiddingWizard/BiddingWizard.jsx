"use client";

import { Flex, Text, IconButton } from "@chakra-ui/react";
import MenuForm from "./components/MenuForm/MenuForm";

import IdentificationStep from "./components/steps/IdentificationStep/IdentificationStep";
import DatesStep from "./components/steps/DatesStep/DatesStep";
import LocalStep from "./components/steps/LocalStep/LocalStep";
import DocumentationStep from "./components/steps/DocumentationStep/DocumentationStep";
import ComplementaryStep from "./components/steps/ComplementaryStep/ComplementaryStep";
import { CiEdit } from "react-icons/ci";

import { useState } from "react";

export default function BiddingWizard({
  biddingData,
  setBiddingData,
  date,
  setDate,
  edit,
  setEdit,
  showButtonEdit,
}) {
  const [activeStep, setActiveStep] = useState(1);

  const handleStepChange = (stepId) => {
    console.log("Mudando para step:", stepId);
    setActiveStep(stepId);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <>
            <IdentificationStep
              biddingData={biddingData}
              setBiddingData={setBiddingData}
              edit={edit}
              setEdit={setEdit}
            />
          </>
        );
      case 2:
        return (
          <DatesStep
            biddingData={biddingData}
            setBiddingData={setBiddingData}
            date={date}
            setDate={setDate}
          />
        );
      case 3:
        return (
          <LocalStep
            biddingData={biddingData}
            setBiddingData={setBiddingData}
          />
        );
      case 4:
        return (
          <DocumentationStep
            biddingData={biddingData}
            setBiddingData={setBiddingData}
          />
        );
      case 5:
        return (
          <ComplementaryStep
            biddingData={biddingData}
            setBiddingData={setBiddingData}
          />
        );
      default:
        return <IdentificationStep />;
    }
  };

  return (
    <Flex
      border="1px solid"
      borderRadius="20px"
      borderColor="gray.300"
      h={{ base: "100%" }}
      minH="600px"
      w="100%"
      maxW="1200px"
      p={{ base: "3%", md: "4%" }}
      mt="2"
      mb="3%"
      boxShadow="2xl"
      flexDirection="column"
      gap={4}
      align={"center"}
    >
      <Flex justify="flex-end" w="100%">
        <IconButton
          display={showButtonEdit ? "flex" : "none"}
          aria-label="Edit Button"
          onClick={() => setEdit(!edit)}
          bgColor={"blue.500"}
          color={"white"}
          _hover={{ bgColor: "blue.600" }}
        >
          <CiEdit />
        </IconButton>
      </Flex>
      <MenuForm activeStep={activeStep} onStepChange={handleStepChange} />
      <Flex flex={1} justify="center" w="100%">
        {renderStepContent()}
      </Flex>
    </Flex>
  );
}
