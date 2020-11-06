let current_user ;
let task_name ;
let s_date ;
let e_date ;
let priority ;

let listItems = document.createElement("li");

function add() 
{
    current_user = localStorage.getItem("Current_user");
    task_name = document.getElementById("tasks").value;
    s_date = document.getElementById("s_date").value;
    e_date = document.getElementById("e_date").value;
    priority = document.getElementById("priority").value;
    
    console.log(task_name+s_date+e_date+ priority  );
    let options = document.createElement("input");
    let end_date = document.createElement("input");
    let start_date = document.createElement("input");
    let inputText = document.createElement("input");
    
    
    inputText.type = "text";
    inputText.value = task_name;
    
    
    start_date.type = "date";
    start_date.value = s_date;
    
    
    end_date.type = "date";
    end_date.value = e_date;
    
    options.type = "text";
    options.value = priority;
    
    listItems.appendChild(inputText);
    listItems.appendChild(start_date);
    listItems.appendChild(end_date);
    listItems.appendChild(options);
    console.log(listItems);
    
}

window.onload = function() {
    let mainUL = document.getElementById('edit_unorderList');
    mainUL.appendChild(listItems);
}
        

