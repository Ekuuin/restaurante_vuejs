const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/todos_los_meseros', async (req, res) => {
    try{
        const query = 'SELECT * FROM mesero';
        const meseros = await connection.query(query);

        res.json(meseros);
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.post('/eliminar_mesero', async (req, res) => {
    try{
        const mro_nue = req.body.mro_nue;
        const query = 'DELETE FROM mesero WHERE mro_nue = ?';
        const result = await connection.query(query, [mro_nue]);

        res.json('OK');
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.post('/editar_mesero', async (req, res) => {
    try {
        const body = req.body;
        const query = 'UPDATE mesero SET mro_nombre = ?, mro_honorarios = ?, mro_direccion = ?, mro_telefono = ?' +
                        ', mro_email = ? WHERE mro_nue = ?';
        const result = await connection.query(query, [body.mro_nombre, body.mro_honorarios, body.mro_direccion,
                        body.mro_telefono, body.mro_email, body.mro_nue]);
        res.json('OK');
    } catch (error) {
        return res.json({
            error:error.code
        })
    }
})

router.post('/nuevo_mesero', async (req, res) => { 
    try{
        const body = req.body;
        const query = 'INSERT INTO mesero (mro_nombre, mro_honorarios, mro_direccion, mro_telefono, mro_email) VALUES (?, ?, ?, ?, ?)';
        const result = await connection.query(query, [body.mro_nombre, body.mro_honorarios, body.mro_direccion, body.mro_telefono, body.mro_email]);
        res.json('OK');
    } catch(error){
        return res.json({
            error:error
        });
    }
});

module.exports = router;