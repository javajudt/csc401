(function(){
    var range = getRange();
    buildTable(range.low, range.high);
})();

function getRange(){
    var low = parseInt(prompt("Enter the low integer: "));
    var high = parseInt(prompt("Enter the high integer: "));
    return {low: low, high: high};
}

function buildTable(low, high){
    var table = "<table><tr><td></td>";
    
    for (var i = low; i <= high; i++){
        table += "<td>" + i + "</td>";
    }
    table += "</tr>";
    
    for (i = low; i <= high; i++){
        table += "<tr><td>"+i+"</td>";
        for (var j = low; j <= high; j++){
            table += "<td>"+(j*i)+"</td>";
        }
        table += "</tr>";
    }
    
    table += "</table>";
    
    document.writeln(table);
}