var mongoose = require('mongoose');
var config = require("../package.json").config;

// var con = true;

// while(con){
//     try{
//         mongoose.connect(config.mongoose);    
//         con = false;
//     }catch(e){
//         con = true;
//         console.err("ERROR: connessione db");
//     }
// }



// var MongoDB = mongoose.connect(config.mongoose).connection; 
// MongoDB.on('error', function(err) { console.log(err.message); });
// MongoDB.once('open', function() {
//   console.log("mongodb connection open");
// });


var MONGO_DB;
var DOCKER_DB = process.env.DB_PORT;
if ( DOCKER_DB ) {
  MONGO_DB = DOCKER_DB.replace( 'tcp', 'mongodb' ) + '/webapp';
} else {
  MONGO_DB = process.env.MONGODB;
}
var retry = 0;
var MongoDB = mongoose.connect(MONGO_DB).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});


var recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    tag: [{
        type: String
    }],
    ingredients: [{
        name: String,
        quantity: String,
        /*
        quantity: [{
            value: Number,
            unit_of_value: String,
        }],
        */
    }],
    steps: [{
        type: String
    }],
    difficulty: Number,
    cost: Number,
    timeOfSteps: Number,
    numberOfPeople: Number,
    dataCreation: {
        type: Date,
        default: Date.now
    },
});

var userSchema = new mongoose.Schema({
   name: String
});

var cookBookSchema = new mongoose.Schema({
    name: String,
    description: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    recipes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }],
});

module.exports = {
    User: mongoose.model("User", userSchema),
    Recipe: mongoose.model("Recipe", recipeSchema),
    CookBook: mongoose.model("CookBook", cookBookSchema), //CookBook?
    support: {
        toObjctedId: function (id){
            return mongoose.Types.ObjectId(id);
        }
    }
}