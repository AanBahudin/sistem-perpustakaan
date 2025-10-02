type StatusPeminjamanType = {
    status: 'Dipinjam' | 'Dikembalikan' | 'Terlambat' | 'Diajukan' | 'Ditolak';
};
declare const StatusPeminjamanList: ({ status }: StatusPeminjamanType) => import("react/jsx-runtime").JSX.Element;
export default StatusPeminjamanList;
