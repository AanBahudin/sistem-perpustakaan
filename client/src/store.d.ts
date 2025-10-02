export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    globalState: {
        shareBookLink: string;
        isCopied: boolean;
    };
    dashboardState: {
        activeTab: string;
    };
    profileState: {
        tipe: string;
        selectedImg: string;
    };
    peminjamanState: import("@/cart/peminjamanSlice").DefaultStateType;
    pengembalianState: {
        activeTab: string;
        pustakawanPengembalianTab: string;
        isMissingSwitch: boolean;
    };
    detailBukuState: {
        durasiPeminjaman: string;
        pustakawanDetailBukuTabs: string;
    };
    perpanjanganState: {
        alasan: string;
        durasi: string;
        perpanjanganDetailTabsPustakawan: string;
    };
    pustakawanSidebarState: {
        showSidebar: string | boolean;
        userListTabs: string;
    };
    sheetState: {
        role: string;
        statusAkun: string;
        verifikasiProdi: string;
        verifikasiEmail: string;
    };
    peminjamanFilterSheetState: {
        statusPeminjaman: string;
        durasiPeminjaman: string;
        kondisi: string;
        disetujui: string;
    };
    perpanjanganFilterSheetState: {
        durasi: string;
        disetujui: string;
    };
    pengembalianFilterSheetState: {
        statusPengembalian: string;
        keadaanBuku: string;
        statusPembayaran: string;
        isMissing: string;
    };
    bukuFilterSheetState: {
        penulis: string;
        penerbit: string;
        tahunTerbit: string;
        status: string;
        kategori: string;
    };
    pustakawanTambahBukuState: {
        judulBuku: string;
        taglineBuku: string;
        deskripsiBuku: string;
    };
    pustakawanProfilePageSlice: {
        isEmailDialogOpen: boolean;
        isPasswordDialogOpen: boolean;
        showOldPassword: boolean;
        showNewPassword: boolean;
    };
    pustakawanPengaturanPageSlice: {
        isEditDialogOpen: boolean;
        isDeleteAlertOpen: boolean;
    };
    prodiPenggunaSlice: {
        blokirPenggunaAlert: boolean;
        verifikasiPenggunaAlert: boolean;
        bukaBlokirPenggunaAlert: boolean;
        activeUserId: string;
    };
    prodiPustakawanSlice: {
        nonaktifAlert: boolean;
        aktifkanAlert: boolean;
        activePustakawanId: string;
    };
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        globalState: {
            shareBookLink: string;
            isCopied: boolean;
        };
        dashboardState: {
            activeTab: string;
        };
        profileState: {
            tipe: string;
            selectedImg: string;
        };
        peminjamanState: import("@/cart/peminjamanSlice").DefaultStateType;
        pengembalianState: {
            activeTab: string;
            pustakawanPengembalianTab: string;
            isMissingSwitch: boolean;
        };
        detailBukuState: {
            durasiPeminjaman: string;
            pustakawanDetailBukuTabs: string;
        };
        perpanjanganState: {
            alasan: string;
            durasi: string;
            perpanjanganDetailTabsPustakawan: string;
        };
        pustakawanSidebarState: {
            showSidebar: string | boolean;
            userListTabs: string;
        };
        sheetState: {
            role: string;
            statusAkun: string;
            verifikasiProdi: string;
            verifikasiEmail: string;
        };
        peminjamanFilterSheetState: {
            statusPeminjaman: string;
            durasiPeminjaman: string;
            kondisi: string;
            disetujui: string;
        };
        perpanjanganFilterSheetState: {
            durasi: string;
            disetujui: string;
        };
        pengembalianFilterSheetState: {
            statusPengembalian: string;
            keadaanBuku: string;
            statusPembayaran: string;
            isMissing: string;
        };
        bukuFilterSheetState: {
            penulis: string;
            penerbit: string;
            tahunTerbit: string;
            status: string;
            kategori: string;
        };
        pustakawanTambahBukuState: {
            judulBuku: string;
            taglineBuku: string;
            deskripsiBuku: string;
        };
        pustakawanProfilePageSlice: {
            isEmailDialogOpen: boolean;
            isPasswordDialogOpen: boolean;
            showOldPassword: boolean;
            showNewPassword: boolean;
        };
        pustakawanPengaturanPageSlice: {
            isEditDialogOpen: boolean;
            isDeleteAlertOpen: boolean;
        };
        prodiPenggunaSlice: {
            blokirPenggunaAlert: boolean;
            verifikasiPenggunaAlert: boolean;
            bukaBlokirPenggunaAlert: boolean;
            activeUserId: string;
        };
        prodiPustakawanSlice: {
            nonaktifAlert: boolean;
            aktifkanAlert: boolean;
            activePustakawanId: string;
        };
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
