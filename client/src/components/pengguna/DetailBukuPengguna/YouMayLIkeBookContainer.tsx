import SuggestedBook from "./SuggestedBook"

type YouMayLIkeBookContainerType = {
    dataBuku : any
}

const YouMayLIkeBookContainer = ({dataBuku} : YouMayLIkeBookContainerType) => {
    return (
        <section className="w-full my-30">
            <SuggestedBook dataBuku={dataBuku} />
        </section>
    )
}

export default YouMayLIkeBookContainer