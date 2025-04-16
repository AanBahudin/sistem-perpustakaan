const renderError = (error: unknown) => {
    const errorMsg = error instanceof Error ? error.message : 'Something is wrong'
    return errorMsg
}