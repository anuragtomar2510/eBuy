require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/product');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');


function productController () {


    return {


        // ADD PRODUCT
        async addProduct (req, res) {

            // validation 
            const errors = validationResult(req);

            if(!errors.isEmpty) {

                return res.status(422).json(errors);

            }

            const newProduct = new Product(req.body);

            try {

                const savedProduct = await newProduct.save();

                return res.status(201).json(savedProduct);

            } catch(err) {

                return res.status(500).json({errors: [{msg: 'server error'}]});

            }

        },

        // UPDATE PRODUCT

        async updateProduct(req, res) {

            try {

                const updatedProduct = await Product.findByIdAndUpdate(

                    req.params.id,
                    {

                        $set: req.body
                    },

                    {new: true}
                );

                return res.status(201).json(updatedProduct);

            } catch(err) {

                return res.status(500).json({errors: [{msg: 'server error'}]});

            }

        },

        // DELETE PRODUCT
        async deleteProduct(req, res) {

            try {

                await Product.findByIdAndDelete(req.params.id);

                return res.status(201).json("Product has been deleted");

            } catch (err) {

                return res.status(500).json({errors: [{msg: 'server error'}]});

            }
        },

        // GET PRODUCT
        async getProduct(req, res) {

            try {

                const product = await Product.findById(req.params.id);

                if(!product) {

                    return res.status(401).json({errors : [{msg: 'Product not found'}]});

                }

                return res.status(201).json(product);



            } catch(err) {

                return res.status(500).json({errors: [{msg: 'server error'}]});

            }

        },

        // GET ALL PRODUCT
        async getAllProducts (req, res) {

            const qNew = req.query.new;
            const qCategory = req.query.category;

            try {

                let products;

                if(qNew) {

                    products = await Product.find().sort({createdAt: -1}).limit(1)

                } else if(qCategory) {

                    products = await Product.find({ categories: { $in : [qCategory]}});

                } else {

                    products = await Product.find();

                }

                return res.status(201).json(products);

            } catch(err) {

                return res.status(500).json({errors: [{msg: 'server error'}]});

            }
        }




    }


}

module.exports = productController;