const Product = require('../models/product.model');

module.exports.search = (req, res, next) => {
    const { term } = req.query;

    const searchTermRegex = new RegExp(term, 'i');

    Product.find({ name: searchTermRegex })
        .then(products => res.status(200).json(products))
        .catch(next);
}    