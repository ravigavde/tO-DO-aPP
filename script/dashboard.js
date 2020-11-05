console.log("Hello this is dash borad");
let count = 0;
let current_user = localStorage.getItem("Current_user");
let active_user;
console.log("the current user is "+ current_user);
let greet = `Welcome ${current_user}`;

let data = JSON.parse(window.localStorage.getItem(window.localStorage.key(1)));

let reader = new FileReader()

let first_name;
let last_name;
let address;
let gender;
let profile;


for(let i=0; i< data.length ; i++)
{
    if(current_user == data[i].u_name)
    {
        first_name = addTask(data[i].f_Name);
        last_name = addTask(data[i].l_name);
        address = addTask(data[i].addr);
        gender = addTask(data[i].gen);
        profile = data[i].img;
        active_user = data[i].u_name;
        console.log("data found");

    }
}


window.onload = function() {
    document.getElementById("profile").src = profile;
    let unorderedList = document.getElementById('user_detailss');
    unorderedList.appendChild(first_name);
    unorderedList.appendChild(last_name);
    unorderedList.appendChild(gender);
    unorderedList.appendChild(address);
}

function addTask(object){

    let listItem = document.createElement("li");//li 

    let editInput=document.createElement("input");//text
    editInput.value = object;
    editInput.type="text";
    editInput.className=`${object}`;
    
    let editButton=document.createElement("button");//edit button
    editButton.innerText="Edit";
    editButton.className=`edit${object}`;
    editButton.onclick
    
	listItem.appendChild(editInput);
    // listItem.appendChild(editButton);
    return listItem;

}

function reset(){

// console.log(first_name.children[0].value);

    for(let i=0; i< data.length ; i++)
    {
        if(current_user == data[i].u_name)
        {
            console.log("reset data found");
            
            data[i].f_Name = first_name.children[0].value;
            data[i].l_name = last_name.children[0].value  ;
            data[i].addr = address.children[0].value ;
            data[i].gen = gender.children[0].value ;
        }
    }
    // console.log(JSON.stringify(data));
    window.localStorage.setItem('user',JSON.stringify(data));
    
}

function logout(){
  let   logout_data = JSON.parse(current_user);
    console.log(typeof(logout_data));
    // {
    //     console.log(current_user[i]);
    //     // if(current_user[i])
    // }
}