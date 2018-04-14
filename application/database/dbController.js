var mysql = require('mysql');

var PROPERTY = require('./config');

var ERROR_CODES = require('../properties');


var localdb_pool = mysql.createPool({
    connectionLimit: PROPERTY.config.localDB.LIMIT,
    host: PROPERTY.config.localDB.HOST,
    user: PROPERTY.config.localDB.USER,
    password: PROPERTY.config.localDB.PASSWORD,
    database: PROPERTY.config.localDB.DATABASE
});





var dataFromLocalDB = function(query, error, success) {

    localdb_pool.getConnection(function(err, connection) {
        if (err) {
            console.log(' Error getting mysql_pool connection: ' + err);
            throw err;
        }
        connection.query(query, function(dbError, rows) {
            connection.release();
            if (dbError) {
                console.log("error in query");
                return error({
                    error_code: ERROR_CODES.DB_ERROR
                });
            } else {

            }
            return success(rows);
        });
    });

}



module.exports.dataFromLocalDB = dataFromLocalDB;



