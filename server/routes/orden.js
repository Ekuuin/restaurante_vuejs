const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/todas_las_ordenes/', async (req, res) => {
    try{
        const ord_mesa_id = req.query.mesa_id;
        const query = 'SELECT o.ord_id, o.ord_mesa_id, mr.mro_nombre, p.prod_nombre, d.dp_cantidadPedida, p.prod_precio '+
                        'FROM orden AS o '+
                        'INNER JOIN mesero AS mr ON o.ord_mro_nue = mr.mro_nue '+
                        'INNER JOIN detallepedido AS d ON o.ord_id = d.dp_ord_id '+
                        'INNER JOIN producto AS p ON d.dp_prod_id = p.prod_id '+
                        'INNER JOIN mesa AS m ON m.mesa_id = o.ord_mesa_id '+
                        'WHERE o.ord_mesa_id = ?';
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
        const query = 'SELECT mro_nombre FROM mesero';
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
        const query = 'DELETE FROM cliente WHERE ord_id = ?';
        const result = await connection.query(query, [ord_id]);

        res.json('OK');
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.post('/nueva_orden', async (req, res) => { //Función asíncrona
    try{
        const body = req.body;
        const query = 'INSERT INTO cliente (ord_mesa_id) VALUES (?)';
        const result = await connection.query(query, [body.ord_mesa_id]);

        res.json('OK');
    } catch(error){
        return res.json({
            error:error
        });
    }
});


module.exports = router;

