/* controllers impor*/
const authUser =  require('./controller/auth');
const getDashBoardData =  require('./controller/dashboard');
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
// Login Page Route
app.post('/login', (req, res) => {
    authUser(req.body.username, req.body.password,(result)=>{
        let user;
        if(result.data.length > 0 && result.status){
            user  = result.data;
            result.data =user;
            req.session[req.sessionID] = user[0];
            res.cookie('sessionID',req.sessionID, { expires: new Date(Date.now() + 900000)}).send(result);
            return;
        }
        res.send(result);
    });
});
app.get('/logout',(req,res)=>{
    let sessionID = res.cookie('sessionID');
    delete req.session[sessionID];
    res.send({status:true,msg:'Logout completed !'});
});
// Dashboard Page Route
app.get('/dashboard',(req,res)=>{
    getDashBoardData((result)=>{
        res.send(result);
    });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));