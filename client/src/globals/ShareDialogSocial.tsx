import {
    WhatsappIcon, 
    FacebookIcon, 
    TwitterIcon, 
    TelegramIcon} from 'react-share'
import GlobalTooltip from './GlobalTooltip'

const ShareDialogSocial = () => {
  return (
    <div className="w-full flex items-center justify-center gap-x-6">
        <GlobalTooltip text="WhatsApp">
            <WhatsappIcon className="w-12 h-12 rounded-full grayscale-0 dark:grayscale-100"  />
        </GlobalTooltip>
        <GlobalTooltip text='Facebook'>
            <FacebookIcon className="w-12 h-12 rounded-full grayscale-0 dark:grayscale-100"  />
        </GlobalTooltip>
        <GlobalTooltip text='Twitter'>
            <TwitterIcon className="w-12 h-12 rounded-full grayscale-0 dark:grayscale-100"  />
        </GlobalTooltip>
        <GlobalTooltip text='Telegram'>
            <TelegramIcon className="w-12 h-12 rounded-full grayscale-0 dark:grayscale-100"  />
        </GlobalTooltip>
    </div>
  )
}

export default ShareDialogSocial