const getConnection = require('../connection');
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
function getAllGuest(callback){
    let sql_stmt = "select customer_name,customer_address,customer_city,customer_state,checkIn_date,checout_date,id_proof_type,id_proof_number from booking order by checout_date;";
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
function checkOutGuest(ids,callback){
    console.log(ids);
    let d =  new Date();
    let ds = d.getDate()+'/'+(d.getMonth()+1)+'/' + d.getFullYear();
    console.log(ds);
    let sql_stmt = "update booking set checout_date = @checkOutDate where id = @id";
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
            connection.close();
            callback({status:true, msg: 'Successfull' ,data: rowarray});
        });
        request.addParameter('checkOutDate', TYPES.NVarChar, ds);
        request.addParameter('id', TYPES.NVarChar, ids);
        connection.execSql(request);
    });
}
exports.getAllGuest = getAllGuest;
exports.checkOutGuest = checkOutGuest;