const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log('sasa');

    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.ENVIRONMENT === 'PRODUCTION' ? null : err.stack
    });
    next(err)
};


module.exports = { errorHandler }