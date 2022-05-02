var id=((window.location.href).split('?')[1]).split('=')[1];
var Database_Name = 'DataTb';
var Version = 1.0;
var Text_Description = 'My First Web-SQL Example';
var Database_Size = 2 * 1024 * 1024;
var dbObj = openDatabase(Database_Name, Version, Text_Description, Database_Size);
function fill_form() {
    console.log("I am in fill form");
    dbObj.transaction(function (tx) {
        tx.executeSql('SELECT * from Expense where id=' + id + '', [], function (tx, results) {
            document.getElementById("ESummary").value = results.rows.item(0).ESummary;
            document.getElementById("Description").value = results.rows.item(0).Description;
            document.getElementById("Price").value = results.rows.item(0).Price.split('.')[1];
            document.getElementById("Type").value = results.rows.item(0).Type;
            document.getElementById("Date").value = results.rows.item(0).Date;
        });
    });
}
fill_form();
function Update() {

    var ESummary = document.getElementById("ESummary").value;
    var Description = document.getElementById("Description").value;
    var Price = document.getElementById("Price").value;
    var Type = document.getElementById("Type").value;
    console.log(id);
    console.log(ESummary);
    console.log(Description);
    console.log(Price);
    console.log(Type);
    dbObj.transaction(function (tx) {
        tx.executeSql('update Expense set ESummary="' + ESummary + '", Description="' + Description + '", Price="'+"Rs."+Price+'", Type="' + Type + '" where id=' + id + '');
    });
}
