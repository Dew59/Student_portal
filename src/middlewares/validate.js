const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            status: "fail",
            message: "Validation failed",
            errors: result.error.errors
        });
    }

    req.validatedData = result.data;

    next();
};

module.exports = validate;