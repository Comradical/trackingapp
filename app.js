var express         = require('express'),
    app             = express();


app.get('/', function(req, res){
  res.send("You've made it!");
});


var PORT = process.env.PORT | 3000,
    IP   = process.env.IP | 'localhost';



app.listen(PORT, IP, function(){
    console.log("RoaringZoo App Has Started!");
});
