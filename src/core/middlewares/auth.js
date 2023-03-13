module.exports = (req, res, next) => {

    if (req.session.passport && req.session.passport.user) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' })

};
