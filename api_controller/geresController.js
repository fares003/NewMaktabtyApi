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
  
   return res.status(201).json({ 'message': 'Genre added successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 'message': 'Failed to add genre.' });
    }
};

const deleteGenres = async (req, res) => {
    try {
        const genreToDelete = req.params.genre;
        if (!genreToDelete || typeof genreToDelete !== 'string') {
            return res.status(400).json({ 'message': 'Invalid genre parameter.' });
        }
        await Genre.updateOne({}, { $pull: { genre: genreToDelete } });
        return res.status(200).json({ 'message': 'Genre deleted successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 'message': 'Failed to delete genre.' });
    }
};

const getAllGenres = async (req, res) => {
    try {
        const allGenres = await Genre.findOne();
        return res.status(200).json(Genre);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 'message': 'Failed to fetch genres.' });
    }
};

module.exports = { addGenres, deleteGenres, getAllGenres };
