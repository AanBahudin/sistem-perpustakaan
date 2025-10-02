export const errorMsgGenerator = (error: any) => {
    const errMsg = error.response.data.message || 'Gagal memperbaharui durasi, Coba lagi nanti'
    return errMsg
}