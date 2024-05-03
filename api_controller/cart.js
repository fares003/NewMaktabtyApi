const users=require('../model/users')
const books=require('../model/books')

const getCart = async (req, res) => {
    if (!req?.params?.id) {
        return res.sendStatus(400).json({'message': 'id parameter is required '});
    }

    try {
        const foundUser = await users.findById(req.params.id);
        if (!foundUser) {
            return res.sendStatus(404);
        }

        const bookIds = foundUser.cart;
        const foundBooks = await books.find({_id: {$in: bookIds}});

        // Flatten the array to include duplicate books
        const allBooks = bookIds.flatMap(id => foundBooks.filter(book => book._id.toString() === id.toString()));

        return res.json(allBooks);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
};


const addInCart=async(req,res)=>{
    if (!req?.params?.id) {
        return res.sendStatus(400).json({'message': 'id parameter is required '});
    }

    try {
        const foundUser = await users.findById(req.params.id);
        if (!foundUser) {
            return res.sendStatus(404);
        }

        foundUser.cart.push(req.body.id)
        
        await foundUser.save();
        res.json(foundUser.cart)
    } catch (err) {
        return res.status(400).json({ message: 'Bad request' });
    }
}

const deleteCartElement = async (req, res) => {
    if (!req?.params?.userId || !req?.params?.bookId) {
        return res.sendStatus(400).json({ 'message': 'user id and book id parameters are required ' });
    }

    try {
        const updatedUser = await users.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { cart: req.params.bookId } },
            { new: true }
        );

        if (!updatedUser) {
            return res.sendStatus(404);
        }

        return res.json(updatedUser);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}
const deleteAllCart = async (req, res) => {
    if (!req?.params?.id) {
        return res.sendStatus(400).json({ 'message': 'user id parameter is required' });
    }

    try {
        const updatedUser = await users.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { cart: [] } },
            { new: true }
        );

        if (!updatedUser) {
            return res.sendStatus(404);
        }

        return res.json(updatedUser);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}

module.exports={
    getCart,
    addInCart,
    deleteCartElement,
    deleteAllCart
}

