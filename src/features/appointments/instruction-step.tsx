import type React from "react"
import { CheckCircle2 } from "lucide-react"

interface InstructionStepProps {
  text: string
}

const InstructionStep: React.FC<InstructionStepProps> = ({ text }) => {
  return (
    <div className="flex items-start">
      <CheckCircle2 className="h-6 w-6 text-[#E05E00] flex-shrink-0 mt-0.5 mr-4" />
      <p className="text-gray-600 leading-relaxed">{text}</p>
    </div>
  )
}

export default InstructionStep
