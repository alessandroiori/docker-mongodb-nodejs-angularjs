var router = require("express").Router();
var cookBook = require("../model/cookBook"); //coockBook.js?

router.get("/", function (req, res){
    cookBook.getCookBooks(function (err, cookBooks){
       if (err) {
           return res.status(500).json({
               status: false,
               error: err
           });
       }
        
        res.json({
            status: true,
            cookBooks: cookBooks
        })
    });
});

router.post("/", function (req, res){
    cookBook.createCookBook(req.body, function (err, cb){
        if (err) res.json({status: false});
        else res.json({status: true, cookbook: cb})
    })
});

router.get("/:id", function (req, res){
    cookBook.getCookBookById(req.params.id, function (err, cookBook) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                status: false,
                error: err
            });
        }

        res.json({
            status: true,
            cookBook: cookBook
        })
    });
});

router.put("/:id", function (req, res){
    cookBook.updateCoookBook(req.params.id, req.body,function (err){ /* manca data ???*/
        res.json({
            status: err == null
        })
    })
});

router.delete("/:id", function (req, res){
    cookBook.deleteCookBook(req.params.id, function (err){
        res.json({
            status: err == null
        })
    })
});

router.get("/:id/recipe", function (req, res){
    cookBook.getRecipeForCookBook(req.params.id, function (err, recipes){
        if (err) res.json({status:false});
        else res.json({status:true, recipes:recipes})
    });
});

/**
 * Inserimento dentro il ricettario di una ricetta
 */
router.post("/:id/recipe/link", function (req, res){
    var recipeID = req.body.recipeID;
    var id = req.params.id;

    cookBook.linkRecipeForCookBook(id, recipeID, function (err){
        res.json({
            status: !err
        })
    })
});

/**
 * Rimozione di una ricetta dal ricettario
 */
router.post("/:id/recipe/unlink", function (req, res){
    var recipeID = req.body.recipeID;
    var id = req.params.id;

    cookBook.unlinkRecipeForCookBook(id, recipeID, function (err){
        res.json({
            status: err == null
        })
    })
});


module.exports = router;