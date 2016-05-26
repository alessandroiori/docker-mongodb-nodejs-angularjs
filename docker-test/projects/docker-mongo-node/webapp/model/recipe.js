var Recipe = require("./model").Recipe;

module.exports = {
    getRecipeById: function (id, r) {
        Recipe
            .findOne({
                _id: id
            })
            .exec(r);
    },
    getRecipes: function (rs) {
        Recipe
            .find()
            .exec(rs);
    },
    createRecipe: function (data, cb) {
        if (typeof data.name !== "undefined" &&
            typeof data.description !== "undefined" &&
            typeof data.tag !== "undefined" &&
            typeof data.ingredients !== "undefined" &&
            typeof data.steps !== "undefined" &&
            typeof data.difficulty !== "undefined" &&
            typeof data.cost !== "undefined" &&
            typeof data.timeOfSteps !== "undefined") {
            var recipe = new Recipe(data)
            recipe.save( function (err, r) {
                cb(err, (err)?null:r);
            })
        } else {
            cb(true, null);
        }
    },
    updateRecipe: function (id, data, r) {
        /* Recipe.findOneAndUpdate*/

        if (typeof data.name !== "undefined" ||
            typeof data.description !== "undefined" ||
            typeof data.tag !== "undefined" ||
            typeof data.ingredients !== "undefined" ||
            typeof data.steps !== "undefined" ||
            typeof data.difficulty !== "undefined" ||
            typeof data.cost !== "undefined" ||
            typeof data.timeOfSteps !== "undefined") {

            Recipe.where({
                _id : id
            }).findOne(function (err, recipe){
                if (err || recipe == null) r (err, null);
                else recipe.update(data, r);
            })
        } else {
            r(true, null);
        }
    },
    deleteRecipe: function (id, r) {
        // Recipe.find({ _id: id }).remove().exec();
        Recipe.where({
            _id: id
        }).findOne(function (err, recipe) {
            if (err || recipe == null) r (err, null);
            else recipe.remove(r);
        })
    },
};