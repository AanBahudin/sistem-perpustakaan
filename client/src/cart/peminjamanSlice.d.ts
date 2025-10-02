export type DefaultStateType = {
    layout: string;
    activeTab: 1;
    detailPeminjamanTab: 'peminjaman' | 'perpanjangan' | 'pengembalian' | '';
    peminjamanFilter: string;
    alasan: string;
    durasi: '' | number;
    pustakawanDetailPeminjamanActiveTabs: string;
};
export declare const setLayout: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "peminjaman/setLayout">, setTab: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "peminjaman/setTab">, setFilter: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "peminjaman/setFilter">, setDetailPeminjamanTab: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "peminjaman/setDetailPeminjamanTab">, setAlasan: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "peminjaman/setAlasan">, setDurasi: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "peminjaman/setDurasi">, setDetailPeminjamanActiveTabs: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "peminjaman/setDetailPeminjamanActiveTabs">;
declare const _default: import("redux").Reducer<DefaultStateType>;
export default _default;
