require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const jwtSecret = process.env.jwtSecret;


function authController () {

        return {


                // register
                async register (req, res) {


                        // validation 

                        const errors = validationResult(req);

                        if(!errors.isEmpty()) {

                                return res.status(422).json(errors);

                        }



                        const { username, email, password } = req.body;

                        try {

                                // check if user exists
                                const user = await User.findOne({username});

                                if(user) {

                                        return res.status(403).json({errors : [{msg: 'username is already taken'}]});

                                }

                               

                                try {

                                        const hashedPassword = await bcrypt.hash(password, 10);

                                        const newUser = new User({

                                                username,
                                                email,
                                                password: hashedPassword

                                        });

                                
                                     

                                        try {

                                                const savedUser = await newUser.save();

                                                return res.status(201).json(savedUser);

                                        } catch (err) {

                                                return res.status(500).json({errors : [{msg: 'server error'}]});
                                                
                                        }



                                } catch (err) {

                                        return res.status(500).json({errors : [{msg: 'server error'}]});

                                }

                        } catch (err) {

                                
                                return res.status(500).json({errors : [{msg: 'server error'}]});


                        }


                },


                // login
                async login (req, res) {

                        
                       
                        
                         // validation 

                         const errors = validationResult(req);

                         if(!errors.isEmpty()) {
 
                                 return res.status(422).json(errors);
                                 
                         }

                         const { username, password } = req.body;

                        try {

                                

                                const user = await User.findOne({username});

                             

                                if(!user) {

                                        return res.status(401).json({errors : [{msg: 'wrong username or password'}]});

                                }

                               

                                try {

                                        
                                        const match = await bcrypt.compare(password, user.password);

                                        
                                        if(!match) {

                                                return res.status(401).json({errors : [{msg: 'wrong username or password'}]});

                                        }

                                        
                                        const accessToken = jwt.sign(
                                                {
                                                id: user._id,
                                                isAdmin: user.isAdmin,
                                                },
                                                
                                                jwtSecret,

                                                {expiresIn:"3d"}
                                        );

                                    
                                        
                                        
                                        
                                        
                                        return res.status(201).json({...user._doc, accessToken});

                                } catch(err) {


                                        

                                        return res.status(500).json({errors : [{msg: 'server error'}]});


                                }

                        } catch(err) {

                                

                                return res.status(500).json({errors : [{msg: 'server error'}]});


                        }

                }
        }

}

module.exports = authController;