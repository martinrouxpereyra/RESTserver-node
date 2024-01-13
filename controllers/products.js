const { response } = require('express');
const { Product } = require('../models/index');
const { body } = require('express-validator');

const postProduct = async(req, res = response) =>{
    
    const {status, user, ...body} = req.body;
    const name = req.body.name.toUpperCase();

    const ProductDB = await Product.findOne({ name });

    if(ProductDB){
        return res.status(400).json({
            msg: `Product ${ProductDB.name}, already exists`
        });
    }

    const data = {
        ...body,
        name,
        user: req.authorizedUser._id,
        category: req.body.category
    }

    const product = new Product(data);
    await product.save();
    res.status(201).json(product);

}

const getProducts = async (req, res = response) =>{

    const {limit = 5, skip = 0} = req.query;
    const statusQuery = {status: true};

    //Promise.all ejecuta las promesas en simultaneo, si una falla, no sigue
    const [total, resp] = await Promise.all([
        Product.countDocuments(statusQuery),
        Product.find(statusQuery)
            .skip(Number(skip))
            .limit(Number(limit))
            .populate('user', 'name')//permite mostrar el nombre de que usuario lo creo en vez del ID
    ]);

    res.json({
        total,
        resp
    });
}

const getProduct = async (req, res = response) =>{
    const { id } = req.params;

    const product = await Product.findById(id).populate('user', 'name');

    res.json({ product });
}

const putProduct = async(req, res = response) =>{
    const { id } = req.params;
    const{ status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    //usuario que esta actualizando
    data.user = req.authorizedUser._id;

    const product = await Product.findByIdAndUpdate(id, data, {new: true});

    return res.json({ product });
}

const deleteProduct = async(req, res = response) =>{
    const { id } = req.params;
    
    const product = await Product.findByIdAndUpdate(id, {status: false}, {new: true});
    return res.json({
        msg: `product ${product.name} successfully deleted`
    });
}



module.exports = {
    postProduct,
    getProducts,
    getProduct,
    putProduct,
    deleteProduct
}