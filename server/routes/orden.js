const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/todas_las_ordenes/', async (req, res) => {
    try{
        const ord_mesa_id = req.query.mesa_id;
        const query = 'SELECT m.mro_nombre, o.* FROM orden AS o '+
                        'INNER JOIN mesero AS m ON m.mro_nue = o.ord_mro_nue '+
                        'WHERE ord_mesa_id = ?';
        const ordenes = await connection.query(query, [ord_mesa_id]);

        res.json(ordenes);
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.get('/meseros', async (req, res) => {
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

router.post('/eliminar_orden', async (req, res) => {
    try{
        const ord_id = req.body.ord_id;
        const query = 'DELETE FROM orden WHERE ord_id = ?';
        const result = await connection.query(query, [ord_id]);

        res.json('OK');
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.post('/nueva_orden', async (req, res) => {
    try{
        const body = req.body;
        const query = 'INSERT INTO orden (ord_mesa_id, ord_fecha, ord_mro_nue, ord_pagada) VALUES (?, NOW(), ?, ?)';
        const result = await connection.query(query, [body.ord_mesa_id, body.ord_mro_nue, body.ord_pagada]);

        res.json('OK');
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.post('/detalles_pedido', async (req, res) => {
    try{
        const body = req.body;
        const query = 'INSERT INTO detallepedido ( dp_prod_id, dp_ord_id, dp_cantidadPedida, dp_especificaciones) VALUES (?, ?, ?, ?)';
        const result = await connection.query(query, [body.dp_prod_id, body.dp_ord_id, body.dp_cantidadPedida, body.dp_especificaciones]);

       res.json('OK');
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.get('/productos', async (req, res) => {
    try{
        const query = 'SELECT * FROM producto';
        const productos = await connection.query(query);

        res.json(productos);
    } catch(error){
        return res.json({
            error:error
        });
    }
});


module.exports = router;