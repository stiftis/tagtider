//Javascript
//fucking kill me

var departure = true;

//Success or no
function stations() {

    $.getJSON("ajax/stations.php")
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
    //foreach. json object, lägger till station.name i select: obj,obj,array,obj
    for (var station of data.stations.station) {
        var s = document.getElementById("select_station");
        var option = document.createElement("option");
        option.text = station.name;
        s.add(option);
    }

}

//Retrieves all of the train data
function getStation() {

    var index = document.getElementById('select_station').selectedIndex;

    var id = index;

    var s = '{"id":';
    s += id;
    s += '}';

    var js_object = JSON.parse(s);

        if(departure == true){
        $.getJSON("ajax/departures.php", js_object)
        .done(function(data) {
            console.log("done");
            getInfo1(data);
        })
        .fail(function() {
            console.log('no dice: ' + errorCode);
            document.getElementById('result').innerHTML = 'Error: ' + errorCode;
        })
        .always(function() {
            console.log("complete");
        });
        } else if(departure == false){
             $.getJSON("ajax/arrivals.php", js_object)
        .done(function(data) {
            console.log("done");
            getInfo1(data);
        })
        .fail(function() {
            console.log('no dice: ' + errorCode);
            document.getElementById('result').innerHTML = 'Error: ' + errorCode;
        })
        .always(function() {
            console.log("complete");
        });
        }

}

function getInfo1(data){

    if (data.station == null) {
        document.getElementById('data').innerHTML = 'station = null';
        tableDelete();
    } else {
        document.getElementById('data').innerHTML = '';
        tableDeparture(data);
    }
}

//The whole table formatting
function tableDeparture(data) {
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.id = "tagtabell";
    var tbdy = document.createElement('tbody');

    var list = ["Avgång", "Tågnummer", "Spår", "Destination", "Nytid" ,"Kommentar"];

    var tr = document.createElement('tr');

    list.forEach(function(item) {
        var th = document.createElement('th');
        var i = item;
        th.appendChild(document.createTextNode(item));
        tr.appendChild(th);
        console.log(item);
        tr.appendChild(th);
    });

    tbdy.appendChild(tr);

    //Makes use of loops to show data
    //loops foreach in the array transfer with the variable transfer
    for (var transfer of data.station.transfers.transfer) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');

        //console.log(transfer.newDeparture);
        td = document.createElement('td');
        td.appendChild(document.createTextNode(transfer.departure));
        tr.appendChild(td);
        tbdy.appendChild(tr);

        //creates an element of td and attatches the information from transfer.train to the created element.
        td = document.createElement('td');
        td.appendChild(document.createTextNode(transfer.train));
        tr.appendChild(td)
        tbdy.appendChild(tr);

        td = document.createElement('td');
        td.appendChild(document.createTextNode(transfer.track));
        tr.appendChild(td);
        tbdy.appendChild(tr);

        td = document.createElement('td');
        td.appendChild(document.createTextNode(transfer.destination));
        tr.appendChild(td);
        tbdy.appendChild(tr);

            if(transfer.newDeparture != null){
            td = document.createElement('td');
            td.appendChild(document.createTextNode(transfer.newDeparture));
            tr.appendChild(td);
            tbdy.appendChild(tr);
        } else {
            td = document.createElement('td');
            td.appendChild(document.createTextNode(" "));
            tr.appendChild(td);
            tbdy.appendChild(tr);
        }

        if(transfer.comment != null){
        td = document.createElement('td');
        td.appendChild(document.createTextNode(transfer.comment));
        tr.appendChild(td);
        tbdy.appendChild(tr);
        } else {

        td = document.createElement('td');
        td.appendChild(document.createTextNode(" "));
        tr.appendChild(td);
        tbdy.appendChild(tr);
        }

        }
    tbl.appendChild(tbdy);
    document.getElementById('data').appendChild(tbl);
}

function switchTableDeparture(){
    tableDelete();
    var index = document.getElementById('select_station').selectedIndex;

    var id = index;

    var s = '{"id":';
    s += id;
    s += '}';

    var js_object = JSON.parse(s);

    $.getJSON("ajax/departures.php", js_object)
        .done(function(data) {
            console.log("done");
            tableDeparture(data);
        })
        .fail(function() {
            console.log('no dice: ' + errorCode);
            document.getElementById('result').innerHTML = 'Error: ' + errorCode;
        })
        .always(function() {
            console.log("complete");
        });
}


function tableArrivals(data) {
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.id = "arrivaltabell";
    var tbdy = document.createElement('tbody');

    var list = ["Ankomst", "Tågnummer", "Origin", "Destination", "Departure"];

    var tr = document.createElement('tr');

    list.forEach(function(item) {
        var th = document.createElement('th');
        var i = item;
        th.appendChild(document.createTextNode(item));
        tr.appendChild(th);
        console.log(item);
        tr.appendChild(th);
    });

    tbdy.appendChild(tr);

    //loops foreach in the array transfer with the variable transfer
    for (var transfer of data.station.transfers.transfer) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');

        //if statement when arrival is none
        if (transfer.arrival == '0000-00-00 00:00:00') {
            var td = document.createElement('td');
            td.appendChild(document.createTextNode("Placeholder"));
            tr.appendChild(td)
            tbdy.appendChild(tr);
        } else {
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(transfer.arrival));
            tr.appendChild(td)
            tbdy.appendChild(tr);
        }
            //creates an element of td and attatches the information from transfer.train to the created element.
            td = document.createElement('td');
            td.appendChild(document.createTextNode(transfer.train));
            tr.appendChild(td)
            tbdy.appendChild(tr);

            td = document.createElement('td');
            td.appendChild(document.createTextNode(transfer.origin));
            tr.appendChild(td)
            tbdy.appendChild(tr);

            td = document.createElement('td');
            td.appendChild(document.createTextNode(transfer.destination));
            tr.appendChild(td)
            tbdy.appendChild(tr);
            //newDeparture is always null if there are no changes
            if (transfer.newDeparture == null) {
                td = document.createElement('td');
                td.appendChild(document.createTextNode(transfer.departure));
                tr.appendChild(td)
                tbdy.appendChild(tr);

            } else {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(transfer.newDeparture));
                tr.appendChild(td)
                tbdy.appendChild(tr);
            }
        }
    tbl.appendChild(tbdy);
    document.getElementById('data').appendChild(tbl);
}

function switchTableArrival(){
  tableDelete();

  var index = document.getElementById('select_station').selectedIndex;

  var id = index;

  var s = '{"id":';
  s += id;
  s += '}';

  var js_object = JSON.parse(s);

  $.getJSON("ajax/arrivals.php", js_object)
      .done(function(data) {
          console.log("done");
          tableDeparture(data);
      })
      .fail(function() {
          console.log('no dice: ' + errorCode);
          document.getElementById('result').innerHTML = 'Error: ' + errorCode;
      })
      .always(function() {
          console.log("complete");
      });

}




function tableDelete() {
    document.getElementById('data').innerHTML = " ";
}
