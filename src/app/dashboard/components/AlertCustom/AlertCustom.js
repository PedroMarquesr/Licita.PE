"use client"

import { Alert, Collapsible } from "@chakra-ui/react"
import { useEffect } from "react"

export default function AlertCustom({
  status,
  description,
  openAlert,
  setOpenAlert,
}) {
  useEffect(() => {
    if (openAlert) {
      const timer = setTimeout(() => {
        setOpenAlert(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [openAlert, setOpenAlert])

  return (
    <Collapsible.Root
      open={openAlert}
      w={"100vw"}
      position={"fixed"}
      top={"0"}
      left={"0"}
    >
      <Collapsible.Content>
        <Alert.Root
          variant="solid"
          status={status}
          borderRadius="md"
          boxShadow="sm"
          size={"sm"}
        >
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Description fontWeight="medium">
              {description}
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
