const Books = require('../model/books');

const getAllBooks = async (req, res) => {
    const searchTerm = req.query.search;
    let query = {};

    if (searchTerm) {
        query = { $text: { $search: searchTerm } };
    }

    try {
        const books = await Books.find(query);
        if (!books || books.length === 0) {
            return res.status(204).json({ 'message': 'No books found' });
        }
        res.json(books);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};


const createNewBooks = async (req, res) => {
    if (!req.body.title || !req.body.description||!req.body.image||!req.body.author||!req.body.price||!req.body.publishername||!req.body.publishingdate||!req.body.categories) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }
    const newBooks = {
        title: req.body.title ,
        description: req.body.description,
        image: req.body.image,
        author: req.body.author,
        price:req.body.price,
        publishername:req.body.publishername,
        publishingdate:req.body.publishingdate,
        categories:req.body.categories,
        cont:req.body.cont,
        pages:req.body.pages
    };

    try {
        const result = await Books.create(newBooks);
        console.log(result);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

const updateBooks = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'id parameter is required.' });
    }

    const books = await Books.findOne({ _id: req.params.id }).exec();
    if (!books) {
        return res.status(204).json({ "message": `No Books matches id: ${req.params.id} not found` });
    }

    if(req.body.title)books.title= req.body.title 
    if(req.body.description)books.description= req.body.description
    if(req.body.image)books.image= req.body.image
    if(req.body.author)books.author= req.body.author
    if(req.body.price)books.price=req.body.price
    if(req.body.publishername)books.publishername=req.body.publishername
    if(req.body.publishingdate)books.publishingdate=req.body.publishingdate
    if(req.body.categories)books.categories=req.body.categories
    if(req.body.cont)books.cont=req.body.cont

    await books.save();

    res.json(books);
};

const deleteBooks = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'id parameter is required.' });
    }

    const books = await Books.findOne({ _id: req.params.id }).exec();
    if (!books) {
        return res.status(400).json({ "message": `Books ID ${req.params.id} not found` });
    }

    const result = await Books.deleteOne({ _id: req.params.id });
    res.json(result);
};

const getBooks = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'id parameter is required.' });
    }

    const books = await Books.findOne({ _id: req.params.id });
    if (!books) {
        return res.status(204).json({ 'message': `No Books matches the id ${req.params.id} ` });
    }

    res.json(books);
};
const addReview=async(req,res)=>{
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'id parameter is required.' });
    }
    const book = await Books.findOne({ _id: req.params.id });
    if (!book) {
        return res.status(204).json({ 'message': `No Books matches the id ${req.params.id} ` });
    }
    book.reviews.push({review:req.body.review,rate:req.body.rate,firstname:req.body.firstname,lastname:req.body.lastname})
    await book.save();
    res.json(book)
}
const updateCount=async(req,res)=>{
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'id parameter is required.' });
    }
    if (!req?.body?.cont){
        return res.status(400).json({ 'message': 'count parameter is required.' });

    }
    const books = await Books.findOne({ _id: req.params.id }).exec();
    if (!books) {
        return res.status(204).json({ "message": `No Books matches id: ${req.params.id} not found` });
    }
    books.cont=req.body.cont
    await books.save();

    res.json(books);

}
module.exports = {
    getAllBooks,
    createNewBooks,
    updateBooks,
    deleteBooks,
    getBooks,
    addReview,
    updateCount
};
