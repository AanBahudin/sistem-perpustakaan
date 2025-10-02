type StatusPerpanjanganType = {
    status: 'Diterima' | 'Pending' | 'Ditolak';
};
declare const StatusPerpanjanganList: ({ status }: StatusPerpanjanganType) => import("react/jsx-runtime").JSX.Element;
export default StatusPerpanjanganList;
