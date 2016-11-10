var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"));
app.listen(1111, function () {
	console.log("listen:1111");
});