import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type GlobalTooltipType = {
    children: React.ReactNode,
    text: string
}

const GlobalTooltip = ({children, text} : GlobalTooltipType) => {
  return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                <p className='text-white'>{text}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default GlobalTooltip