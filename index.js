const { create } = require('domain')
const express=require('express')
const urlrouter=require('./routes/url');
const { connectMongoDb } = require('./connection');
const URL=require('./models/url');
const { handleCreateShortId } = require('./controller/url');
const path=require('path')
const staticRoutes=require('./routes/staticRouter')
const userRoutes=require('./routes/user')
const CookieParse=require('cookie-parser')
const {restrictToLoggedinUserOnly,checkAuth}=require('./middlewares/auth')



const app=express()

const PORT=8001;
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(CookieParse())

connectMongoDb('mongodb://127.0.0.1:27017/URL')
.then(()=>console.log('Mongodb connected'))

app.set("view engine",'ejs')
app.set('views',path.resolve("./views"))


app.use('/url',restrictToLoggedinUserOnly,urlrouter)
app.use('/',checkAuth,staticRoutes)
app.use('/user',userRoutes)


app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timeStamp: Date.now()
                }
            }
        }
    );

    if (!entry) {
        return res.status(404).send('Short URL not found');
    }

    
    return res.redirect(entry.redirectUrl);
});






app.listen(PORT,()=>console.log(`New server created at PORT:${PORT}`))