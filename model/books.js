const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const booksSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    publishername:{
        type:String,
        required:true
    },
    publishingdate:{
        type:Date,
        required:true
    },
    categories:{
        type:String,
        required:true
    },
    reviews: [{
        review: String,
        rate: Number,
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        }
        
    }],
    cont:{
        type:Number,
        required:true
    },
      pages:{
        type:Number,
        required:true
      },
      sale:{
        type:Number,
        required:true
      }

    
});
booksSchema.index({ title: 'text', author: 'text', description: 'text', categories: 'text' });
module.exports = mongoose.model('books', booksSchema);
