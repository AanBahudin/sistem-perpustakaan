import { getAllSuka } from "@/actions/sukaActions"
import SukaLoading from "@/components/Loading/SukaLoading"
import Books from "@/components/pengguna/Suka/Books"
import SukaSearch from "@/components/pengguna/Suka/SukaSearch"
import Container from "@/globals/Container"
import AwaitHooks from "@/hooks/AwaitHooks"
import { defer, useLoaderData } from "react-router-dom"

export const sukaLoader = async({request} : {request: Request}) => {
    const url  = new URL(request.url)
    const searchParams = url.searchParams.toString()
    return defer({
        disukai: getAllSuka()
    })
}

const SukaPage = () => {

    const {disukai} = useLoaderData() as { disukai: Promise<any>}    

    return (
        <Container className="my-20">
            <SukaSearch />

            <AwaitHooks data={disukai} loadingComponent={<SukaLoading />}>
                {(data) => <Books books={data.bukuDisukai} />}
            </AwaitHooks>
        </Container>
    )
}

export default SukaPage