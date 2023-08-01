const express = require('express');
const router = express.Router();
const Gasto = require('../models/gastos');

router.get('/', (req, res) => {
    res.json({ status: 'API works' });
})

const gastosController = {};
gastosController.getGastos = async (req, res) => {
    const gastos = await Gasto.find();
    res.json(gastos);
    console.log(gastos);
}
gastosController.createGastos = async (req, res) => {
    const gasto = new Gasto(req.body);
    console.log(gasto);
    await gasto.save();
    res.json('status: Gasto guardado');
}
gastosController.getGasto = async (req, res) => {
    console.log(req.params.id);
    const gasto = await Gasto.findById(req.params.id);
    res.json(gasto);
}
gastosController.getGastoTipo = async (req, res) => {
    const tipo = req.params.tipo;
    try {
        const gastosTipo = await Gasto.find({tipo:tipo});
        res.json(gastosTipo);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los gastos por tipo." });
    }
}
gastosController.editGasto = async (req, res) => {
    const { id } = req.params;
    const gasto = {
        tipo: req.body.tipo,
        ruc: req.body.ruc,
        empresa: req.body.empresa,
        monto: req.body.monto
    };
    await Gasto.findByIdAndUpdate(id, { $set: gasto }, { new: true });
    res.json('status: Gasto actualizado');
}
gastosController.deleteGasto = async (req, res) => {
    const gasto = await Gasto.findById(req.params.id);
    await gasto.deleteOne();
    res.json('status: Gasto eliminado');
}

module.exports = gastosController;