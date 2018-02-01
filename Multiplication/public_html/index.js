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
    var table = "<table><caption>Multiplication Table</caption><tbody><tr><th></th>";
    
    for (var i = low; i <= high; i++){
        table += "<th>" + i + "</th>";
    }
    table += "</tr>";
    
    for (i = low; i <= high; i++){
        table += "<tr><th>"+i+"</th>";
        for (var j = low; j <= high; j++){
            table += "<td>"+(j*i)+"</td>";
        }
        table += "</tr>";
    }
    
    table += "</tbody></table>";
    
    document.writeln(table);
}