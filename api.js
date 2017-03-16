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
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    //sets property id for the element 'table'
    tbl.id = "table"
    tbl.style.width = '100%';
    var tbdy = document.createElement('tbody');
    //loops foreach
    for (var transfer of data.station.transfers.transfer) {
        var tr = document.createElement('tr');
                var td = document.createElement('td');
                //this makes it so i don't have to wonder what 0000-00-00 00:00:00 is
                if(transfer.arrival == '0000-00-00 00:00:00'){
                  td.appendChild(document.createTextNode('Finns inte'))
                }else{
                  td.appendChild(document.createTextNode(transfer.arrival))
                }
                //still need to know what the fuck this is
                tr.appendChild(td)
                tbdy.appendChild(tr);
            }
    //and this
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
}

function tableDelete(){

}
