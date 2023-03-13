const passport = require('passport');

module.exports = {
    async postLogin(req, res,next) {
        passport.authenticate('local-signin', { session: false }, (err, user, info) => {
            if (err) {
              return res.status(500).json({ error: err });
            }
            if (!user) {
              return res.status(401).json({ error: info.message });
            }
            req.login(user, { session: true }, (err) => {
              if (err) {
                return res.status(500).json({ error: err });
              }
    
              return res.json({ user: user });
            });
          })(req, res, next);
    },
    async getLogout(req, res) {
        await req.session.destroy();
        return res.status(200).json({
            estado: true,
            data: {}
        });
    },
}