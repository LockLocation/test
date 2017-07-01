$(document).ready(function(){
  loadApplication();
  buildMap();
});

var sw = document.body.clientWidth,
    bp = 550,
    $map = $('.map');
var staticMap = "https://maps.google.com/maps/api/staticmap?center=latitude1,longitude1&zoom=13&markers=latitude1,longitude1&size=300x400&sensor=true";
var embed =  '<iframe  frameborder="0" scrolling="no"  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCWDi3X7ymVD6q6KD_2FbHbRKrAjAVHBAk&q=latitude1,longitude1&zoom=15"></iframe>';
var linkToMap;

function buildMap() {
  if($('.static-img').length < 1) { //If static image doesn't exist
        buildStatic();
    }
};


function buildStatic() { //Build static map
   var mapLink = $('.map-link').attr('href'),
       $img = $('<img class="static-img" />').attr('src',staticMap);
   $('<a/>').attr('href',linkToMap).html($img).appendTo($map);
}

$(window).resize(function() {
  sw = document.body.clientWidth;
  buildMap();
  google.maps.event.trigger(map, "resize");
});

function loadApplication() {
   var url  = window.location.href;
     var longitude = getParams(url,"longitude");
     var latitude = getParams(url,"latitude");
     var operationSystem = getMobileOperatingSystem();

     //replace to requested location cordinates
     staticMap = staticMap.replace(/latitude1/g,latitude);
     staticMap=  staticMap.replace(/longitude1/g,longitude);
     embed = embed.replace(/latitude1/g,latitude);
     embed =  embed.replace(/longitude1/g,longitude);

     linkToMap = 'https://maps.google.com/?q=' + latitude + "," + longitude;
     var isAndroid = "Android" == operationSystem;
     var linkToWaze =  "waze://?ll=" + latitude + "," + longitude + "&navigate=yes" ;
     var linkToGoogleMap = "https://www.google.com/maps/dir/?api=1&q=" + latitude + "," + longitude;
     var linkGeneralMap = isAndroid ? "" : "" ;
     var linkToSaveLocatoin = isAndroid ? "" : "" ;

     var wazeRef = document.getElementById('wazeRef');
     var googleMapRef = document.getElementById('gmRef');
     var locklocationRef = document.getElementById('locklocationRef');

     wazeRef.onclick = function (){
       alert(linkToWaze);
     }
     googleMapRef.onclick = function (){
       alert(linkToGoogleMap);
     }

    if(isAndroid){
        var intentLoclLocation = "intent://scan?longitude=" +  longitude + "&latitude=" + latitude + "#Intent;scheme=locklocation;package=com.locklocation;end";
        locklocationRef.onclick = function (){
          alert(intentLoclLocation);
        }
    }
    else{
      locklocationRef.style.visibility = 'hidden';
    }

}


function getParams(url,param){
    var result ="null";
    var urlSplitArray = url.split("?");
    if( urlSplitArray.length > 0){
            var urlParamsArray = urlSplitArray[1].split("&");
            for (i = 0; i < urlParamsArray.length; i++) {
                var paramsEntry = urlParamsArray[i].split("=");
                if(param == paramsEntry[0]){
                        return paramsEntry[1];
                }

            }

    }
    return result;
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}


// function luanchIntent(intentString) {
//       var ifc = document.getElementById("ifc");
//       ifc.href = intentString;
//       document.getElementById("test").innerHTML = "luanchIntent";
//
//       ifc.click();
//
// }

// function luanchMaps() {
//   var operationSystem = getMobileOperatingSystem();
//     if("Android" == operationSystem){
//         var url  = window.location.href;
//         //getParams
//          var longitude = getParams(url,"longitude");
//          var latitude = getParams(url,"latitude");
//          var intentString = "intent://my_host#Intent;scheme=geo:" +  longitude + "," + latitude + "?z=11;action=android.intent.action.VIEW;end";
//
//          //luanch intent
//          luanchIntent(intentString);
//
//     }else{
//
//     }
// }

// function luanchApp() {
//  var url  = window.location.href;
//   var operationSystem = getMobileOperatingSystem();
//
//         //getParams
//          document.getElementById("test").innerHTML = "Android";
//          var url  = window.location.href;
//
//          var longitude = getParams(url,"longitude");
//          var latitude = getParams(url,"latitude");
//          var intentString = "intent://scan?longitude=" +  longitude + "&latitude=" + latitude + "#Intent;scheme=locklocation;package=com.locklocation;end";
//
//          document.getElementById("test").innerHTML = intentString;
//
//          //luanch intent
//          luanchIntent(intentString);
//
//
// }
