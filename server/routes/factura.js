const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/crear_factura', async (req, res) => {
    try{
        const body = req.body;
        const query = 'INSERT INTO factura (fac_fecha, fac_ord_id, fac_total) '+
                        'VALUES (CURDATE(), ?, (SELECT SUM(p.prod_precio*d.dp_cantidadPedida) FROM orden AS o '+
                        'INNER JOIN detallepedido AS d ON o.ord_id = d.dp_ord_id '+
                        'INNER JOIN producto AS p ON d.dp_prod_id = p.prod_id '+
                        'WHERE o.ord_id = ?))';
        const result = await connection.query(query, [body.dp_ord_id, body.dp_ord_id]);

        res.json(result);
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.get('/mostrar_las_facturas/', async (req, res) => {
    try{ 
        const query = 'SELECT o.ord_id, o.ord_mesa_id, m.mro_nombre, o.ord_fecha, f.fac_total FROM orden AS o '+
                        'INNER JOIN mesero AS m ON o.ord_mro_nue = m.mro_nue '+
                        'INNER JOIN factura AS f ON o.ord_id = f.fac_ord_id';
        const consultas = await connection.query(query);
        res.json(consultas);
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.get('/mostrar_por_fecha/', async (req, res) => {
    try{
        const ord_fecha= req.query.ord_fecha;
        const query = 'SELECT o.ord_id, o.ord_mesa_id, mr.mro_nombre, DATE(o.ord_fecha) AS ord_fecha, f.fac_total FROM orden AS o ' +
                       'INNER JOIN mesero AS mr ON o.ord_mro_nue = mr.mro_nue '+
                       'INNER JOIN factura AS f ON o.ord_id =f.fac_ord_id '+
                        'WHERE DATE(o.ord_fecha) = ?';
        const fecha = await connection.query(query, [ord_fecha]);
 
        res.json(fecha);
    } catch(error){
        return res.json({
            error:error
        });
    }
});

router.get('/mostrar_por_mf/', async (req, res) => {
    try{
        const ord_fecha= req.query.ord_fecha;
        const mro_nue= req.query.mro_nue;
        const query = 'SELECT o.ord_id, o.ord_mesa_id, mr.mro_nombre, o.ord_fecha, f.fac_total FROM orden AS o ' +
                       'INNER JOIN mesero AS mr ON o.ord_mro_nue = mr.mro_nue '+
                       'INNER JOIN factura AS f ON o.ord_id = f.fac_ord_id '+
                        'WHERE DATE(o.ord_fecha) = ? AND mr.mro_nue = ?';
        const mesero = await connection.query(query, [ord_fecha, mro_nue]);
 
        res.json(mesero);
    } catch(error){
        return res.json({
            error:error
        });
    }
});
 
router.get('/mostrar_por_mesaf/', async (req, res) => {
    try{
        const ord_fecha= req.query.ord_fecha;
        const mesa_id= req.query.mesa_id;
        const query = 'SELECT o.ord_id, o.ord_mesa_id, mr.mro_nombre, o.ord_fecha, f.fac_total FROM orden AS o ' +
                       'INNER JOIN mesero AS mr ON o.ord_mro_nue = mr.mro_nue '+
                       'INNER JOIN factura AS f ON o.ord_id =f.fac_ord_id '+
                        'WHERE DATE(o.ord_fecha) = ? AND o.ord_mesa_id = ?'
        const mesa = await connection.query(query, [ord_fecha, mesa_id]);
 
        res.json(mesa);
    } catch(error){
        return res.json({
            error:error
        });
    }
});

module.exports = router;