const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === "development") {
        return res.status(statusCode).json({
            status: err.status || "error",
            message: err.message || "Internal server error",
            stack: err.stack,
        });
    }

    
    if (err.isOperational) {
        return res.status(statusCode).json({
            status: err.status || "error",
            message: err.message,
        });
    }

    console.error(err);

    return res.status(500).json({
        status: "error",
        message: "Something went wrong",
    });
};

module.exports = globalErrorHandler;