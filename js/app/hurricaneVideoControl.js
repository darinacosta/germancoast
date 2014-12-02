define(['app/hurricane',
        'app/layerControl'],

  function(hurricane, layerControl){

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
        //map.centerAndZoom([-90.4108, 30.0039], 13);
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