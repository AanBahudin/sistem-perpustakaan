export declare const setStatusPeminjaman: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "peminjamanSheetFilter/setStatusPeminjaman">, setDurasiPeminjaman: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "peminjamanSheetFilter/setDurasiPeminjaman">, setKondisi: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "peminjamanSheetFilter/setKondisi">, setDisetujui: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "peminjamanSheetFilter/setDisetujui">, resetFilter: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"peminjamanSheetFilter/resetFilter">;
declare const _default: import("redux").Reducer<{
    statusPeminjaman: string;
    durasiPeminjaman: string;
    kondisi: string;
    disetujui: string;
}>;
export default _default;
