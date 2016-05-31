var CookBook = require("./model").CookBook;
var support = require("./model").support;

module.exports  = {
    getCookBookById: function (id, cb){
        CookBook
            .findOne({
                _id: id
            }) 
            .populate("owner")
            .populate("recipes")
            .exec(cb);
    },
    getCookBooks: function (cb){
        CookBook.find()
                .populate("owner")
                .populate("recipes")
                .exec(cb);
    },
    createCookBook: function (data,cb){
        if (typeof  data.name !== "undefined" ||
            typeof data.description !== "undefined" ||
            typeof data.owner !== "undefined"){

            var cookBook = new CookBook(data);
            cookBook.save(function (err){
                cb (err, (err)?null:cookBook);
            })

        }else
            cb(true, null);
    },
    updateCoookBook: function (id, data, cb){
        if (typeof  data.name !== "undefined" ||
            typeof data.description !== "undefined" ||
            typeof data.owner !== "undefined"){

            CookBook.where({
                _id: id
            }).findOne(function (err, cookBook){
                if (err) cb(err, null);
                else if (cookBook == null) cb(true, null);
                else cookBook.update(data, cb);
            })

        }else
            cb(true, null);
    },
    deleteCookBook: function (id, cb){
        CookBook.where({
            _id: id
        }).findOne(function (err, cookBook){
            if (err || cookBook == null) cb(err, null);
            else cookBook.remove(cb);
        })

    },
    getRecipeForCookBook: function (id, cb){
        this.getCookBookById(id, function (err, cookBook){
            if (err) cb(err, null)
            else cb(null, cookBook.recipes);
        });
    },
    linkRecipeForCookBook: function (id, id_recipe, cb) {
        CookBook.update({
            _id: support.toObjctedId(id)
        },{
            $addToSet: {
                recipes: support.toObjctedId(id_recipe)
            }
        }, function (err, r){
            cb((typeof r != "undefined" && r.nModified == 0) || err != null);
        });
    },
    unlinkRecipeForCookBook: function (id, id_recipe, cb){
        CookBook.findByIdAndUpdate(id, {
            $pull:{
                "recipes": support.toObjctedId(id_recipe)
            }
        }, cb);
    }
};