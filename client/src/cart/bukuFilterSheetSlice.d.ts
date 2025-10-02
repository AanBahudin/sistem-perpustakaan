export declare const setPenulis: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "bukuSheetFilter/setPenulis">, setPenerbit: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "bukuSheetFilter/setPenerbit">, setTahunTerbit: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "bukuSheetFilter/setTahunTerbit">, setStatus: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "bukuSheetFilter/setStatus">, setKategori: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "bukuSheetFilter/setKategori">, resetFilterBuku: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"bukuSheetFilter/resetFilterBuku">;
declare const _default: import("redux").Reducer<{
    penulis: string;
    penerbit: string;
    tahunTerbit: string;
    status: string;
    kategori: string;
}>;
export default _default;
