function getWeather()
{
	$.ajax({
		url: "http://forecast.weather.gov/MapClick.php?lat=38.4247341&lon=-86.9624086&FcstType=json",
		type: "get",
		datatype: 'json',
		success: function(data)
		{
			for (i = 0; i < data.data.temperature.length; i++)
			{
				var location=data.productionCenter;
				var time=data.time.startPeriodName[i];
				var description=data.data.weather[i];
				var label=data.time.tempLabel[i];
				var temperatureHigh=data.data.temperature[i];
				if(time=="Monday" || time=="Tuesday" || time=="Wednesday" || time=="Thursday" || time=="Friday" || time=="Saturday" || time=="Sunday")
				{
					var x=i+1; var temperatureLow=data.data.temperature[x]; if(temperatureLow==undefined){ temperatureLow="-"; }
					var color="";
					switch(true)
					{
						case (temperatureHigh>98): color='red darken-4'; break;
						case (temperatureHigh>96): color='red darken-3'; break;
						case (temperatureHigh>94): color='red darken-2'; break;
						case (temperatureHigh>92): color='red darken-1'; break;
						case (temperatureHigh>90): color='red'; break;
						case (temperatureHigh>88): color='orange darken-4'; break;
						case (temperatureHigh>86): color='orange darken-3'; break;
						case (temperatureHigh>84): color='orange darken-2'; break;
						case (temperatureHigh>82): color='orange darken-1'; break;
						case (temperatureHigh>80): color='orange'; break;
						case (temperatureHigh>78): color='amber darken-4'; break;
						case (temperatureHigh>76): color='amber darken-3'; break;
						case (temperatureHigh>74): color='amber darken-2'; break;
						case (temperatureHigh>72): color='amber darken-1'; break;
						case (temperatureHigh>70): color='amber'; break;
						case (temperatureHigh>68): color='green darken-4'; break;
						case (temperatureHigh>66): color='green darken-3'; break;
						case (temperatureHigh>64): color='green darken-2'; break;
						case (temperatureHigh>62): color='green darken-1'; break;
						case (temperatureHigh>60): color='green'; break;
						case (temperatureHigh>58): color='teal darken-4'; break;
						case (temperatureHigh>56): color='teal darken-3'; break;
						case (temperatureHigh>54): color='teal darken-2'; break;
						case (temperatureHigh>52): color='teal darken-1'; break;
						case (temperatureHigh>50): color='teal'; break;
						case (temperatureHigh>48): color='light-blue darken-4'; break;
						case (temperatureHigh>46): color='light-blue darken-3'; break;
						case (temperatureHigh>44): color='light-blue darken-2'; break;
						case (temperatureHigh>42): color='light-blue darken-1'; break;
						case (temperatureHigh>40): color='light-blue'; break;
						case (temperatureHigh>38): color='blue darken-4'; break;
						case (temperatureHigh>36): color='blue darken-3'; break;
						case (temperatureHigh>34): color='blue darken-2'; break;
						case (temperatureHigh>32): color='blue darken-1';
						case (temperatureHigh>30): color='blue'; break;
					}
					$('#weather').append("<div class='preview "+color+"'><table><tr><td width='80%'><h5 class='white-text'>"+time+"</h5></td><td width='10%' class='right-align'><p class='white-text'>"+temperatureHigh+"</p></td><td width='10%' class='right-align'><p class='white-text'>"+temperatureLow+"</p></td></tr></table></div>");
				}
			}  
		}
	})
}