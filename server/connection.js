const mysql = require('mysql2');
const { promisify } = require('util');

// Configurar la conexión a la base de datos
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '3795640801',
    database: 'restaurante_db'
});

// Más directo. Crea una función anónima
// Función que solo se usa localmente (en este punto)
// Arrow function
connection.getConnection(
    (err, conn) => {
        if(err){
            console.log('Problemas de conexión a la DB');
        }
        if(conn){
            console.log('Conexión exitosa');
        }
        return
    }
);

connection.query = promisify(connection.query);

module.exports = connection;