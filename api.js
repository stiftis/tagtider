//Javascript

//global variable for checking which tab the user is on
var departure = true;

//Makes an ajax request, if it fails, it'll notify the user
function stations() {

    //ajax request to get json object from server
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

//
function callSuccess(data) {
    document.getElementById('result').innerHTML = 'Data retrieved successfully';
    //foreach. json object, adds station.name in select: obj,obj,array,obj
    for (var station of data.stations.station) {
        var s = document.getElementById("select_station");
        var option = document.createElement("option");
        option.text = station.name;
        s.add(option);
    }

}

//Retrieves all of the train data that's available from the API
function getStation() {

    var index = document.getElementById('select_station').selectedIndex;

    var id = index;

    var s = '{"id":';
    s += id;
    s += '}';

    var js_object = JSON.parse(s);
        //if statment when the user changes tabs
        //and wants to check another station
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

//
function getInfo1(data){

    if (data.station == null) {
        document.getElementById('data').innerHTML = 'station = null';
        tableDelete();
    } else {
        document.getElementById('data').innerHTML = '';
        if(departure)
        tableDeparture(data);
        else if(!departure){
            tableArrivals(data);
        }
    }
}

//The whole table formatting
//Parameters
//
//data from getInfo1
//data from switchTableDeparture
//
//creates and appends

//Creates a formatted table with various parameters using data from the
//getInfo1 and switchtableDeparture function, creating table columns
//for every info from the list. Also includes a appends for each columns.
function tableDeparture(data) {
    //when data.modified returns false the user has not yet selected
    //a station to call the information from.
    if(data.modified == false)
    return alert("Välj station");

    tableDelete();
    //creates table element
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.id = "tagtabell";
    //creates table body
    var tbdy = document.createElement('tbody');

    var list = ["Avgång", "Tågnummer", "Spår", "Till", "NyTid" ,"Kommentar"];

    //global table row variable
    var tr = document.createElement('tr');

    //foreach loop for appending list objects into the th element
    list.forEach(function(item) {
        var th = document.createElement('th');
        th.appendChild(document.createTextNode(item));
        tr.appendChild(th);
        tr.appendChild(th);
    });
    //close tablerow
    tbdy.appendChild(tr);

    //Makes use of loops to show data
    //loops foreach in the array transfer with the variable transfer
    for (var transfer of data.station.transfers.transfer) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');

        //creates an element of td and attatches the information from transfer.departure to the created element
        //td appends the data from the transfer variable declared in the for loop
        //when creating another element of td it closes the last created element of td.
        td = document.createElement('td');
        td.appendChild(document.createTextNode(transfer.departure));
        tr.appendChild(td);
        tbdy.appendChild(tr);

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

            //if statements for null exception
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
        //if statements for null exception
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
    //appends the tablebody into the table
    tbl.appendChild(tbdy);
    //appends the table into the div "data"
    document.getElementById('data').appendChild(tbl);
}

//calling ajax request
function switchTableDeparture(){
    tableDelete();
    departure = true;

    var index = document.getElementById('select_station').selectedIndex;

    var id = index;

    var s = '{"id":';
    s += id;
    s += '}';

    var js_object = JSON.parse(s);

    //ajax request to get json object from server
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

//Same format as tableDeparture but different values
function tableArrivals(data) {
    if(data.modified == false)
    return alert("Välj station");
    tableDelete();

    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.id = "arrivaltabell";
    var tbdy = document.createElement('tbody');

    var list = ["Ankomst", "Tågnummer", "Spår", "Från", "NyTid", "Kommentar"];

    var tr = document.createElement('tr');

    list.forEach(function(item) {
        var th = document.createElement('th');
        th.appendChild(document.createTextNode(item));
        tr.appendChild(th);
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
            td.appendChild(document.createTextNode(transfer.track));
            tr.appendChild(td)
            tbdy.appendChild(tr);

            td = document.createElement('td');
            td.appendChild(document.createTextNode(transfer.origin));
            tr.appendChild(td)
            tbdy.appendChild(tr);

            //if statements for null exception
            if (transfer.newArrival != null) {
                td = document.createElement('td');
                td.appendChild(document.createTextNode(transfer.newArrival));
                tr.appendChild(td)
                tbdy.appendChild(tr);

            } else {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(" "));
                tr.appendChild(td)
                tbdy.appendChild(tr);
            }

            //if statements for null exception
            if(transfer.comment != null){
                td = document.createElement('td');
                td.appendChild(document.createTextNode(transfer.comment));
                tr.appendChild(td)
                tbdy.appendChild(tr);
              } else{
                td = document.createElement('td');
                td.appendChild(document.createTextNode(" "));
                tr.appendChild(td)
                tbdy.appendChild(tr);
              }
            }
    tbl.appendChild(tbdy);
    document.getElementById('data').appendChild(tbl);
}

function switchTableArrival(){
  tableDelete();
  departure = false;

  var index = document.getElementById('select_station').selectedIndex;

  var id = index;

  var s = '{"id":';
  s += id;
  s += '}';

  var js_object = JSON.parse(s);

  $.getJSON("ajax/arrivals.php", js_object)
      .done(function(data) {
          console.log("done");
          tableArrivals(data);
      })
      .fail(function() {
          console.log('no dice: ' + errorCode);
          document.getElementById('result').innerHTML = 'Error: ' + errorCode;
      })
      .always(function() {
          console.log("complete");
      });

}

// All this does is delete an entire table when this is request
function tableDelete() {
    document.getElementById('data').innerHTML = " ";
}
