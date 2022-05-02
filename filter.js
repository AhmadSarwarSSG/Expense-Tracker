var Database_Name = 'DataTb';
var Version = 1.0;
var Text_Description = 'My First Web-SQL Example';
var Database_Size = 2 * 1024 * 1024;
var dbObj = openDatabase(Database_Name, Version, Text_Description, Database_Size);
function list_maker() {
    dbObj.transaction(function (tx) {
        tx.executeSql('SELECT Type from Expense Group by(Type)', [], function (tx, results) {
            var len = results.rows.length, i;
            document.getElementById("list").innerHTML = '';
            var str = '';
            for (i = 0; i < len; i++) {
                str += "<option value=" + results.rows.item(i).Type + ">" + results.rows.item(i).Type + "</option>";
                document.getElementById("list").innerHTML += str;
                str = '';
            }
        }, null);
    });
}
list_maker();
function filter() {
    var type = document.getElementById("list").value;
    var min = document.getElementById("min").value;
    var max = document.getElementById("max").value;
    dbObj.transaction(function (tx) {
        tx.executeSql('SELECT * from Expense Where Type="' + type + '" AND (CAST(SUBSTR(Price, LENGTH("RS.")+1) AS number) BETWEEN ' + min + ' AND ' + max + ')', [], function (tx, results) {
            var len = results.rows.length, i;
            console.log("length: " + len);
            document.getElementById("tab_full").innerHTML = '';
            var head = '<tr id="head"><th>Sr.</th><th>Expense Summary</th><th>Descrpition</th><th>Price</th><th>Type</th><th>Date</th></tr>';
            var str = '';
            var color;
            for (i = 0; i < len; i++) {
                if (i % 2 == 0) {
                    console.log("Even");
                    color = 'style= "background-color: rgb(238, 238, 238);"';
                }
                else {
                    console.log("Odd");
                    color = 'style= "background-color: rgb(219, 219, 219);"';
                }
                str += "<tr "+color+">";
                str += "<td>" + (i + 1) + "</td>";
                str += "<td>" + results.rows.item(i).ESummary + "</td>";
                str += "<td>" + results.rows.item(i).Description + "</td>";
                str += "<td>" + results.rows.item(i).Price + "</td>";
                str += "<td>" + results.rows.item(i).Type + "</td>";
                str += "<td>" + results.rows.item(i).Date + "</td>"
                str += "</tr>";
                if (i == 0) {
                    document.getElementById("tab_full").innerHTML = head + str;
                }
                else {
                    document.getElementById("tab_full").innerHTML += str;
                }
                str = '';
            }
            if (len == 0) {
                document.getElementById("tab_full").innerHTML = head;
            }
        }, null)
    });
}