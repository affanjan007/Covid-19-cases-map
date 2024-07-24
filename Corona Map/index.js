function UpdMap() {
    fetch("/data.json")
        .then(response => response.json())
        .then(rsp => {
            console.log(rsp.data);
            rsp.data.forEach(element => {
                var latitude = element.Latitude;
                var longitude = element.Longitude;
                var totalDeaths = element.TotalDeaths;

                
                var markerColor;
                if (totalDeaths >= 0 && totalDeaths < 1000) {
                    markerColor = "pink";
                } else if (totalDeaths >= 1000 && totalDeaths < 3000) {
                    markerColor = "coral";
                } else if (totalDeaths >= 3000 && totalDeaths < 5000) {
                    markerColor = "darkred";
                } else if (totalDeaths >= 5000) {
                    markerColor = "red";
                } else {
                    markerColor = "white"; 
                }

                L.circleMarker([latitude, longitude], {
                    radius: 13,
                    fillColor: markerColor,
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                }).addTo(map)
                .bindPopup(`<b>${element.Country}</b><br>Confirmed: ${element.TotalConfirmed}<br>Deaths: ${element.TotalDeaths}<br>Recovered: ${element.TotalRecovered}`)
                .openPopup();
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

UpdMap();
