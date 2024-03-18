import { Strategy as LocalStragtegy} from 'passport-local'
import { User } from './db.js'


export const initializingPassport = (passport) => {
    passport.use(new LocalStragtegy( async (username, password, done) => {
        try {
            const user = await User.findOne({ username })
            if (!user) {
                return done(null, false)
            }
            console.log(user);

            if (user.password !== password) {
                return done(null, false)
            }

            return done(null, user)
        } catch (error) {
            done(error, false)
        }
    }))



passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (_id, done) => {
   try {
     const user = await User.findById({ _id })
     done(null, user)
   } catch (error) {
     done(error, false)
   }
})

}


