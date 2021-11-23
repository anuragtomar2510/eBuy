require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



function userController () {


    return {

            // UPDATE USER
            async updateUser(req, res) {

                if(req.body.password) {

                    try {

                        const hashedPassword = await bcrypt.hash(req.body.password, 10);

                        req.body.password = hashedPassword;

                    } catch (err) {

                        return res.status(500).json({errors : [{msg: 'server error'}]});

                    }

                }


                try {

                    const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});

                    return res.status(201).json(user);


                } catch(err) {

                    return res.status(500).json({errors : [{msg: 'server error'}]});

                }

            },

            // DELETE USER
            async deleteUser(req, res) {

                try {

                    await User.findByIdAndDelete(req.params.id);

                    return res.status(201).json('User has been deleted');

                } catch(err) {

                    return res.status(500).json({errors : [{msg: 'server error'}]});

                }
            },

            // GET USER
            async getUser(req, res) {

                try {

                    const user = await User.findOne({_id: req.params.id}).select("-password");

                    if(!user) {

                        return res.status(403).json({errors : [{msg: 'user does not exist'}]});

                    }

                    return res.status(201).json(user);

                } catch(err) {

                    return res.status(500).json({errors : [{msg: 'server error'}]});

                }
            },

            // GET ALL USER
            async getAllUsers(req, res) {

                const query = req.query.new;
              
                try {

                    const users = query
                         ? await User.find().select("-password").sort({ _id: -1 }).limit(5)
                         : await User.find().select("-password");

                    res.status(201).json(users)

                } catch(err) {

                    return res.status(500).json({errors : [{msg: 'server error'}]});

                }
            },

            // GET USER STATS
            async getUserStats(req, res) {


                const date = new Date();
                const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

                try {

                    const data = await User.aggregate([

                        { $match: { createdAt: { $gte: lastYear } } },

                        {
                          $project: {
                            month: { $month: "$createdAt" },
                          },
                        },

                        {
                          $group: {
                            _id: "$month",
                            total: { $sum: 1 },
                          },
                        },

                      ]);

                    return res.status(201).json(data)

                } catch (err) {

                    return res.status(500).json({errors : [{msg: 'server error'}]});

                }
            }

    }


}

module.exports = userController;