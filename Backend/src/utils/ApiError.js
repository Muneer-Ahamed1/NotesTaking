class ApiError extends Error {
    
    constructor(message, statusCode) {
        console.log(message)
        console.log(statusCode);
        super(message);
        this.name = 'ApiError';

        this.statusCode = statusCode;
    }
}

module.exports=ApiError;