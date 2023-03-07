const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { usuarioModel } = require('../../api/models');

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser(async (user, done) => {
    const userb = await usuarioModel.findById(user.id);
    done(null, userb);
})

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await usuarioModel.findOne({
        email: email,
    });

    if (!user) {
        return done(null, false, req.flash('signinMessage', 'El usuario no existe'))
    }
    if(!user.comparePassword(password)){
        return done(null,false,req.flash('signinMessage', 'Error en el password'));
    }

    done(null,user);
}));
