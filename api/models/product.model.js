const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            text: true,

        },
        description: {
            type: String,
            required: true,

        },
        price: {
            type: Number,
            required: true,

        },
        img: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ['camisetas', 'sudaderas', 'pantalones', 'accesorios', 'otros'],
            default: 'otros',
        },
        size: {
            type: String,
            enum: ['S', 'M', 'L', 'XL'],
            default: 'M',
        },
    }, { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
