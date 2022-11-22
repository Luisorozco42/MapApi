function loadMapScenario(){
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {

    });
}

function searchlocation(longitud, latitud)
{
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {});
    map.setView({
        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        center: new Microsoft.Maps.Location(longitud, latitud),
        zoom: 15   
    });

    Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
        var searchManager = new Microsoft.Maps.Search.SearchManager(map);
        var reverseGeocodeRequestOptions = {
            location: new Microsoft.Maps.Location(longitud, latitud),
            callback: function (answer, userData) {
                map.setView({ bounds: answer.bestView });

                    var center = new Microsoft.Maps.Location(longitud, latitud); /* Se capturan las coordenadas */
                    var pushpin = new Microsoft.Maps.Pushpin(center, { icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png' ,title: longitud + ', ' + latitud}); /*Se genera el punto */
                    var infobox = new Microsoft.Maps.Infobox(center, { title: answer.address.adminDistrict + ', ' + answer.address.district,
                    description: answer.address.formattedAddress, visible: false }); /*Se genera el cuadro de información y se pone en invisible, se agrega la informaci[on*/
                        infobox.setMap(map); /* Se ubica en el mapa */
                    Microsoft.Maps.Events.addHandler(pushpin, 'click', function () { /* Función click para hacer visible el cuadro de información*/
                        infobox.setOptions({ visible: true }); /* Se configura en visible */
                    });
                    map.entities.push(pushpin);
            }
        };
        searchManager.reverseGeocode(reverseGeocodeRequestOptions);
    });
}