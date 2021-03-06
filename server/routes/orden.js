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

router.get('/mesa_ocupada', async (req,res) => {
    try{
        const mesa_id = req.query.mesa_id;
        const query = 'SELECT count(*) AS asientos FROM mesa AS m INNER JOIN cliente AS c ON m.mesa_id = c.cli_mesa_id WHERE m.mesa_id = ?';
        const ocupado = await connection.query(query,[mesa_id]);
        res.json(ocupado);
    }   catch(error){
            return res.json({
                error:error
            });
    }

})

router.get('/todos_los_pedidos/', async (req, res) => {
    try{
        const ord_id = req.query.ord_id;
        const query = 'SELECT r.cat_nombre, p.dp_cantidadPedida, p.dp_prod_id, l.prod_nombre, l.prod_precio, SUM(l.prod_precio*p.dp_cantidadPedida) AS subtotal FROM detallepedido AS p '+
                        'INNER JOIN producto AS l ON p.dp_prod_id = l.prod_id '+
                        'INNER JOIN categoria AS r ON l.prod_cat_id = r.cat_id '+
                        'WHERE p.dp_ord_id = ? '+
                        'GROUP BY p.dp_prod_id';
        const pedidos = await connection.query(query, [ord_id]);

        res.json(pedidos);
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.get('/total', async (req, res) => {
    try{
        const ord_id = req.query.ord_id;
        const query = 'SELECT SUM(l.prod_precio*p.dp_cantidadPedida) AS total FROM detallepedido AS p '+
        'INNER JOIN producto AS l ON p.dp_prod_id = l.prod_id '+
        'INNER JOIN categoria AS r ON l.prod_cat_id = r.cat_id '+
        'WHERE p.dp_ord_id = ?';
        const total = await connection.query(query, [ord_id]);

        res.json(total);
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

router.post('/pagar_orden', async (req, res) => {
    try{
        const ord_id = req.body.dp_ord_id;
        const query = 'UPDATE orden SET ord_estado = "PAGADA" WHERE ord_id = ?';
        const result = await connection.query(query, [ord_id]);

        res.json(result);
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.post('/eliminar_prod', async (req, res) => {
    try{
        const ord_id = req.body.dp_ord_id;
        const prod_id = req.body.dp_prod_id
        const query = 'DELETE FROM detallepedido WHERE dp_ord_id = ? AND dp_prod_id = ?';
        const result = await connection.query(query, [ord_id, prod_id]);

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
        const query = 'INSERT INTO orden (ord_mesa_id, ord_fecha, ord_mro_nue, ord_estado) VALUES (?, NOW(), ?, ?)';
        const result = await connection.query(query, [body.ord_mesa_id, body.ord_mro_nue, body.ord_estado]);

        res.json('OK');
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.post('/desocupar_mesa', async (req, res) => {
    try{
        const body = req.body;
        const query = 'DELETE FROM cliente WHERE cli_mesa_id = ?';
        const result = await connection.query(query, [body.mesa_id]);
        res.json('OK');
        } catch(error){
        res.json({error:error});
    }
});

router.post('/editar_prod', async (req, res) => {
    try{
        const ord_id = req.body.dp_ord_id;
        const prod_id = req.body.dp_prod_id;
        const cantidad = req.body.dp_cantidadPedida;
        const query = 'UPDATE detallepedido SET dp_cantidadPedida = ? WHERE dp_ord_id = ? AND dp_prod_id = ?';
        const result = await connection.query(query, [cantidad, ord_id, prod_id]);
        
        res.json(result);
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
        res.json({error:error});
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