var GoogleMapsAPI = require('googlemaps');
var GEOLOCATION_URL = "https://maps.googleapis.com/maps/api/geocode/json?address={1}&key=AIzaSyAPGO_O7wsbupOtL6i1mEOGxfjhueuU5M4"

var publicConfig = {
  key: 'AIzaSyAPGO_O7wsbupOtL6i1mEOGxfjhueuU5M4',
  stagger_time:       1000,
  encode_polylines:   false,
  secure:             true,
};

var gmAPI = new GoogleMapsAPI(publicConfig);
var getBoundsZoomLevel = function (bounds, mapDim) {
    var WORLD_DIM = { height: 256, width: 256 };
    var ZOOM_MAX = 21;

    function latRad(lat) {
        var sin = Math.sin(lat * Math.PI / 180);
        var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx, worldPx, fraction) {
        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }

    var ne = bounds.northeast;
    var sw = bounds.southwest;

    var latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI;

    var lngDiff = ne.lng - sw.lng;
    var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

    var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
    var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
};

var get_geocode = function(location_txt, callback){
	var geocodeParams = {
	  "address":    location_txt,
	  "language":   "en",
	}
	gmAPI.geocode(geocodeParams, function(err, result){
	  callback(result.results[0].geometry.location, result.results[0].geometry.bounds);
	});
}

this.get_map_image = function(location_txt, callback){
	var params = {
	  size: '500x400',
	  maptype: 'roadmap'
	};
	get_geocode(location_txt, function(location, bounds){
		params["center"] = location.lat + ","+location.lng
        if(bounds == undefined || bounds == {}){
            console.log(err)
            callback("")
        }
        else{
            params["zoom"] = getBoundsZoomLevel(bounds, {height: 500, width: 400})
            callback(gmAPI.staticMap(params))
        }
	})
}