class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something Went wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode,
            this.message = message,
            this.data = null,
            this.org;
        errors = errors,
            this.success = false
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }


}


export default ApiError
