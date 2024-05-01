// Search function
function searchTable() {
   var input, filter, found, table, tr, td, i, j;
   input = document.getElementById("search");
   filter = input.value.toUpperCase();
   table = document.getElementById("sortTable");
   tr = table.getElementsByTagName("tr");
   var e = document.getElementById("opt");
   var value = e.value;
   var text = e.options[e.selectedIndex].text;
   console.log("value ", value);
   console.log("text ", text);
   for (i = 0; i < tr.length; i++) {
       td = tr[i].getElementsByTagName("td")[value];
       if (td) {
           txtValue = td.textContent || td.innerText;
           if (txtValue.toUpperCase().indexOf(filter) > -1) {
               tr[i].style.display = "";
           } else {
               tr[i].style.display = "none";
           }
       }
   }
}
