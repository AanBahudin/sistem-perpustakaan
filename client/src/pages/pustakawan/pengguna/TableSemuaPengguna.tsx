import {
  Table,  
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const TableSemuaPengguna = ({dataPengguna} : {dataPengguna: any}) => {

    return (
        <section className="w-full mt-6 overflow-hidden rounded-lg border bg-accent/30">
            <Table>
                <TableHeader>
                    <TableRow className="border-muted">
                    <TableHead className="w-[250px]">Nama Pengguna</TableHead>
                    <TableHead className="w-[150px] text-center">NIM/NIDN</TableHead>
                    <TableHead className="w-[150px] text-center">Email</TableHead>
                    <TableHead className="w-[150px] text-center">Status Akun</TableHead>
                    <TableHead className="text-center">Verifikasi</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>

            <main className="w-full">
                <Table className="w-full">
                    <TableBody>
                    {dataPengguna.map((item: any, index: number) => {
                        return (
                            <TableRow key={index} className="group border-muted">
                            <TableCell className="group-hover:underline w-[500px] text-muted-foreground flex items-center gap-x-5">
                                <div className="w-6 h-6 rounded-full bg-accent/80"></div>
                                {item.nama}
                            </TableCell>
                            <TableCell className="text-center w-[150px]">test</TableCell>
                            <TableCell className="text-center w-[150px]">test</TableCell>
                            <TableCell className="text-center w-[150px] ">test</TableCell>
                            <TableCell className="text-center flex justify-center">test</TableCell>
                            </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>
            </main>
        </section>
    )
}

export default TableSemuaPengguna