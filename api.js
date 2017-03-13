//Javascript
//fucking kill me
function stations() {

    $.get("ajax/stations.php")
        .done(function(data) {
            console.log("done");
            callSuccess(data);
        })
        .fail(function() {
            console.log('no dice: ' + errorCode);
            document.getElementById('result').innerHTML = 'Error: ' + errorCode;
        })
        .always(function() {
            console.log("complete");
        });

}

function callSuccess(data) {
    document.getElementById('result').innerHTML = 'Data retrieved successfully';

    for (var station of JSON.parse(data).stations.station) {
        var s = document.getElementById("select_station");
        var option = document.createElement("option");
        option.text = station.name;
        s.add(option);
    }

}

function getStation(){

var index = document.getElementById('select_station').selectedIndex;

var id = index;

var s='{"id":';
		s+=id;
		s+='}';

	 var js_objekt = JSON.parse(s);

    $.getJSON("ajax/station.php", js_objekt)
      .done(function(data) {
          console.log("done");
          callSuccessStation(data);
      })
      .fail(function() {
          console.log('no dice: ' + errorCode);
          document.getElementById('result').innerHTML = 'Error: ' + errorCode;
      })
      .always(function() {
          console.log("complete");
      });

}

function callSuccessStation(data){
  console.dir(data);
  if(data.station == null){
    document.getElementById('data').innerHTML = 'station = null';
  }else {
    document.getElementById('data').innerHTML = 'callSuccessStation: ' + data.station.name;  
  }
}
