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
//foreach. json object, adds station.name into select: obj,obj,array,obj
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

  if(data.station == null){
    document.getElementById('data').innerHTML = 'station = null';
    tableDelete();
  }else {
    document.getElementById('data').innerHTML = 'callSuccessStation: ' + data.station.name;
    tableCreate(data);
    //obj,obj,obj,array,obj
    //for (var transfer of data.station.transfers.transfer){
    //var s = document.getElementById('data2').innerHTML = transfer.arrival;
    //console.log(s);
  //}
}
}

function tableCreate(data) {
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    var tbdy = document.createElement('tbody');
    //table head list, don't know where if it will work
    var list = ["Ankomst","Tågnummer", "Origin", "Destination", "Departure"];

    list.forEach( function(item){
        var i = item;
        var tr = document.createElement('tr');
        var th = document.createElement('th');

        tr.appendChild(document.createTextNode(item));
        th.appendChild(tr);
        tbdy.appendChild(th);
        console.log(item);
    });

    //loops foreach
    for (var transfer of data.station.transfers.transfer) {
                var td = document.createElement('td');
                //this makes it so i don't have to wonder what 0000-00-00 00:00:00 is
                if(transfer.arrival == '0000-00-00 00:00:00'){
                  td.appendChild(document.createTextNode(''));
                }else{
                  td.appendChild(document.createTextNode(transfer.arrival + ' '));
                  td.appendChild(document.createTextNode(transfer.train + ' '));
                  td.appendChild(document.createTextNode(transfer.origin + ' '));
                  td.appendChild(document.createTextNode(transfer.destination + ' '));
                  if(transfer.newDeparture == null){
                  td.appendChild(document.createTextNode(transfer.departure));
                } else{
                  td.appendChild(document.createTextNode(transfer.newDeparture));
                }
                }

                //somehow works when i put tr here
                //<tr>
                //<td>transfer.arrival</td>
                //</tr>
                var tr = document.createElement('tr');
                tr.appendChild(td)
                tbdy.appendChild(tr);
                console.log(tr);
            }
    tbl.appendChild(tbdy);
    document.getElementById('data').appendChild(tbl);

}

function tableDelete(){
    document.getElementById('data') = "";
}
