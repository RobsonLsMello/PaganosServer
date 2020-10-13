module.exports = class DAO
{
    constructor()
    {
        this.mysql = require('mysql');
        this.conn = this.mysql.createConnection({
            host     : 'mysql669.umbler.com',
            user     : 'teledevs',
            password : 'tabela12',
            database : 'db_paga_nos',
            port : '41890',
        });
        console.log(this.conn);
        this.conn.connect();
    }
    
}
