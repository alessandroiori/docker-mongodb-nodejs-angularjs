var router = require("express").Router();
var recipe = require("../model/recipe"); // recipe.js?

router.get("/", function (req, res) {
    recipe.getRecipes(function (err, r) {
        if (err) {
            return res.status(500).json({
                status: false,
                error: err,
            });
        }
        res.json({
            status: true,
            recipes: r,
        })
    });
});

router.post("/", function (req, res) {
    // Add recipe
    recipe.createRecipe(req.body, function (err, r) {
        if (err) res.json({status: false});
        else res.json({
                status: true,
                "recipe": r
            });
    })
});

router.get("/:id", function (req, res) {
    recipe.getRecipeById(req.params.id, function (err, r) {
        if (err) {
            return res.status(500).json({
                status: false,
                error: err,
            });
        }
        res.json({
            status: true,
            recipe: r,
        });
    });
});

router.put("/:id", function (req, res) {
    // Update recipe
    recipe.updateRecipe(req.params.id, req.body, function (err, r) {
        if (err) {
            return res.status(500).json({
                status: false,
                error: err,
            });
        }
        res.json({
            status: true,
            recipe: r,
        });
    });
});

router.delete("/:id", function (req, res) {
    recipe.deleteRecipe(req.params.id, function (err, r) {
        if (err) {
            return res.status(500).json({
                status: false,
                error: err,
            });
        }
        res.json({
            status: true,
            recipe: r,
        });
        
    });
});

module.exports = router;