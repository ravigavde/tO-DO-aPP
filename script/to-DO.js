let current_user ;
let task_name ;
let s_date ;
let e_date ;
let priority ;


function add() 
{
            current_user = localStorage.getItem("Current_user");
            task_name = document.getElementById("tasks").value;
            s_date = document.getElementById("s_date").value;
            e_date = document.getElementById("e_date").value;
            priority = document.getElementById("priority").value;
            
            console.log(task_name + " " + s_date + " " + e_date +" " +priority);
        
    
         window.onload = function()
        {
            // let ed = document.getElementById('edit_list');
            // var para = document.createElement("P");
            // para.innerText = "This is a paragraph.";
            // ed.appendChild(para);


            var element = document.createElement("div");
    element.appendChild(document.createTextNode('The man who mistook his wife for a hat'));
    document.getElementById('edit_list').appendChild(element);
                
        }

    

}
