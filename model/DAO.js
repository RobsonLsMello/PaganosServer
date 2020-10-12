module.exports = class DAO
{
    constructor()
    {
        this.mysql = require('mysql');
        this.conn = this.mysql.createConnection({
            host     : process.env.MYSQL_HOST,
            user     : process.env.MYSQL_USER,
            password : process.env.MYSQL_PASSWORD,
            database : process.env.MYSQL_DATABASE
        });
        this.conn.connect();
    }
    
}
