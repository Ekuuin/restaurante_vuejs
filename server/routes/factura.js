const express = require('express');
const router = express.Router();
const connection = require('../connection');

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
        const query = 'SELECT o.ord_id, o.ord_mesa_id, mr.mro_nombre, o.ord_fecha, f.fac_total FROM orden AS o ' +
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

router.get('/facturas_mesero_fecha/', async (req, res) => {
    try{
        const ord_fecha= req.query.ord_fecha;
        const mro_nue= req.query.mro_nue;
        const query = 'SELECT o.ord_id, o.ord_mesa_id, mr.mro_nombre, o.ord_fecha, f.fac_total FROM orden AS o ' +
                       'INNER JOIN mesero AS mr ON o.ord_mro_nue = mr.mro_nue '+
                       'INNER JOIN factura AS f ON o.ord_id = f.fac_ord_id '+
                        'WHERE o.ord_fecha = ? AND mr.mro_nue = ?';
        const mesero = await connection.query(query, [ord_fecha, mro_nue]);
 
        res.json(mesero);
    } catch(error){
        return res.json({
            error:error
        });
    }
});
 
router.get('/facturas_mesa_fecha/', async (req, res) => {
    try{
        const ord_fecha= req.query.ord_fecha;
        const ord_mesa_id= req.query.ord_mesa_id;
        const query = 'SELECT o.ord_id, o.ord_mesa_id, mr.mro_nombre, o.ord_fecha, f.fac_total FROM orden AS o ' +
                       'INNER JOIN mesero AS mr ON o.ord_mro_nue = mr.mro_nue '+
                       'INNER JOIN factura AS f ON o.ord_id =f.fac_ord_id '+
                        'WHERE o.ord_fecha = ? AND o.ord_mesa_id = ?;'
        const mesa = await connection.query(query, [ord_fecha, ord_mesa_id]);
 
        res.json(mesa);
    } catch(error){
        return res.json({
            error:error
        });
    }
});

module.exports = router;