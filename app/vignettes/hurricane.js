define(['jquery',
        'map',
        'controllers/layerStateControl',
        'controllers/stateControl',
        'helpers/layerHelpers',
        'helpers/videoHelpers',
        'helpers/pathAnimator'],

  function($, map, layerStateControl, stateControl, layerHelpers, videoHelpers, pathAnimator){

      var map = map.map,
          layers = layerStateControl.layers,
          $mapTab = stateControl.$mapTab,
          $hurricaneVideo = $("#hurricane-video"),
          videoUpdateHandler = videoHelpers.videoUpdateHandler,
          returnVideoString = videoHelpers.returnVideoString,
          videoEventPopup = videoHelpers.videoEventPopup,
          runAtTime = videoHelpers.runAtTime,
          $hurricaneContextVisual = $('#hurricane-context-visual'),
          $hurricaneContextText = $('hurricane-context-text'),
          $mainMapTopRight = stateControl.$mainMapTopRight,

      animateHurricane = function(){
        layers['westIndianPath'].addTo(map);
        pathAnimator.drawPath(layers['westIndianPath'], 
        layers['hurricaneLayer'], 5)
      },

      videoEventArray =  [

        videoSec0_0 = new videoUpdateHandler(function(){
          $hurricaneContextVisual.html('');
        }, 2),

        videoSec1_0 = new videoUpdateHandler(function() {
          map.setView(new L.LatLng(30.001, -90.409), 16);
          videoEventPopup.setLatLng([30.001, -90.405]);
          $hurricaneContextVisual.html('The Shell Oil Refinery in Norco, Louisiana.');
          videoEventPopup.setContent(returnVideoString('shell_at_the_tracks_v1'));
        }, 8),

        videoSec1_1 = new videoUpdateHandler(function() {
          videoEventPopup.openOn(map);
        }, 10),

        videoSec2_0 = new videoUpdateHandler(function(){
          map.setView(new L.LatLng(30.063, -90.386), 15);
          videoEventPopup.setLatLng([30.063, -90.383]);
          $hurricaneContextVisual.html('Interstate 10 at the Bonnet Carre Spillway.');
          videoEventPopup.setContent(returnVideoString('I-10_traffic_v1'));
        }, 27),

        videoSec3_0 = new videoUpdateHandler(function (){
          map.setView(new L.LatLng(30.005, -90.419), 15);
          videoEventPopup.setLatLng([30.005, -90.412]);
          $hurricaneContextVisual.html('The approach of Hurricane Isaac.');
          videoEventPopup.setContent(returnVideoString('dad_on_roof_v1'));
        }, 48),

        videoSec4_0 = new videoUpdateHandler(function(){
          $hurricaneContextVisual.html('');
          videoEventPopup._close();
          animateHurricane();
        }, 71),

        videoSec5_0 = new videoUpdateHandler(function(){
        }, 79),

        videoSec5_1 = new videoUpdateHandler(function(){
          map.setView(new L.LatLng(30.1077, -90.4268), 15);
          $hurricaneContextVisual.html('<img src="./assets/i/heroic_efforts_fail_v1.png" width="100%" style="padding:0px 10px 10px 10px;"><br><i>Baton Rouge State Times Advocate, October 3, 1915</span></i>');
          layers['frenierTitleLayer'].addTo(map);
        }, 91),

        videoSec6_0 = new videoUpdateHandler(function(){
          map.setView(new L.LatLng(30.1071921, -90.42773723), 18);
          map.removeLayer(layers['frenierTitleLayer']);
        }, 140),

        videoSec6_0 = new videoUpdateHandler(function(){
          map.setView(new L.LatLng(30.0842458, -90.4827117), 16);
          map.removeLayer(layers['frenierTitleLayer']);
          $hurricaneContextVisual.html('<div>' + returnVideoString('hurricane_isaac_course_v1') + 
            '<div>Hurricane Isaac (above) closely followed the course of the West Indian Hurricane of 1915, flooding the subdivisions of LaPlace.</div></div>' )
        }, 182),

        videoSec6_0 = new videoUpdateHandler(function(){
          map.setView(new L.LatLng(30.0562055, -90.371174), 16);
          map.removeLayer(layers['frenierTitleLayer']);
        }, 210),

        videoSec6_0 = new videoUpdateHandler(function(){
          map.setView(new L.LatLng(30.001, -90.405), 7);
        }, 230),

        videoSec6_0 = new videoUpdateHandler(function(){
          $hurricaneContextVisual.html('')
        }, 240)],

      initializeVideoEventArray = function(){
        console.log($hurricaneVideo);
        $("#hurricane-video").on('timeupdate', runAtTime(videoEventArray[0].handler, videoEventArray[0].time));
        $hurricaneVideo.on('timeupdate', runAtTime(videoEventArray[1].handler, videoEventArray[1].time));
        $hurricaneVideo.on('timeupdate', runAtTime(videoEventArray[2].handler, videoEventArray[2].time));
        $hurricaneVideo.on('timeupdate', runAtTime(videoEventArray[3].handler, videoEventArray[3].time));
        $hurricaneVideo.on('timeupdate', runAtTime(videoEventArray[4].handler, videoEventArray[4].time));
        $hurricaneVideo.on('timeupdate', runAtTime(videoEventArray[5].handler, videoEventArray[5].time));
        $hurricaneVideo.on('timeupdate', runAtTime(videoEventArray[6].handler, videoEventArray[6].time));
        $hurricaneVideo.on('timeupdate', runAtTime(videoEventArray[7].handler, videoEventArray[7].time));
        $hurricaneVideo.on('timeupdate', runAtTime(videoEventArray[8].handler, videoEventArray[8].time));
        $hurricaneVideo.on('timeupdate', runAtTime(videoEventArray[9].handler, videoEventArray[9].time));
        $hurricaneVideo.on('timeupdate', runAtTime(videoEventArray[10].handler, videoEventArray[10].time));
        $hurricaneVideo.on('timeupdate', runAtTime(videoEventArray[11].handler, videoEventArray[11].time));
        $hurricaneVideo.on('timeupdate', runAtTime(videoEventArray[12].handler, videoEventArray[12].time));
      },


      init = function(){

        stateControl.defaultState({
          'lat':30.0039,
          'lng':-90.4108, 
          'zoom':12
        });
        
        //I'm keeping the Hurricane content as static HTML as a temporary work around
        //in order to keep the event binders for the video working. Gonna refactor all the
        //video code soon.
        $('#map-tab-content-dynamic').html('');
        $('#hurricane.live-content').css('display', 'block');

        initializeVideoEventArray();
        
      }

    return {init: init,
            $hurricaneContextVisual: $hurricaneContextVisual,
            $hurricaneContextText: $hurricaneContextText
    };
  }
);


