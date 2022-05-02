var Database_Name = 'DataTb';
var Version = 1.0;
var Text_Description = 'My First Web-SQL Example';
var Database_Size = 2 * 1024 * 1024;
var dbObj = openDatabase(Database_Name, Version, Text_Description, Database_Size);
function year_list() {
    dbObj.transaction(function (tx) {
        tx.executeSql('SELECT SUBSTR(Date, 5, 4) As Date from Expense Group by SUBSTR(Date, 5, 4)', [], function (tx, results) {
            var len = results.rows.length, i;
            document.getElementById("year").innerHTML = '';
            var str = '<option selected disabled>Select Year</option>';
            for (i = 0; i < len; i++) {
                str += "<option value=" + results.rows.item(i).Date + ">" + results.rows.item(i).Date + "</option>";
                document.getElementById("year").innerHTML += str;
                str = '';
            }
        }, null);
    });
}
year_list();
var month = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function month_list() {
    dbObj.transaction(function (tx) {
        tx.executeSql('SELECT SUBSTR(Date, 3, 1) As Date from Expense Group by SUBSTR(Date, 3, 1)', [], function (tx, results) {
            var len = results.rows.length, i;
            document.getElementById("month").innerHTML = '';
            var str = '<option selected disabled>Select Month</option>';
            for (i = 0; i < len; i++) {
                str += "<option value=" + results.rows.item(i).Date + ">" + month[results.rows.item(i).Date] + "</option>";
                document.getElementById("month").innerHTML += str;
                str = '';
            }
        }, null);
    });
}
month_list();

var xValues = new Array();
var yValues = new Array();
xvalue();
function xvalue() {
    xValues.splice(0, xValues.length);
    dbObj.transaction(function (tx) {
        tx.executeSql('SELECT Type from Expense Where SUBSTR(Date, 5, 4)="' + document.getElementById("year").value + '" AND SUBSTR(Date, 3, 1)="' + document.getElementById("month").value + '" Group by(Type)', [], function (tx, results) {
            var x = [];
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                x.push(results.rows.item(i).Type);
            }
            yvalue(x);
        }, null);
    });
}
function yvalue(x) {
    yValues.splice(0, yValues.length);
    xValues = x;
    for (let i = 0; i < xValues.length; i++) {
        dbObj.transaction(function (tx) {
            tx.executeSql('SELECT Sum(CAST(SUBSTR(Price, LENGTH("RS.")+1) AS number)) AS Price from Expense where Type="' + xValues[i] + '"', [], function (tx, results) {
                var len = results.rows.length, i;
                for (i = 0; i < len; i++) {
                    yValues.push(results.rows.item(i).Price);
                }
                make_Chart(xValues, yValues);
            }, null);
        });
    }
}
function make_Chart(x, y) {
    xValues = x;
    yValues = y;
    var color = [];
    for (let i = 0; i < xValues.length; i++) {
        color.push("rgb(" + Math.random() * 256 + ", " + Math.random() * 256 + ", " + Math.random() * 256 + ")")
    }
    console.log(yValues);
    new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: color,
                data: yValues,
                scaleOverride: true,
                scaleStartValue: 0
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
            }
        }
    });
}