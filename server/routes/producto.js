const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/todos_los_productos', async (req, res) => {
    try{
        const query = 'SELECT p.*, c.cat_nombre FROM producto AS p INNER JOIN categoria AS c ON p.prod_cat_id = c.cat_id';
        const productos = await connection.query(query);

        res.json(productos);
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.get('/obtener_categorias', async (req, res) => {
    try{
        const query = 'SELECT cat_id, cat_nombre FROM categoria';
        const categorias = await connection.query(query);

        res.json(categorias);
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.post('/eliminar_producto', async (req, res) => {
    try{
        const prod_id = req.body.prod_id;
        const query = 'DELETE FROM producto WHERE prod_id = ?';
        const result = await connection.query(query, [prod_id]);

        res.json('OK');
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.post('/nuevo_producto', async (req, res) => { 
    try{
        const body = req.body;
        const query = 'INSERT INTO producto (prod_nombre, prod_cat_id, prod_precio, prod_existencia) VALUES (?, ?, ?, ?)';
        const result = await connection.query(query, [body.prod_nombre, body.prod_cat_id, body.prod_precio, body.prod_existencia]);
        res.json('OK');
    } catch(error){
        return res.json({
            error:error
        });
    }
});

module.exports = router;