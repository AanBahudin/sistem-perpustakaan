const formatPhoneNumber = (phoneNumber: string) => {
    const formatted =  ("+62" + phoneNumber.slice(1)).replace(/\s+/g, "")
    return formatted
}

export default formatPhoneNumber