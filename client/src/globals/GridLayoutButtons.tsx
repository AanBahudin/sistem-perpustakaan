import GlobalTooltip from './GlobalTooltip'
import { BookMarked, Share2 } from 'lucide-react'
import ShareBookDialog from './ShareBookDialog'
import { generateBookLink } from '@/utils/generateBookLink'
import AddLikedButton from './AddLikedButton'
import FormContainer from '@/components/form/FormContainer'
import { addOrRemoveSuka } from '@/actions/sukaActions'

const GridLayoutButtons = ({id, data} : {id: string, data: any}) => {
    return (
        <div className="flex justify-center items-center gap-x-2">
            <FormContainer className='w-fit' action={addOrRemoveSuka}>
                <AddLikedButton id={id} likedData={data} />
            </FormContainer>

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

export default GridLayoutButtons