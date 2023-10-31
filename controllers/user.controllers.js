const passport = require("passport")
const passports = require("../models/user.schema")

const home =(req , res)=>{
    res.render("index")
}
const login =(req , res)=>{
    res.render("login")
    
}
const signup = (req , res)=>{
    res.render("signup")
}
const gallery = (req , res)=>{
    res.render("gallery")
}
const reset = (req , res)=>{
    res.render("reset")
}
// signuodatas
const signdata = async (req,res)=>{

    try {
        let data = await passports.findOne({email: req.body.email});

        if (data){
            return res.send("User alreasy exist")
        }
        else{
            let data = await passports.create(req.body);
            return res.send(data);
        }
    } catch (error) {
        return res.send(error.message)
    }
}
// logindatas
const logindata = async (req,res)=>{
    try {
        let data = await passports.findOne({email : req.body.email})
        if (!data){
            return res.send("user not exit")
        }
        if(data.password !== req.body.password){
            return res.send("Passowrd is incorrect")
        }

        return res.cookie("id", data.id).send("Logged In Successfully")
    } catch (error) {
        return res.send(error.message)
    }
}
// profile ma je login hoy te no data 
const profile = (req,res)=>{
    if (req.user){
        res.send(req.user)
    }
    else{
        res.redirect("login")
    }
}
// logout karva
const logout = (req,res)=>{
    req.logOut((err)=>{
        if(err){
            console.log(err)
        }
        res.redirect("login")
    })
}

// reset password datas code

const resetpass =async (req , res) =>{
    let {oldpassword , newpassword} = req.body;
    console.log(req.user);

    if(oldpassword == req.user.password){
        let data = await passports.findByIdAndUpdate(req.user.id ,{password : newpassword})
        res.send("sucess reset passwords");
        console.log(data);
        // res.render("login")
    }
    else{
        res.send("wrong password");
    }
}

module.exports = {home , login , signup , signdata , logindata ,profile ,logout , gallery,reset ,resetpass }