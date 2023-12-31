'use strict';

const utils = require('../utils');
const config = require('../../config');
// const sql = require('pg');
const { Pool } = require('pg');

const getProdutos = async () => {
    try {
        // let pool = await sql.connect(config.sql);
        let pool = new Pool(config.pg)
        // const list = await pool.request().query(sqlQueries.eventslist);
        // const list = await pool.query(sqlQueries.eventslist);
        const list = await pool.query("Select * from produtos");
        console.log(list);
        return list.rows;
    } catch (error) {
        return error.message;
    }
}

const getById = async (produtoId) => {
    try {
        let pool = new Pool(config.pg);
        const oneProduto = await pool.query("Select * from produtos where Id = $1",[produtoId]);
        console.log(oneProduto);
        // return list.recordset;
        return oneProduto.rows;
    } catch (error) {
        return error.message;
    }
}

const createProduto = async (produtoData) => {
    try {
        let pool = new Pool(config.pg);
        const insertProduto = await pool.query("Insert INTO produtos (nome,description, preco, categoria,"+
        " imagem, estoque,peso,disponibilidade)"+
        " VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
                [produtoData.nome,produtoData.description,produtoData.preco,produtoData.categoria,
                    produtoData.imagem,produtoData.estoque,produtoData.peso,produtoData.disponibilidade]);
        return (await pool.query("Select max(Id) as Id from produtos")).rows; 
    } catch (error) {
        return error.message;
    }
}

const updateProduto = async (produtoId ,produtoData) => {
    try {
        let pool = new Pool(config.pg);
        const update = await pool.query("Update produtos set nome = $1, description = $2, preco = $3,categoria = $4, imagem =$5,"+
        " estoque = $6, peso = $7, disponibilidade = $8 "+
        " where produtoId = $9",
        [produtoData.nome,
            produtoData.description,
            produtoData.preco,
            produtoData.categoria,
            produtoData.imagem,
            produtoData.estoque,
            produtoData.peso,
            produtoData.disponibilidade,
            produtoId]);
        return (await pool.query("Select * from produtos where Id = $1 ",[produtoId])).rows; 
    } catch (error) {
        return error.message;
    }
}

const deleteProduto = async (produtoId) => {
    try {
        let pool = new Pool(config.pg);
        const deleted = await pool.query("delete from produtos where Id = $1", [produtoId]);
        return (await pool.query("Select * from produtos where Id = $1 ",[produtoId])).rows; 
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getProdutos,
    getById,
    createProduto,
    updateProduto,
    deleteProduto
}