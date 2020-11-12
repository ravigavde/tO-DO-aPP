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

        function verify()
        {
           
            let username = document.getElementById("username").value;
            let password = encrpyt(document.getElementById("pass").value);
             
            
            if(username == "" && password =="")
            {
                document.getElementById("error").innerHTML = "Please enter username and password";
            }
            else if(username == "")
            {
                document.getElementById("error").innerHTML = "Please enter username";
            }
            else if(password == "")
            {
                document.getElementById("error").innerHTML = "Please enter password";
            }
            
            let a = false;
            for(let i=0; i< data.length ; i++)
            {
                if(username == data[i].u_name && password == data[i].pass ){
                    // console.log("user found "+data[i].pass +" "+data[i].u_name);
                    a = true;
                    name.push(data[i].u_name);
                    localStorage.setItem("Current_user",name);
                    
                }
            }
            if(!a)
            {
                document.getElementById("error").innerHTML = "Cannot find account check username or password";
   
            }
            else
            {
                let a = document.createElement('a');  
                    a.href = "dashboard.html";  
                    a.click();
            }
        }

        function encrpyt(value)
        {
        let enc = "";
        for(let i = 0; i < value.length ; i++)
        {
            enc = enc + String.fromCharCode( (value.charCodeAt(i) + 3 ) ) ;
        }
        console.log(enc);
        return enc;
        }

    }
    catch(Error)
    {
       document.write("No User is cureently registered please register");
    }        
    finally{
        window.href = "index.html";
    }