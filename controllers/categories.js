const { response } = require('express');

const { Category } = require('../models/index');

const postCategory = async(req, res = response) =>{
    
    const name = req.body.name.toUpperCase();

    //check if already exist a category with that name
    categoryDB = await Category.findOne({ name });

    //if categoryDB is not null, then that categry es already registered
    if(categoryDB){
        return res.status(400).json({
            msg: `category ${categoryDB.name}, already exists`
        });
    }
    //here i'll generate the data i want to save in bd (exluding status)
    const data = {
        name,
        /*
        authenticated user who made de request
        (i can use authorizedUser because i used validate-jwt helper who ad authorized user to the req)
        */
        user: req.authorizedUser._id
    }

    const category = new Category(data);
    //save in DB
    await category.save();

    res.status(201).json(category);


}

const getCategories = async(req, res = response) =>{

    const {limit = 5, skip = 0} = req.query;
    const statusQuery = {status: true};

    //Promise.all ejecuta las promesas en simultaneo, si una falla, no sigue
    const [total, resp] = await Promise.all([
        Category.countDocuments(statusQuery),
        Category.find(statusQuery)
            .skip(Number(skip))
            .limit(Number(limit))
            .populate('user', 'name')//permite mostrar el nombre de que usuario lo creo en vez del ID
    ]);

    res.json({
        total,
        resp
    });
}

const getCategoty = async(req, res = response) =>{
    const { id } = req.params;

    const category = await Category.findById(id).populate('user', 'name');

    res.json({ category });

}

const putCategory = async(req, res = response) =>{
    const { id } = req.params;
    const{ status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    //usuario que esta actualizando
    data.user = req.authorizedUser._id;

    const category = await Category.findByIdAndUpdate(id, data, {new: true});

    return res.json({ category });
}

const deleteCategoty = async(req, res = response) =>{
    const { id } = req.params;
    const authUser = req.authorizedUser;
    
    const category = await Category.findByIdAndUpdate(id, {status: false});
    return res.json({
        msg: `category${category.name} succsessfully deleted`
    });
}

module.exports = {
    getCategories,
    postCategory,
    getCategoty,
    putCategory,
    deleteCategoty
}