const passports = require("../models/user.schema");

const localstrategy = require("passport-local").Strategy;


const loaclAuth = (passport)=>{

    passport.use(new localstrategy({usernameField : "email"},async(email, password,done)=>{

        try {
            let user = await passports.findOne({email});
            if(!user){
                return done(null,false)
            }
            if(user.password !== password){
                return done(null,false)
            }

            return done(null,user)
        } catch (error) {
            return done(error,false)
        }
    })
    );

    passport.serializeUser((user,done)=>{
        try {
            return done(null, user.id)
        } catch (error) {
            return done(error,false)
        }
    });
    passport.deserializeUser(async(id,done)=>{
        try {
            let User = await passports.findById(id);
            return done(null, User)
        } catch (error) {
            return done(error,false)
        }
    });
}


module.exports = {loaclAuth}