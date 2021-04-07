var express = require("express");
var app = express();
const request = require("request")
app.set("view engine", 'ejs');
app.use(express.static("public"));
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){
	res.render("weather", {weather: null, error: null})
})
app.post("/", function(req,res){
	let city =req.body.city
	console.log(city)
	let apikey = "ab5ab456b1a3c5a4c6689d56e666009e"

	url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+apikey
	console.log(url)
	request(url, function(err,respond,body){
		if (err) {
			data="Nepodarilo sa nacitat stranku"
			res.render("weather", {weather:null, error:data})
			
		}else{
			console.log(1)
			let weather = JSON.parse(body)
			console.log(weather)
			if(weather.main == undefined){
    				res.render('weather', {weather: null, error: 'Error, please try again'});
			}else{
				let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
				res.render("weather", {weather:weatherText, error:null})
			}
			
		}
		
	})
})
var server = app.listen(8080,"127.0.0.1", function(){
	var host = server.address().address
        var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
	
})


