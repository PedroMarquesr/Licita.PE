"use client"

import { Button } from "@chakra-ui/react"
import { FaPrint } from "react-icons/fa6"

export default function PrintButton() {
  return (
    <Button
      className="no-print"
      colorPalette="blue"
      size="sm"
      leftIcon={<FaPrint />}
      onClick={() => window.print()}
    >
      <FaPrint />
    </Button>
  )
}
