const ERROR_CODE = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
}

const handleErrorResponse = (code, res, errorMessage) => {
    res.status(code).json({ message: errorMessage })
}

module.exports = {
    ERROR_CODE,
    handleErrorResponse,
}
