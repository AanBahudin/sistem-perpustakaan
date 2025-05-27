import { getAllSuka } from "@/actions/sukaActions"
import SukaLoading from "@/components/Loading/SukaLoading"
import Books from "@/components/pengguna/Suka/Books"
import Container from "@/globals/Container"
import AwaitHooks from "@/hooks/AwaitHooks"
import { defer, useLoaderData } from "react-router-dom"

export const sukaLoader = async() => {

    return defer({
        disukai: getAllSuka()
    })
}

const SukaPage = () => {

    const {disukai} = useLoaderData() as { disukai: Promise<any>}    

    return (
        <Container className="my-20">
            {/* <SukaSearch /> */}
            <h1 className="text-2xl font-semibold">Buku yang anda sukai</h1>

            <AwaitHooks data={disukai} loadingComponent={<SukaLoading />}>
                {(data) => <Books books={data.bukuDisukai} />}
            </AwaitHooks>
        </Container>
    )
}

export default SukaPage