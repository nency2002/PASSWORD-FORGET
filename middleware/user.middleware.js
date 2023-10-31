
// jo login hoy to data batavva mate
const isAuth = (req,res,next)=>{
    if(req.user){
        next()
    }
    else{
        res.redirect("login")
    }
}

module.exports ={isAuth }