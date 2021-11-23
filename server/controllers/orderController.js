
require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('../models/order');
const {validationResult} = require('express-validator');


function orderController() {

    return {


        // Place an order
        async placeOrder(req, res) {

            const errors = validationResult(req);

            if(!errors.isEmpty) {

                return res.status(403).json(errors);
                
            }

            const newOrder = new Order(req.body);

            try {

                const placeOrder = await newOrder.save();

                return res.status(201).json(placeOrder);

            } catch(err) {

                return res.status(500).json({errors: [{msg: "server error"}]});

            }
        },


        // UPDATE ORDER
        async updateOrder(req, res) {

            try {

                const updateOrder = await Order.findByIdAndUpdate(
                    req.params.id,
                    {$set: req.body},
                    {new: true}
                );

                return res.status(201).json(updateOrder);

            } catch(err) {

                return res.status(500).json({errors: [{msg: "server error"}]});

            }
        },


        // DELETE ORDER
        async deleteOrder(req, res) {

            try {

                await Order.findByIdAndDelete(req.params.id);

                return res.status(201).json("Order has been deleted");

            } catch (err) {

                return res.status(500).json({errors: [{msg: "server error"}]});

            }

        },

        // GET USER ORDERS
        async getUserOrders(req, res) {


            try {

                const userOrders = await Order.find({userId: req.params.userId});

                if(!userOrders){

                    return res.status(401). json({errors: [{msg: "No order found"}]});

                }

                return res.status(201).json(userOrders);

            } catch(err) {

                return res.status(500).json({errors: [{msg: "server error"}]});

            }
        },

        // GET ALL ORDERS
        async getAllOrders(req, res) {

            try {

                const allOrders = await Order.find();

                if(!allOrders) {

                    return res.status(401). json({errors: [{msg: "No order found"}]});

                }

                return res.status(201).json(allOrders);

            } catch(err) {

                return res.status(500).json({errors: [{msg: "server error"}]});

            }

        },

        // GET MONTHLY INCOME
        async getIncome(req, res) {

            const date = new Date();
            const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
            const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

            try {

                const income = await Order.aggregate([

                    { $match: { createdAt: { $gte: previousMonth } } },

                    {
                      $project: {
                        month: { $month: "$createdAt" },
                        sales: "$amount",
                      },
                    },

                    {
                      $group: {
                        _id: "$month",
                        total: { $sum: "$sales" },
                      },
                    },

                  ]);

                return res.status(201).json(income);

            } catch (err) {

                return res.status(500).json({errors: [{msg: "server error"}]});

            }

        }

    }



}


module.exports = orderController;