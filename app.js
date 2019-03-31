//Require modules and models

var express = require("express");
var models = require("./models/index");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();

//Set view engine

app.set("view engine", "ejs");

//Middleware

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(methodOverride("_method"));

app.get("/", function(req, res) {
    res.redirect(301, "/chirps");
});

//Get all chirps
app.get("/chirps", function(req, res) {
    // Step 1: Retrieve all chirps from the database
    // Step 2: Generate HTML from the chirp dataset
    // Step 3: Send back the completed HTML to the browser
    models.Chirp.findAll().then(function(chirps) {
        res.render("index", { chirps });
    });
    // Visit your site at: http://localhost:3000/chirps
});

//Create new chirp
app.post("/chirps", function(req, res) {
    // Step 1: Retrieve new chirp from form submission
    // Step 2: Store new chirp in the database
    // Step 3: Redirect back to show all chirps page
    var newChirp = req.body;

    models.Chirp.create(newChirp).then(function() {
        res.redirect("/chirps");
    });
});

//Get specific chirp
app.get("/chirps/:id/edit", function(req, res) {
    // Step 1: Retrieve specific chirp from the database via its ID
    // Step 2: Generate HTML based on chirp dataset
    // Step 3: Send back completed HTML to the browser
    var chirpId = req.params.id;

    models.Chirp.findById(chirpId).then(function(chirp) {
        res.render("edit", { chirp });
    });
});

//Edit a chirp
app.put("/chirps/:id", function(req, res) {
    // Step 1: Retrieve updated chirp text from form submission
    // Step 2: Retrieve specific chirp from the database via its ID
    // Step 3: Update the chirp with new text
    // Step 4: Redirect back to show all chirps page
    var updatedChirpText = req.body;
    var chirpId = req.params.id;

    models.Chirp.findById(chirpId).then(function(chirp) {
        chirp.updateAttributes(updatedChirpText).then(function() {
            res.redirect("/chirps");
        });
    });
});

//Delete a chirp
// Hint: Method to delete a chirp is .destroy() (nothing in the parentheses)
app.delete("/chirps/:id", function(req, res) {
    // Step 1: Retrieve specific chirp from database via its ID
    // Step 2: Destroy that chirp
    // Step 3: Redirect user back to show all chirps page
    var chirpId = req.params.id;

    models.Chirp.findById(chirpId).then(function(chirp) {
        chirp.destroy().then(function() {
            res.redirect("/chirps");
        });
    });
});

app.listen(process.env.PORT || 3000);
