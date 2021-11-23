require('dotenv').config();
const Cart = require('../models/cart');


function cartController () {


    return {

        // ADD CART
        async addCart(req, res) {

            const newCart = new Cart(req.body);

            try {

                const savedCart = await newCart.save();

                return res.status(201).json(savedCart);


            } catch(err) {

                return res.status(500).json({errors : [{msg: "server error"}]});

            }
        },


        // UPDATE CART
        async updateCart(req, res) {

            try {

                const updatedCart = await Cart.findByIdAndUpdate(
                    req.params.id,
                    {$set: req.body},
                    {new: true}
                );

                return res.status(201).json(updatedCart);


            } catch(err) {

                return res.status(500).json({errors : [{msg: "server error"}]});

            }
        },


        // DELETE CART
        async deleteCart(req, res) {

            try {

                await Cart.findByIdAndDelete(req.params.id);

                return res.status(201).json("Cart has been deleted");

            } catch(err) {

                return res.status(500).json({errors : [{msg: "server error"}]});

            }

        },

        // GET CART
        async getCart(req, res) {

            try {

                const cart = await Cart.findOne({userId: req.params.userId});

                if(!cart) {

                    return res.status(403).json({errors : [{msg: "No cart found"}]});

                }

                return res.status(201).json(cart);

            } catch(err) {

                return res.status(500).json({errors : [{msg: "server error"}]});

            }
        },


        // GET ALL CARTS
        async getAllCarts(req, res) {

            try {

                const carts = await Cart.find();

                return res.status(201).json(carts);


            } catch(err) {

                return res.status(500).json({errors : [{msg: "server error"}]});


            }
        }

    }



}


module.exports = cartController;