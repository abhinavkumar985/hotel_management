/* controllers impor*/
const authUser =  require('./controller/auth');
const cors = require('cors')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;


app.use(cors());
app.use(bodyParser.json());
app.post('/login', (req, res) => {
    authUser(req.body.username, req.body.password,(result)=>{
        res.send(result);
    });
    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));