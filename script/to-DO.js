let current_user ;
let task_name ;
let rem_radio;
let rem_date;
let public ;
let e_date ;
let category ;
let count_id = 0;
let delete_counter =0;

let today = new Date().toISOString().split('T')[0];

let to_do = [];


function resetVal()
{
    count_id = 0;
    delete_counter = 0;
}
function remindDate(value)
{
    console.log(value);
    if(value=="yes")
    {
        let a = document.getElementsByClassName("r_date");
        console.log(a[0]);
        a[0].style.display= "inline";
        a[1].style.display= "inline";
        rem_date = a[1].value;
        
    }
    else{
        let a = document.getElementsByClassName("r_date");
        console.log(a[0]);
        a[0].style.display= "none";
        a[1].style.display= "none";

    }
    // a.style.display = "inline-block";
}
function isPublic(value)
{
    if(value == "yes")
    {
        public = "yes";
    }
    else
    {
        public = "no";
    }
}

function deletee()
{
    
    let myTab = document.getElementById('list_t');
    let deleteList = [];
    let del_c = 0;
   
    for (let index = 0; index < count_id ; index++) 
    {
        let a = document.getElementById(index);
        if(a.checked)
        {
            console.log("true");
            deleteList.push(index);
            myTab.deleteRow(index - del_c );
            del_c++;
            delete_counter++;
        }    
        
    }
}

function Confirm()
{
    count_id = count_id - delete_counter;
    let new_todo = [];
    let taskname;
    let enddate;
    let categ;
    let remindate;
    let publc;


    let row_counter = 0;
    let data = JSON.parse(window.localStorage.getItem("user"));
    let deleteList = [];
    let userTodo;
    let editedTodo = [];
    console.log("total count id" +count_id);
    for (let index = 0; index < count_id ; index++) 
    {
        let a = document.getElementById(index);
        if(a.checked)
        {
            console.log("true");
            deleteList.push(index);
        }    
    }
    console.log(deleteList);

    for(let i = 0 ; i < data.length ; i++)
    {
        if(data[i].u_name == current_user)
        {
            userTodo =  data[i].toDo;
        }
    }


    let getData = document.getElementsByClassName("name");
    console.log(getData);
    
    let myTab = document.getElementById('list_t');
    // console.log(myTab);

    for(let i =0; i < myTab.rows.length ; i++)
    {
        // console.log(myTab.rows[i]);
        
        let local_counter = 0;
        let tCells = myTab.rows.item(i).cells;
        for (let j = 0; j < tCells.length; j++)
        {
            if(local_counter == 0 )
            {
                let a = tCells.item(j);
                let b = a.childNodes[0].value;
                console.log("name"+b);
                local_counter++;
            }
           else if(local_counter == 1 )
            {
                let a = tCells.item(j);
                let b = a.childNodes[0].value;
                console.log("Task name"+b);
                taskname = b;
                local_counter++;
            }
            else if(local_counter == 2 )
            {
                let a = tCells.item(j);
                let b = a.childNodes[0].value;
                console.log("End date"+b);
                enddate = b;
                local_counter++;
            }
            else if(local_counter == 3 )
            {
                let a = tCells.item(j);
                let b = a.childNodes[0].value;
                console.log("Category"+b);
                categ = b;
                local_counter++;
            }
            else if(local_counter == 4 )
            {
                let a = tCells.item(j);
                let b = a.childNodes[0].value;
                console.log("Reminder date"+b);
                remindDate = b;
                local_counter++;
            }
            else if(local_counter == 5 )
            {
                let a = tCells.item(j);
                let b = a.childNodes[0].value;
                console.log("Is public"+b);
                publc = b;
                local_counter++;
            }
        }
        let temp = { name: taskname, endDate : enddate, category: categ,status:"pending",reminder:remindDate,public:publc };
        // new_todo.push(temp);
        for(let i = 0 ; i < data.length ; i++)
        {
            if(data[i].u_name == current_user)
            {
                data[i].pToDo.push(temp);
                // console.log(data[i].toDo);
            }
        }
        
        console.log(row_counter++);
    }
        for(let i = 0 ; i < data.length ; i++)
        {
            if(data[i].u_name == current_user)
            {
                data[i].toDo = [];
                // data[i].pToDo.push(new_todo);
                // console.log(data[i].toDo);
            }
        }
        console.log(data);
        count_id =0;
        delete_counter =0;
        window.localStorage.setItem('user',JSON.stringify(data));
        window.location = "dashboard.html";
}

function add()
{
    let mainUl = document.getElementById("edit_unorderList");

    current_user = localStorage.getItem("Current_user");
    let data = JSON.parse(window.localStorage.getItem("user"));
    let correct = true;

    task_name = document.getElementById("tasks").value;
    e_date  =   document.getElementById("e_date").value;
    rem_radio = document.getElementsByClassName("r_date");
    rem_date = rem_radio[1].value;
    console.log(rem_date + "this is");
   
    category = document.getElementById("priority").value;
    console.log(task_name + e_date + category);

    if(task_name == "")
    {
        document.getElementById("errorMsg").innerText = "Please enter task name";
        correct = false;

    }
    else if (e_date == "")
    {
        document.getElementById("errorMsg").innerText = "Please select date";
        correct = false;   
    }
    else if(category == "")
    {
        document.getElementById("errorMsg").innerText = "Please enter category";
        correct = false;
    }


    if(correct)
    {   
        let task = { name: task_name, endDate : e_date, category: category,status:"pending",reminder:rem_date,public:public };
        to_do.push(task);
        console.log(current_user);
           for(let i = 0 ; i < data.length ; i++)
           {
               if(data[i].u_name == current_user)
               {
                    data[i].toDo.push(task);
                    // console.log(data[i].toDo);
               }
           }
           task = null;
           
           
           window.localStorage.setItem('user',JSON.stringify(data));
           
        document.getElementById("errorMsg").innerText = "Sucessfully Added Task";
        document.getElementById("remDate").value="";
        document.getElementById("e_date").value="";


        let sendData = [];
        for(let i = 0 ; i < data.length ; i++)
        {
            if(data[i].u_name == current_user)
            {
               sendData =  data[i].toDo;
            }
        }
        display();
    }
        
}

function display()
{
    let toDo_raw_data = [];
    let mainUl = document.getElementById("edit_unorderList");
    let data = JSON.parse(window.localStorage.getItem("user"));
    for(let i =0; i< data.length ; i++)
    {
        if(data[i].u_name == current_user)
        {
            toDo_raw_data = data[i].toDo;
        }
    }

    let checkBox = document.createElement("input"); 
    checkBox.type = "checkbox";
 
    let taskInput = document.createElement("input");
    taskInput.type = "text";
    
    let endDate = document.createElement("input");
    endDate.type = "date";
    
    let tCategory = document.createElement("input");
    tCategory.type = "text";
    
    let remDate = document.createElement("input");
    remDate.type = "date";
    
    let pubSelect = document.createElement("input");
    pubSelect.type = "text";
    let rowTable = "";
    for(let i =0 ; i< toDo_raw_data.length ; i++)
    {

        taskInput.value = toDo_raw_data[i].name;
        endDate.value =  toDo_raw_data[i].endDate;
        tCategory.value = toDo_raw_data[i].category;
        remDate.value = toDo_raw_data[i].reminder;
        pubSelect.value = toDo_raw_data[i].public;

        // console.log(toDo_raw_data[i].name+toDo_raw_data[i].endDate+toDo_raw_data[i].category+toDo_raw_data[i].reminder+toDo_raw_data[i].public);
        // rowTable  = rowTable + `<tr><td><input type="checkbox" name="" id="${count_id}"> </td> <td>${taskInput.value}</td> <td>${endDate}</td> <td>${tCategory}</td> <td>${remDate}</td> <td>${pubSelect}</td></tr>`;
        rowTable  = rowTable + `<tr><td><input type="checkbox" name="" id="${count_id++}"> </td>  <td><input type="text" class="name" value="${taskInput.value}" name="" id=""></td>  <td><input type="date" class="name" value="${endDate.value}" name="" id=""></td> <td><input type="text" class="name" value="${tCategory.value}" name="" id=""></td><td><input type="date" class="name" value="${remDate.value}" name="" id=""></td>  <td><input type="text" class="name" value="${pubSelect.value}" name="" id=""></td> `

    }
    document.getElementById("list_t").innerHTML = rowTable;
}
