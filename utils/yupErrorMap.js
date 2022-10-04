const yupErrorMap = (err) => {
    let errorMap = {}
    for (let error of err.inner) {
        let message = error.message
        let path = error.path
        errorMap[path] = message
    }
    return errorMap
}
export default yupErrorMap
