
const DetailPengajuanInformation = ({label, value} : {label: string, value: string}) => {
  return (
    <div className='w-full flex'>
        <p className='w-1/2'>{label}</p>
        <p>: {value}</p>
    </div>
  )
}

export default DetailPengajuanInformation