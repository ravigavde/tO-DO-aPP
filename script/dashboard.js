console.log("Hello this is dash borad");
let current_user = localStorage.getItem("Current_user");
let count = 0;
let flag = false;
let name_count = 0;

// for(let i = 0; i< sessionStorage.length;i++)
// {
    
//     // console.log(sessionStorage.getItem(`user${count}`));

//     if(sessionStorage.getItem(`user${i}`) == current_user )
//     {
//         console.log("match");
//         flag = true;
//     }
//     count++;
// }

// if(!flag){
//     sessionStorage.setItem(`user${count}`,current_user);
//  }
//  else{
//     // window.location.href = "index.html";
//     document.write("Already logged in Session is active");
// }



console.log("the current user is "+ current_user);
let greet = `Welcome ${current_user}`;

let data = JSON.parse(window.localStorage.getItem(window.localStorage.key(1)));



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

    let label=document.createElement("label");

    if(name_count==0)
    {
        label.innerText = "First Name -";
        name_count++;
    }    
    else if(name_count==1)
    {
        label.innerText = "Last Name -";
        name_count++;
    }
    else if(name_count==2)
    {
        label.innerText = "Address -";
        name_count++;
    }
    else if(name_count==3)
    {
        label.innerText = "Gender -";
        name_count++;
    }



    let listItem = document.createElement("li");//li 

    let editInput=document.createElement("input");//text
    editInput.value = object;
    editInput.type="text";
    editInput.className=`${object}`;
    
    listItem.appendChild(label);
	listItem.appendChild(editInput);
    return listItem;

}

function reset(){

// console.log(first_name.children[0].value);

    for(let i=0; i< data.length ; i++)
    {
        if(current_user == data[i].u_name)
        {
            console.log("reset data found");

            
            data[i].f_Name = first_name.children[1].value;
            data[i].l_name = last_name.children[1].value  ;
            data[i].addr = address.children[1].value ;
            data[i].gen = gender.children[1].value ;
        }

    }
    console.log(JSON.stringify(data));
    window.localStorage.setItem('user',JSON.stringify(data));
    
}

function logout(){
   
    for(let i = 0 ; i< sessionStorage.length ; i++)
    {
        //sessionStorage.removeItem()
        if(sessionStorage.getItem(`user${i}`) == current_user)
        {
            sessionStorage.removeItem(`user${i}`);
        }
        window.location.href = "index.html";
    }

}