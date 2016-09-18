function UpdateWeather()
{
	
	//Check if Geolocation is supported
	if (navigator.geolocation)
	{
	    navigator.geolocation.getCurrentPosition(successFunction);
	}
	
	//Get latitude and longitude;
	function successFunction(position) {
	    var latitude = position.coords.latitude;
	    var longitude = position.coords.longitude;
	    $.ajax({
			url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&sensor=true",
			type: "get",
			datatype: 'json',
			success: function(data)
			{
				var address=data.results[0].formatted_address;
				getWeather(address);
			}
		})
	}
	
	//Get and display weather
	function getWeather(address)
	{
		$.ajax({
			url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text='"+address+"')&format=json",
			type: "get",
			datatype: 'json',
			success: function(data)
			{
				var currentTemperature=data.query.results.channel.item.condition.temp;
				var currentDescription=data.query.results.channel.item.condition.text;
				var location=data.query.results.channel.location.city;
				var region=data.query.results.channel.location.region;
				
					var color="";
					switch(true)
					{
						case (currentTemperature>98): color='red darken-4'; break;
						case (currentTemperature>96): color='red darken-3'; break;
						case (currentTemperature>94): color='red darken-2'; break;
						case (currentTemperature>92): color='red darken-1'; break;
						case (currentTemperature>90): color='red'; break;
						case (currentTemperature>88): color='orange darken-4'; break;
						case (currentTemperature>86): color='orange darken-3'; break;
						case (currentTemperature>84): color='orange darken-2'; break;
						case (currentTemperature>82): color='orange darken-1'; break;
						case (currentTemperature>80): color='orange'; break;
						case (currentTemperature>78): color='amber darken-4'; break;
						case (currentTemperature>76): color='amber darken-3'; break;
						case (currentTemperature>74): color='amber darken-2'; break;
						case (currentTemperature>72): color='amber darken-1'; break;
						case (currentTemperature>70): color='amber'; break;
						case (currentTemperature>68): color='green darken-4'; break;
						case (currentTemperature>66): color='green darken-3'; break;
						case (currentTemperature>64): color='green darken-2'; break;
						case (currentTemperature>62): color='green darken-1'; break;
						case (currentTemperature>60): color='green'; break;
						case (currentTemperature>58): color='teal darken-4'; break;
						case (currentTemperature>56): color='teal darken-3'; break;
						case (currentTemperature>54): color='teal darken-2'; break;
						case (currentTemperature>52): color='teal darken-1'; break;
						case (currentTemperature>50): color='teal'; break;
						case (currentTemperature>48): color='light-blue darken-4'; break;
						case (currentTemperature>46): color='light-blue darken-3'; break;
						case (currentTemperature>44): color='light-blue darken-2'; break;
						case (currentTemperature>42): color='light-blue darken-1'; break;
						case (currentTemperature>40): color='light-blue'; break;
						case (currentTemperature>38): color='blue darken-4'; break;
						case (currentTemperature>36): color='blue darken-3'; break;
						case (currentTemperature>34): color='blue darken-2'; break;
						case (currentTemperature>32): color='blue darken-1';
						case (currentTemperature>30): color='blue'; break;
					}
				
				$('#header').empty();
				$('#header').append("<div class='center-align'><h5 class='truncate'>"+location+"</h5><h6 class='truncate'>"+currentDescription+" - "+currentTemperature+"&deg</h6></div>");
				$('#weather').empty();
				for (i = 0; i < data.query.results.channel.item.forecast.length; i++)
				{
					var day=data.query.results.channel.item.forecast[i].day;
					var high=data.query.results.channel.item.forecast[i].high;
					var low=data.query.results.channel.item.forecast[i].low;
					var description=data.query.results.channel.item.forecast[i].text;
					
					switch(day)
					{
						case "Sun": day="Sunday"; break;
						case "Mon": day="Monday"; break;
						case "Tue": day="Tuesday"; break;
						case "Wed": day="Wednesday"; break;
						case "Thu": day="Thursday"; break;
						case "Fri": day="Friday"; break;
						case "Sat": day="Saturday"; break;
					}
					$('#weather').append("<div class='preview'><table><tr><td width='80%'><h5 class='blue-grey-text text-darken-4 bold'>"+day+"</h5><h6 class='blue-grey-text bold'>"+description+"</h6></td><td width='10%' class='right-align'><h6 class='blue-grey-text text-darken-2 bold'>"+high+"</h6></td><td width='10%' class='right-align'><h6 class='blue-grey-text text-darken-2 bold'>"+low+"</h6></td></tr></table></div>");
					
				}  
			}
		})
	}
}

function fn60sec() {
	UpdateWeather();
}
fn60sec();
setInterval(fn60sec, 900000);