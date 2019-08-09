/* controllers impor*/
const authUser =  require('./controller/auth');
const cors = require('cors')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var session = require('express-session')
const port = 3000;


app.use(cors());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}))
app.use(bodyParser.json());
app.post('/login', (req, res) => {
    authUser(req.body.username, req.body.password,(result)=>{
        let user;
        if(result.data.length > 0 && result.status){
            user  = result.data;
            result.data =user;
            req.session[req.sessionID] = user[0];
            res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
            res.cookie('sessionID',req.sessionID, { expires: new Date(Date.now() + 900000)}).send(result);
            return;
        }
        res.send(result);
    });
});
app.get('/hello',(req,res)=>{
    console.log("Cookies :  ", req.cookies);
    res.send({});
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));