// import { object } from "joi";
import mongoose, { Schema, model } from "mongoose";

/**
 * string
 * number
 * Arrays
 * Objects
 * ObjectIds
 */

const productSchema = new Schema({
    /** String */
    title: { type: String, required: true, trim: true },
    desc: String,
    slug: { type: String, required: true, trim: true },  /** @todo make the slug in lowercase */
    folderId: { type: String, required: true, unique: true },


    /** Number */
    basePrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    appliedPrice: { type: Number, required: true },
    stock: { type: Number, required: true, min: 1 },
    rate: { type: Number, default: 0, min: 0, max: 5 },

    /** Arrays */
    MainImage: {
        type : Object  ,
    } ,

    subImage : {
        type : Object
    },

    // /** Objects(Map)*/
    // specs: {
    //     type: Map,
    //     of: [String | Number]
    // },

    /** ObjectIds */
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    catogeryId: { type: Schema.Types.ObjectId, ref: 'Catagery', required: true },
    subCatogeryId: { type: Schema.Types.ObjectId, ref: 'SubCatagery', required: true },
    brandId: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },

}, { timestamps: true });
 

const productModel = mongoose.models.Product || model('Product', productSchema)

export default productModel
  


// {
//     colors: ['red', 'green', 'blue'],
//         hamada: [128, 265, 64],
// }

// {
//     colors: ['yellow', 'white'],
//         sizes: ['s', 'm', 'l', 'xl']
// }
// {
//     colors: ['red', 'green', 'blue']
// }

// MDN  to study Map and Objects