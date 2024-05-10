const Orders = require('../model/orders');

const addOrder=async(req,res)=>{
    if (!req.body.email || !req.body.city||!req.body.street||!req.body.building||!req.body.phone||!req.body.state||!req.body.amount||!req.body.payment||!req.body.books) {
        return res.status(400).json({ 'message': 'please enter all required attributes' });
    }
    const newOrder = {
        email: req.body.email ,
        city: req.body.city,
        street: req.body.street,
        building: req.body.building,
        phone:req.body.phone,
        state:req.body.state,
        amount:req.body.amount,
        payment:req.body.payment,
        books:req.body.books
    };
    try {
        const result = await Orders.create(newOrder);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
const getAllOrders=async(req,res)=>{
    try {
        const orders = await Orders.find();
        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 'message': 'Failed to fetch orders.' });
    }
}
const deleteOrder = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'id parameter is required.' });
    }

    const orders = await Orders.findOne({ _id: req.params.id }).exec();
    if (!orders) {
        return res.status(400).json({ "message": `order ID ${req.params.id} not found` });
    }

    const result = await Orders.deleteOne({ _id: req.params.id });
    res.json(result);
};
const setState=async(req,res)=>{
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'id parameter is required.' });
    }

    const orders = await Orders.findOne({ _id: req.params.id }).exec();
    if (!orders) {
        return res.status(400).json({ "message": `order ID ${req.params.id} not found` });
    }
    orders.state=req.body.state
    await orders.save();

    res.json(orders);
}
const makeRefund=async(req,res)=>{
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'id parameter is required.' });
    }

    const orders = await Orders.findOne({ _id: req.params.id }).exec();
    if (!orders) {
        return res.status(400).json({ "message": `order ID ${req.params.id} not found` });
    }
    orders.refund=req.body.refund
    await orders.save();

    res.json(orders);
}
module.exports = {makeRefund,addOrder,getAllOrders,deleteOrder,setState };
