import React from "react"
import Logo from "@/components/landing/Navbar/Logo"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Clipboard, ClipboardCheck, X } from "lucide-react"

import { useSelector } from "react-redux"
import GlobalTooltip from "./GlobalTooltip"
import { store } from "@/store"
import { setIsCopied } from "@/cart/globalSlice"
import ShareDialogSocial from "./ShareDialogSocial"

const ShareBookDialog = ({children} : {children: React.ReactNode}) => {


  const {shareBookLink, isCopied} = useSelector((state:any) => state.globalState)
  const newLink = shareBookLink.slice(7)


  const handleCopyText = async() => {
    store.dispatch(setIsCopied(true))
    try {
      await navigator.clipboard.writeText(shareBookLink)
      setTimeout(() => {
        console.log('mwemwe');
        
        store.dispatch(setIsCopied(false))
      }, 1000);
    } catch (error) {
      console.log('error')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogCancel className="w-fit border-0 ml-auto"><X /> </AlertDialogCancel>
        <AlertDialogHeader className="flex flex-col items-center">
          <Logo />
          <AlertDialogTitle className="text-center">Bagikan ke teman anda!</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Temukan sesuatu yang menarik? Bantu temanmu menemukan referensi bacaan yang bermanfaat juga. Bagikan buku ini ke media sosial atau salin tautannya untuk dibagikan langsung!
          </AlertDialogDescription>

          <div className="w-full flex items-center border-r border-y rounded-lg my-4">
            <h4 className="py-2 h-full text-sm rounded-l-lg w-20 text-muted-foreground text-center bg-secondary">http://</h4>
            <Input defaultValue={newLink} readOnly className="!bg-transparent border-none focus:outline-none focus:ring-0 focus-visible:ring-0" />
            <GlobalTooltip text={isCopied ? 'Tautan disalin' : 'Salin tautan'}>
              <div className="w-16 bg-secondary h-full rounded-r-lg">
                  {isCopied ? (
                    <ClipboardCheck className="w-4 mx-auto h-full stroke-primary" />
                  ) : (
                    <Clipboard onClick={handleCopyText} className="w-4 mx-auto h-full" />
                  )}
              </div>
            </GlobalTooltip>
          </div>

          <ShareDialogSocial />

          <p className="my-4 text-[12px] text-muted-foreground italic">Dengan membagikan buku ini, kamu turut mendukung budaya literasi dan saling berbagi pengetahuan.</p>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ShareBookDialog