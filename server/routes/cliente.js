const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/todos_los_clientes', async (req, res) => {
    try{
        const query = 'SELECT * FROM cliente';
        const clientes = await connection.query(query);

        res.json(clientes);
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.post('/eliminar_cliente', async (req, res) => {
    try{
        const cli_id = req.body.cli_id;
        const query = 'DELETE FROM cliente WHERE cli_id = ?';
        const result = await connection.query(query, [cli_id]);

        res.json('OK');
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.post('/nuevo_cliente', async (req, res) => {
    try{
        const body = req.body;
        const query2 = 'SELECT count(*) AS asientos_ocupados, mesa_capacidad FROM mesa INNER JOIN cliente ON mesa_id = cli_mesa_id WHERE mesa_id = ?';
        const capacidad = await connection.query(query2, [body.cli_mesa_id]);
        if (capacidad[0].asientos_ocupados == capacidad[0].mesa_capacidad){
            return res.json('Asientos no disponibles');
        }
        const query = 'INSERT INTO cliente (cli_nombre, cli_mesa_id, cli_direccion, cli_telefono) VALUES (?, ?, ?, ?)';
        const result = await connection.query(query, [body.cli_nombre, body.cli_mesa_id, body.cli_direccion, body.cli_telefono]);
        res.json('OK');
    } catch(error){
        return res.json({
            error:error
        });
    }
});


module.exports = router;
