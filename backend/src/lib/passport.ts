import config from "@/config";
import { User } from "@/models/user";
import passport from "passport";
import passportJwt, { ExtractJwt } from 'passport-jwt';
import passportLocal from 'passport-local';


const JWTStrategy = passportJwt.Strategy;

const jwtStrategy = new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt_secret,
},
    async (token: any, done: any) => {
        try {
            const user = await User.findOne({ email: token.email }).exec();
            if (!user) {
                return done(null, false);
            }
            done(null, user);
        } catch (error) {
            return done(error, false)
        }

    });

passport.use(jwtStrategy);

const LocalStrategy = passportLocal.Strategy;

const localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    (email, password, done) => {
        
        User.findOne({ email }).exec()
            .then(user => {
                if (!user) {
                    return done(null, false, { message: `Email "${email}" not found!` });
                }
                user.comparePassword(password, (err: Error, isMatch: boolean) => {
                    if (err) {
                        return done(err, false)
                    }
                    if (isMatch) {
                        return done(null, user)
                    }
                    return done(null, false, { message: 'Invalid email or password.' })
                })
            })
            .catch(err => {
                return done(err, false)
            })

    }
);

passport.use(localStrategy);



