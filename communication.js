var express=require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request=require('request');
var text0 ;
var text1;
var text2;

io.on('connection', function(socket)
      {
  		console.log('a user connected');
  		socket.on('disconnect', function() {});

		//sp.write(Buffer([0x02]))
  		socket.on('chat message', function(msg){
		setTimeout(read_hum, 100)
		setTimeout(read_temp, 100)
		setTimeout(read_light, 100)
		setTimeout(function () 
			   {
				var to_send = [text0, text1, text2];
				io.emit('chat message', { data: to_send});
				//console.log(to_send)
				}, 1500)
  		});
	});

function read_hum()
	{
		request.get("https://us.wio.seeed.io/v1/node/GroveTempHumD0/humidity?access_token=**************",function(err,res,body){
	 	var value = JSON.parse(body).humidity
	 	console.log(value);
		 //text0 = "The humidity level is " + value.toString() ;
		 text0 = value
		return text0 ;
  		//return body["humidity"];
	});

}

function read_temp()
	{
		request.get("https://us.wio.seeed.io/v1/node/GroveTempHumD0/temperature_f?access_token=**********",function(err,res,body){
 		var value = JSON.parse(body).fahrenheit_degree
  		console.log(value);
		//text1 = "The temperature level is " + value.toString() ;
		text1 = value;
		return text1 ;

   		 //return body["fahrenheit_degree"];
	});

}

function read_light()
	{
		request.get("https://us.wio.seeed.io/v1/node/GroveLuminanceA0/luminance?access_token=********",function(err,res,body){
		var value = JSON.parse(body).lux
  		console.log(value)
		//text2 = "The light level is " + value.toString() ;
		text2 = value;
    		//return body["lux"]
		return text2 ;

	});
}


app.use(express.static('src'));

app.get('/', function(req, res)
	{
    		res.sendFile('index.html' , { root : __dirname});
	});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
