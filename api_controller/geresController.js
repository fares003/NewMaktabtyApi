const Genre = require('../model/genres');

const addGenres = async (req, res) => {
    try {
        const newGenre = req.body.genre;
        if (!newGenre || typeof newGenre !== 'string') {
            return res.status(400).json({ 'message': 'Invalid genre.' });
        }
        const result = await Genre.create({
         "genre":newGenre
        });   
        console.log(result);
        const genres = await Genre.find();
        return res.status(200).json(genres);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 'message': 'Failed to add genre.' });
    }
};

const deleteGenres = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'id parameter is required.' });
    }

    const books = await Genre.findOne({ _id: req.params.id }).exec();
    if (!books) {
        return res.status(400).json({ "message": `Books ID ${req.params.id} not found` });
    }

    const result = await Genre.deleteOne({ _id: req.params.id });
    res.json(result);
};

const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        return res.status(200).json(genres);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 'message': 'Failed to fetch genres.' });
    }
};
module.exports = { addGenres, deleteGenres, getAllGenres };
