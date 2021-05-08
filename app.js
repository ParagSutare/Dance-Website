const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/ContactDance', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 8000;

// define mongo schema
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    adress: String,
    desc: String,
});
const Contact = mongoose.model('Contact', ContactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));// for serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');// set the template engine as pug
app.set('views', path.join(__dirname, 'views'))// set the view dierctory:

// ENDPOINTS
app.get("/", (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);

})
app.get("/services", (req, res) => {
    const params = {}
    res.status(200).render('services.pug', params);

})
app.get("/contact", (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);

})
app.get("/about", (req, res) => {
    const params = {}
    res.status(200).render('about.pug', params);

})
app.get("/classinfo", (req, res) => {
    const params = {}
    res.status(200).render('classinfo.pug', params);

})
app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("Item not save to the database")
    })

})


// function myFunction(x) {
//     if (x.matches) { // If media query matches
//         style =  "../static/phone.css";
//     } else {
//         style = "../static/style.css";
//     }
// }
// myFunction (port, (x = "max-width: 1364px") =>{
//     x = addEventListener(myFunction)
// })


// START THE SERVER
app.listen(port, () => {
    console.log(`The application started suceesfully on port ${port}`)
})