const dotenv=require('dotenv');
const mongoose=require('mongoose');
require('dotenv').config()
async function connect(){
    try{
        //
        // useNewurlParser, userUnifiedTop
        await mongoose.connect(process.env.MONGO_URL,
        {

            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(()=>{
            console.log('mongodb connected');
        })
            
  
    }
    catch(err)
    {
        console.log(err);
    }
}
module.exports={connect}