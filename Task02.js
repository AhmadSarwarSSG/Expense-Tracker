var id = localStorage.getItem("ID1");
if (!id) {
    id = 1;
    localStorage["ID1"] = id;
}
console.log("Top: " + id);
var Database_Name = 'DataTb';
var Version = 1.0;
var Text_Description = 'My First Web-SQL Example';
var Database_Size = 2 * 1024 * 1024;
var dbObj = openDatabase(Database_Name, Version, Text_Description, Database_Size);
dbObj.transaction(function (tx) {

    tx.executeSql('CREATE TABLE IF NOT EXISTS Expense(id unique, ESummary, Description, Price, Type, Date Date)');
    console.log("Table Created");
});
var currentdate = new Date();
function getDayName(day_no) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day_no];
}
var date = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " " + getDayName(currentdate.getDay()) + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
document.getElementById("Date").value = date;
function Insert() {

    var ESummary = document.getElementById("ESummary").value;
    var Description = document.getElementById("Description").value;
    var Price = document.getElementById("Price").value;
    var Type = document.getElementById("Type").value;
    console.log("ID_Before:" + id);
    console.log(ESummary);
    console.log(Description);
    console.log(Price);
    console.log(Type);
    id++;
    dbObj.transaction(function (tx) {
        tx.executeSql('insert into Expense(id, ESummary, Description, Price, Type, Date) values(' + (id) + ',"' + ESummary + '","' + Description + '","' + "Rs." + Price + '","' + Type + '","' + date + '")');
    });
    console.log("ID: "+id)
    localStorage["ID1"] = id;
}
