var app = require('express')(); // Express App include
var bodyParser = require("body-parser"); // Body parser for fetch posted data

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data

app.get('/', (req, res) => {
    res.send('Probando si funciona esta cosa\n');
  });

app.listen(3000, function(){
    console.log('Connected & Listen to port 3000');
});
