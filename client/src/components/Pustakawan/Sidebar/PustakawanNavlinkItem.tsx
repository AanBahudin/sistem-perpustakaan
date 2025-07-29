import NavlinkItemPustakawan from './NavlinkItemPustakawan'

type PustakawanNavlinkItemType = {
    data: any,
}

const PustakawanNavlinkItem = ({data} : PustakawanNavlinkItemType) => {
    return (
        <NavlinkItemPustakawan data={data} />
    )
}

export default PustakawanNavlinkItem