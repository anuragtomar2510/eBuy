require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


function checkoutController() {

    return {

        async payment(req, res) {

            stripe.charges.create(

                {
                  source: req.body.tokenId,
                  amount: req.body.amount,
                  currency: "inr",

                },

                (err, result) => {

                  if (stripeErr) {

                    res.status(500).json({errors: [{msg: 'server error'}]});


                  } else {

                    res.status(201).json(result);

                  }
                }
              );


        }

    }

}

module.exports = checkoutController;