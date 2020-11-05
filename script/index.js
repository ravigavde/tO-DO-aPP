let name = [];

let data = JSON.parse(window.localStorage.getItem(window.localStorage.key(1)));
for(let i=0; i< data.length ; i++)
{
    console.log(data[i].pass +" "+data[i].u_name);   
}

function verify(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("pass").value;
    console.log("Clicked "+username+password);
    
    
    for(let i=0; i< data.length ; i++)
    {
        if(username == data[i].u_name && password == data[i].pass ){
            console.log("user found "+data[i].pass +" "+data[i].u_name);
            name.push(data[i].u_name);
            localStorage.setItem("Current_user",name);
            let a = document.createElement('a');  
            a.href = "dashboard.html";  
            a.click();   
        }
    }



}