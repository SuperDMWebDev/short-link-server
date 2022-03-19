const acceptList=["http://localhost:3500"];
const corsOption={
    origin:(origin,callback)=>{
        if(acceptList.indexOf(origin)!==-1||!origin){
                callback(null,true);
        }
        else{
            callback(new Error("Not allowed by cors"));
        }
        

    },
    optionsSuccessStatus:200
}
module.exports=corsOption;