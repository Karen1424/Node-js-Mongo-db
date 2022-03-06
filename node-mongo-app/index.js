const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const todoRouts = require("./routes/todos");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();
const hbs = exphbs.create({
    defaultLayout : "main",
    extname : "hbs"
})

app.engine("hbs",hbs.engine);
app.set("view engine","hbs");
app.set("views","views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.use(todoRouts);



async function start () {
    try {
        await mongoose.connect('mongodb+srv://Karen:kargrmika1111.@cluster0.w8oyg.mongodb.net/my-first-project', {
            useNewUrlParser : true
        })
        app.listen(PORT, () => {
            console.log("server has been started!...");
        })
    }catch(e) {
        console.error("Error a",e);
    }
}

start();


