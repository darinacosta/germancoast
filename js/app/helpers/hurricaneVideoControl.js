define(['app/vignettes/hurricane',
        'app/helpers/layerControl'],

  function(hurricane, layerControl){

    var $hurricaneVideo = $("#hurricane-video"),
        hurricaneVideoStatus = 'paused',
        hurricaneVolumeBar = document.getElementById("hurricane-volume-bar"),
        $playButton = $('#hurricane-play'),
        $hurricaneContextVisual = hurricane.$hurricaneContextVisual,
        $hurricaneContextText = hurricane.$hurricaneContextText,

    hurricaneControls = function(){
      $('a.newpage').on("click", function(){
        $playButton.html('<span class="glyphicon glyphicon-play"></span>');
        $hurricaneVideo.get(0).pause();
        hurricaneVideoStatus='paused';
      });

      $('#hurricane-video, #hurricane-play').on("click", function(){
        if (hurricaneVideoStatus=='paused'){
          $hurricaneVideo.get(0).play();
          hurricaneVideoStatus='playing';
          $playButton.html('<span class="glyphicon glyphicon-pause"></span>');
        }else if (hurricaneVideoStatus=='playing'){
          $playButton.html('<span class="glyphicon glyphicon-play"></span>');
          $hurricaneVideo.get(0).pause();
          hurricaneVideoStatus='paused';
        }
      });

      $('#hurricane-replay').on("click", function(){
        $mainMapTopRight.html('');
        $hurricaneContextVisual.html('');
        $hurricaneVideo.get(0).currentTime = '0';
        hurricane.init();
        layerControl.hideAllLayers();
        $hurricaneVideo.get(0).play();
        map.setView(new L.LatLng(30.0039, -90.4108), 13);
        if (hurricaneVideoStatus=='paused'){
          $playButton.html('<span class="glyphicon glyphicon-play"></span>');
        }else if (hurricaneVideoStatus=='playing'){
          $playButton.html('<span class="glyphicon glyphicon-pause"></span>');
        }
      });

      hurricaneVolumeBar.addEventListener("change", function() {
        $hurricaneVideo.get(0).volume = hurricaneVolumeBar.value;
      }, false);
    }

    return hurricaneControls();
  }
);