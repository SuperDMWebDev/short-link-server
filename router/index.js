const authRouter= require('./auth')

function route(app){
    app.use('/',()=> {
       
        return authRouter
    })

}
module.exports=route;