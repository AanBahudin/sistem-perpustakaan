type TableContainerType = {
    peminjaman: any;
    perpanjangan: any;
    pengembalian: any;
    peminjamanAktif: any;
    bukuHilang: any;
};
declare const TableContainer: ({ peminjaman, perpanjangan, pengembalian, peminjamanAktif, bukuHilang }: TableContainerType) => import("react/jsx-runtime").JSX.Element;
export default TableContainer;
