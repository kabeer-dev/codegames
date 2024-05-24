exports.handleResponse = (res, data = null, status = 200, message = null) => {
    res.status(status).json({
        "success": true,
        "data": data,
        "message": message
    })
};

exports.handleError = (res, error = null, status = 500, validationErrors = null) => {

    finalValidationErrors = null;

    if (error?.errors) {
        finalValidationErrors = error.errors.map(error => {
            return {
                field: error.path,
                message: error.message
            }
        });
    }

    if (validationErrors) {
        finalValidationErrors = validationErrors.map(error => {
            return {
                field: error.path,
                message: error.msg
            }
        });
    }

    res.status(status).json({
        "success": false,
        "data": null,
        "message": error?.message || error || "Some error occurred on server",
        "validationErrors": finalValidationErrors
    })
};