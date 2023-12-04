'use strict';

const produtoData = require('../data/produtos');

const getProdutos = async (req, res, next) => {
    try {
        const produtos = await produtoData.getProdutos();
        res.send(produtos);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getProduto = async (req, res, next) => {
    try {
        const produtoId = req.params.id;
        const oneProduto = await produtoData.getById(produtoId);
        res.send(oneProduto);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addProduto = async (req,res,next) => {
    try {
        const data = req.body;
        console.log(data);
        const created = await produtoData.createProduto(data);
        res.send(created);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateProduto = async (req, res , next) => {
    try {
        const produtoId = req.params.id;
        const data = req.body;
        const updated = await produtoData.updateProduto(produtoId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteProduto = async (req, res, next ) => {
    try {
        const produtoId = req.params.id;
        const deletedproduto = await produtoData.deleteProduto(produtoId);
        res.send(deletedproduto);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getProdutos,
    getProduto,
    addProduto,
    updateProduto,
    deleteProduto
}