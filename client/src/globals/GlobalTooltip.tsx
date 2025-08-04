import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type GlobalTooltipType = {
    children: React.ReactNode,
    text: string,
    type?: string
}

const GlobalTooltip = ({children, text, type = 'default'} : GlobalTooltipType) => {
  return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent className={`${type === 'danger' ? 'bg-destructive' : 'bg-primary'}`}>
                <p className='text-white'>{text}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default GlobalTooltip