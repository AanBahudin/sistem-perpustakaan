import { JsonWebTokenError } from "jsonwebtoken";

const renderError = (error: unknown) => {
    let errorMsg = '';

    if (error instanceof Error) {
        errorMsg = error.message
    } else if (error instanceof JsonWebTokenError) {
        error = 'Terjadi kesalahan saat meng-verifikasi'
    } else {
        errorMsg = 'Terjadi kesalahan'
    }

    return errorMsg
}

export default renderError