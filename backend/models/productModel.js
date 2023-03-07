const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true , "Please add a name for Product"] ,
        trim : true,
    },
    sku:{
        type: String,
        required: [true],
        trim : true,
        default : 'SKU',
    },
    category:{
        type: String,
        required: [true , "please add a category"],
        trim : true,
    },
    quantity:{
        type: Number,
        required: [true, "please add a quantity"],
        trim : true,
    },
    price:{
        type: Number,
        required: [true, "please add a price"],
        trim : true,
    },
    description:{
        type: String,
        required: [true, "please add a description"],
        trim : true,
    },
    image:{
        type: Object,
        default: {}
    }
},
{
    timestamps: true
});



const Product = mongoose.model('Product', productSchema);
module.exports = Product;