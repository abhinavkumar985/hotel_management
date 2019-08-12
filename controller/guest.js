const getConnection = require('../connection');
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
function getAllGuest(callback){
    let sql_stmt = "select customer_name,customer_address,customer_city,customer_state,checkIn_date,checout_date,id_proof_type,id_proof_number from booking;";
    getConnection().then(function(connection) {
        request = new Request(
            sql_stmt,
            function(err, Nrow, rows) {
            if (err) {
                connection.close();
                callback({status:false, msg: 'Unable to process the reuest at the moment. Please try again later.' ,data: err});
            }
            if(Nrow === 0){
                connection.close();
                callback({status:false, msg: 'No data available.' ,data: []});
            }
            var rowarray = [];
            rows.forEach(function(columns){
                var rowdata = new Object();
                columns.forEach(function(column) {
                    rowdata[column.metadata.colName] = column.value;
                });
                rowarray.push(rowdata);
            });
            connection.close();
            callback({status:true, msg: 'Successfull' ,data: rowarray});
        });
        connection.execSql(request);
    });
}
module.exports = getAllGuest;