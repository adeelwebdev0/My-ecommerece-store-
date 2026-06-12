export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            success: false,
            message: "Validation error",
            errors: result.error.flatten(),
        });
        return;
    }
    req.body = result.data;
    next();
};
