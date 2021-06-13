const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/mesas_disponibles', async (req, res) => {
    try{
        const query = 'SELECT c.cli_id '+ 
                        'FROM mesa LEFT JOIN cliente AS c '+ 
                        'ON mesa_id = cli_mesa_id '+
                        'GROUP BY mesa_id';
        const mesas = await connection.query(query);

        res.json(mesas);
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.get('/llenar_mesa', async (req, res) => {
    try{
        const query = 'SELECT mesa_id FROM mesa';
        const mesas = await connection.query(query);

        res.json(mesas);
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.get('/llenar_capacidad', async (req, res) => {
    try{
        const query = 'SELECT mesa_capacidad FROM mesa';
        const mesas = await connection.query(query);

        res.json(mesas);
    } catch(error){
        return res.json({
            error:error
        });
    }
});

module.exports = router;