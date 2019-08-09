const getConnection = require('../connection');
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
function authUser(user, password, callback){
    console.log(user,password);
    let sql_stmt = 'select position from employee where email = @User and password = @Password;';
    getConnection().then(function(connection) {
        request = new Request(
            sql_stmt,
            function(err, rows) {
            if (err) {
                callback({status:false, msg: 'Unable to process the reuest at the moment. Please try again later.' ,data: err});
            }
            if(rows === 0){
                callback({status:false, msg: 'Invalid username or password.' ,data: []});
            }
        });
        request.on('row', function(columns) {
            callback({status:false, msg: 'Login Successfull' ,data: columns});
        });
        request.addParameter('User', TYPES.NVarChar, user);
        request.addParameter('Password', TYPES.NVarChar, password);
        connection.execSql(request);
    });
}
module.exports = authUser;