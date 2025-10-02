export declare const setRole: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "sheet/setRole">, setStatusAkun: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "sheet/setStatusAkun">, setVerifikasiEmail: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "sheet/setVerifikasiEmail">, setVerifikasiProdi: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "sheet/setVerifikasiProdi">, resetFilter: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"sheet/resetFilter">;
declare const _default: import("redux").Reducer<{
    role: string;
    statusAkun: string;
    verifikasiProdi: string;
    verifikasiEmail: string;
}>;
export default _default;
