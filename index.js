const express=require('express')
const app = express()
const dotenv=require('dotenv')
const corsOption=require('./cors/corsOption')
const cors=require('cors');
// khong can cors
app.use(cors(corsOption));
const port=process.env.PORT||3500
const db=require('./config/connectDB');
const router=require('./router/index');
db.connect()

// serve static file 

//routes
app.use('/register',require('./router/auth'));


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});
app.listen(port,()=>{
    console.log(`Listening port ${port}`);
})