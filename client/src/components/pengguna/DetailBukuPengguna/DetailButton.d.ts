type DetailButtonType = {
    stok: number;
    status: 'Dipinjam' | 'Diajukan' | 'Terlambat' | undefined;
    idPeminjaman?: string;
    idBuku: string;
};
declare const DetailButton: ({ stok, status, idPeminjaman, idBuku }: DetailButtonType) => import("react/jsx-runtime").JSX.Element;
export default DetailButton;
