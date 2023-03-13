const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { usuarioModel } = require('../../api/models');

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser(async (user, done) => {
    console.log('deserializeUser');
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
        return done("El usuario no existe",false )
    }
    if(!user.comparePassword(password)){
        return done("Error en el password",false);
    }
    user.password = ':)'
    done(null,user);
}));
