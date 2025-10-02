export declare const setStatusPembayaran: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "pengembalian/setStatusPembayaran">, setKeadaanBuku: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "pengembalian/setKeadaanBuku">, setStatusPengembalian: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "pengembalian/setStatusPengembalian">, setIsMissing: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "pengembalian/setIsMissing">, resetPengembalianFilter: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"pengembalian/resetPengembalianFilter">;
declare const _default: import("redux").Reducer<{
    statusPengembalian: string;
    keadaanBuku: string;
    statusPembayaran: string;
    isMissing: string;
}>;
export default _default;
