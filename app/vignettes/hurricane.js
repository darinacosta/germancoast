define(['jquery',
        'map',
        'controllers/layerStateControl',
        'helpers/stateControl',
        'text!assets/html/hurricane.html',
        'helpers/layerHelpers',
        'helpers/videoHelpers',
        'helpers/pathAnimator'],

  function($, map, layerStateControl, stateControl, hurricaneHtml, layerHelpers, videoHelpers, pathAnimator){

      var map = map.map,
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
        layerStateControl.westIndianPath.addTo(map);
        pathAnimator.drawPath(layerStateControl.westIndianPath, 
        layerStateControl.hurricaneLayer, 5)
      },

      videoEventArray =  [

        videoSec0_0 = new videoUpdateHandler(function(){
          
        }, 5),

        videoSec1_0 = new videoUpdateHandler(function() {
          map.setView(new L.LatLng(30.001, -90.409), 16);
          videoEventPopup.setLatLng([30.001, -90.405]);
          videoEventPopup.setContent(returnVideoString('shell_at_the_tracks_v1'));
          //populatehurricanelRight(1,'I-10_traffic_v1', 'Bonnet Carre Spillway @ I10');
        }, 8),

        videoSec1_1 = new videoUpdateHandler(function() {
          videoEventPopup.openOn(map);
        }, 10),

        videoSec2_0 = new videoUpdateHandler(function(){
          map.setView(new L.LatLng(30.063, -90.386), 15);
          videoEventPopup.setLatLng([30.063, -90.383]);
          videoEventPopup.setContent(returnVideoString('I-10_traffic_v1'));
          //populatehurricanelRight(2,'dad_on_roof_v1', 'Norco during the approach of Hurricane Isaac');
        }, 27),

        videoSec3_0 = new videoUpdateHandler(function (){
          map.setView(new L.LatLng(30.005, -90.419), 15);
          videoEventPopup.setLatLng([30.005, -90.412]);
          videoEventPopup.setContent(returnVideoString('dad_on_roof_v1'));
          //populatehurricanelImageRight(1, '<img src="i/property_loss_grows_with_reports_v1.png" height="100%" style="padding-top:10px;">', 'Baton Rouge State Times Advocate, October 2, 1915');
        }, 48),

        videoSec4_0 = new videoUpdateHandler(function(){
          videoEventPopup._close();
          animateHurricane();
        }, 71),

        videoSec5_0 = new videoUpdateHandler(function(){
          console.log('hurricane top right');
          //$mainMapTopRight.html('<div id="top-right-video" style="max-width: 350px;"><div style="margin-top: 37px;border: 1px solid rgb(90, 90, 90);overflow: hidden;width: 350px;height:190px;">' + returnVideoString('hurricane_isaac_course_v1') + '</div><div>Hurricane Isaac (above) closely followed the course of the West Indian Hurricane of 1915 (map display)</div></div>' );
        }, 79),

        videoSec5_1 = new videoUpdateHandler(function(){
          map.setView(new L.LatLng(30.1077, -90.4268), 15);
          //$mainMapTopRight.html('');
          $hurricaneContextVisual.html('<img src="./assets/i/heroic_efforts_fail_v1.png" width="100%" style="padding:60px 10px 0 10px;"><br><i>Baton Rouge State Times Advocate, October 3, 1915</span></i>');
          layerStateControl.frenierTitleLayer.addTo(map);
        }, 91),

        videoSec6_0 = new videoUpdateHandler(function(){
          //map.centerAndZoom([-90.412, 30.005 ], 8);
          //populatehurricanelRight(2, 'burning_cane_v1', ' ');
        }, 107)],

      activateVideoEventArray = function(){
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

        activateVideoEventArray();
        
      }

    return {init: init,
            $hurricaneContextVisual: $hurricaneContextVisual,
            $hurricaneContextText: $hurricaneContextText
    };
  }
);


