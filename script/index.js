let name = [];
let flag = false;
let count = 0;
let current_user = localStorage.getItem("Current_user");
// console.log(name_data);
for(let i = 0; i< sessionStorage.length;i++)
{
    if(sessionStorage.getItem(`user${i}`) == current_user )
    {
        console.log("match");
        flag = true;
    }
    count++;
}

if(!flag){
    sessionStorage.setItem(`user${count}`,current_user);
 }
 else{
    // window.location.href = "index.html";
    // alert("Already logged in Session is active for "+current_user );
    let a = document.createElement('a');  
    a.href = "dashboard.html";  
    a.click();
}

try{
        let data = JSON.parse(window.localStorage.getItem('user'));

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
    }
    catch(Error)
    {
       document.write("No User is cureently registered please register");
    }        
    finally{
        window.href = "index.html";
    }