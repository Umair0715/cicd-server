const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json())
app.use(cors('*'))

console.log({ DATABASE_URI : process.env.DATABASE_URI })
mongoose.connect(process.env.DATABASE_URI)
.then(() => console.log('database connected.'))
.catch(err => console.log(`Database connection failed. ${err}`));

const Product = mongoose.model('Product' , new mongoose.Schema({
    name : String
}))

app.get('/' , async (req , res) => {
    const products = await Product.find({});
    res.json({ message : 'hello from express in docker via CICD' , products })
});


app.post('/' , async (req , res) => {
    const product = await Product.create(req.body)
    res.json({ product })
})

const PORT = 4000;
app.listen(PORT , () => console.log(`server is listening on port ${PORT}`))