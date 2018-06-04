

var express = require("express");
var app = express();
var port = 8080;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/humo_db");
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});











// var express = require('express'), db = require('./Utils/db'),
// app = express();
 

// var ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';



// // app is running!
// app.get('/', function(req, res) {
//     res.send('Hello from NodeJS  at '+ new Date());
// });



// app.listen(8080, ip);



// module.exports = app;