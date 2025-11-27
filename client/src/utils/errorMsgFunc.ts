type errMsgGeneratorType = {
    error: any,
    defaultMsg?: string
}

export const errorMsgGenerator = ({error, defaultMsg} : errMsgGeneratorType) => {
    const errMsg = error.response.data.message || defaultMsg
    return errMsg
}