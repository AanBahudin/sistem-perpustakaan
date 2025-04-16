import { authBaseUrl } from "./constants"

type GenerateVerficationLinkParamsType = {
    url: string,
    credentials: string,
    credentialName: string
}

const generateVerificationLink = ({url, credentials, credentialName} : GenerateVerficationLinkParamsType) => {
    const normalizedUrl = url.startsWith('/') ? url : `/${url}`

    const link = `${authBaseUrl}${normalizedUrl}?${credentialName}=${credentials}`

    return link
}

export default generateVerificationLink