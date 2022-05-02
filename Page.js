var Database_Name = 'DataTb';
var Version = 1.0;
var Text_Description = 'My First Web-SQL Example';
var Database_Size = 2 * 1024 * 1024;
var dbObj = openDatabase(Database_Name, Version, Text_Description, Database_Size);
function Read() {
    dbObj.transaction(function (tx) {
        tx.executeSql('SELECT * from Expense', [], function (tx, results) {
            var len = results.rows.length, i;
            var color;
            console.log("length: " + len);
            document.getElementById("tab_full").innerHTML = '';
            var head = '<tr id="head"><th>Sr.</th><th>Expense Summary</th><th>Descrpition</th><th>Price</th><th>Type</th><th>Date</th><th>Option</th></tr>';
            var str = '';
            for (i = 0; i < len; i++) {
                if(i % 2 == 0)
                {
                    console.log("Even");
                    color = 'style= "background-color: rgb(238, 238, 238);"';
                }
                else
                {
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
                str += "<td><a href='Task02_Update_Form.html?id=" + results.rows.item(i).id + "'><button  id='update'>Update</button></a><button onclick='del(" + results.rows.item(i).id + ")' id='delete'>Delete</button></td>"
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
Read();
function del(id) {
    dbObj.transaction(function (tx) {
        tx.executeSql('delete from Expense where id=' + id + '');
    });
    Read();
}
