type PeminjamanDataType = {
    label: string,
    value: string | number
}

const PeminjamanDanProfilData = ({label, value} : PeminjamanDataType) => {
  return (
     <section className="w-full flex items-center justify-between">
        <p className="text-muted-foreground text-[12px] capitalize">{label}</p>
        <p className="text-muted-foreground text-[12px]">{value}</p>
    </section>
  )
}

export default PeminjamanDanProfilData