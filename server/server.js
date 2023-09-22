const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors({origin: true, credentials: true}));

const stripe = require("stripe")("sk_test_51Hx7kCKiNNjBWDDLLvtI6FstSNendb6yVOT42CQPu5ULVKmKQIvGy4EAoF9N6Tttszt7eqpahwqrEK6JZK3HVCRF00RjG4jxw3");

app.post('/checkout', async (req, res, next)=>{
    console.log(req.body);
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.items.map((item) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.product]
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: "http://localhost:4242/success.html",
            cancel_url: "http://localhost:4242/cancel.html",
        })
        res.status(200).json(session);
    }catch(error){
        return next(error)
    }
})

app.listen(4242, ()=>{
    console.log(`app is running http://localhost:4242`);
})

