const Product = require('../models/product.model');

module.exports.list = (req, res, next) => {
    Product.find()
        .then(products => res.json(products))
        .catch(next)
}

module.exports.detail = (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(next)
}

module.exports.create = (req, res, next) => {
    Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        size: req.body.size,
        category: req.body.category,
        img: req.file ? req.file.path : undefined

        })
        .then(product => res.status(201).json(product))
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
        .then(product => res.status(204).json())
        .catch(next)
}


