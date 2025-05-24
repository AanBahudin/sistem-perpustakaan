import GlobalTooltip from './GlobalTooltip'
import { ThumbsUp, BookMarked, Share2 } from 'lucide-react'
import ShareBookDialog from './ShareBookDialog'
import { generateBookLink } from '@/utils/generateBookLink'

const ListLayoutButtons = ({id} : {id: string}) => {
  return (
    <div className="flex items-center gap-x-2">
        <GlobalTooltip text="Disukai">
            <ThumbsUp className="w-8 h-8 border p-2 rounded-lg hover:bg-muted duration-200 ease-in-out" />
        </GlobalTooltip>
        <GlobalTooltip text="Simpan">
            <BookMarked className="w-8 h-8 border p-2 rounded-lg hover:bg-muted duration-200 ease-in-out" />
        </GlobalTooltip>
        <GlobalTooltip text="Bagikan">
            <ShareBookDialog>
                <Share2 onClick={() => generateBookLink(id)} className="w-8 h-8 border p-2 rounded-lg hover:bg-muted duration-200 ease-in-out" />
            </ShareBookDialog>
        </GlobalTooltip>
    </div>
  )
}

export default ListLayoutButtons