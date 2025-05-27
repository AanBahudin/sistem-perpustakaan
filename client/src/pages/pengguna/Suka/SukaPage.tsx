import { getAllSimpanan } from "@/actions/simpanActions"
import { getAllSuka } from "@/actions/sukaActions"
import SukaLoading from "@/components/Loading/SukaLoading"
import Books from "@/components/pengguna/Suka/Books"
import Container from "@/globals/Container"
import AwaitHooks from "@/hooks/AwaitHooks"
import { defer, useLoaderData } from "react-router-dom"

export const sukaLoader = async() => {

    return defer({
        disukai: getAllSuka(),
        tersimpan: getAllSimpanan()
    })
}

const SukaPage = () => {

    const {disukai, tersimpan} = useLoaderData() as { disukai: Promise<any>, tersimpan: Promise<any>}    
    const semuaData = Promise.all([disukai, tersimpan])

    return (
        <Container className="my-20">
            {/* <SukaSearch /> */}
            <h1 className="text-2xl font-semibold">Buku yang anda sukai</h1>

            <AwaitHooks data={semuaData} loadingComponent={<SukaLoading />}>
                {(data) => <Books books={data[0].bukuDisukai} savedData={data[1].bukuDisimpan} />}
            </AwaitHooks>
        </Container>
    )
}

export default SukaPage