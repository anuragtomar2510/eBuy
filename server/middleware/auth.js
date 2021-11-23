require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.token;

    if(!authHeader) {

        return res.status(401).json({errors : [{msg : "You are not authenticated!"}]});
        
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, jwtSecret);

        req.user = decoded;

        next();


    } catch (err) {

        return res.status(401).json({errors : [{msg : "You are not authenticated!"}]});

    }
}



const verifyTokenAndAuthorization = (req, res, next) => {

    verifyToken(req, res, () => {

      if (req.user.id === req.params.id || req.user.isAdmin) {

        next();

      } else {

        res.status(403).json({errors : [{msg: '"You are not alowed to do that!"'}]});

      }

    });

};




const verifyTokenAndAdmin = (req, res, next) => {

    verifyToken(req, res, () => {

      if (req.user.isAdmin) {

        next();

      } else {

        res.status(403).json({errors: [{msg: "You are not alowed to do that!"}]});

      }

    });

};
  
module.exports = {

    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,

};