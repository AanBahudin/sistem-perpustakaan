type StatusPeminjamanType = {
    status: 'Dipinjam' | 'Dikembalikan' | 'Terlambat' | 'Diajukan' | 'Ditolak';
};
declare const StatusPeminjaman: ({ status }: StatusPeminjamanType) => import("react/jsx-runtime").JSX.Element;
export default StatusPeminjaman;
