var express = require('express');
var bodyParser = require('body-parser');
var  cors = require('cors');
var app = express();
var recipeController = require("./controller/recipeController");
var cookBookController = require("./controller/cookBookController");
var config = require("./package.json").config;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.use(function (req, res, next){
    console.log("["+req.ip+"] " + req.method + " " + req.path);
    next();
});

app.use("/cookbook", cookBookController);
app.use("/recipe", recipeController);

app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || config.express.port);
