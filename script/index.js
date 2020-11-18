let name = [];
let flag = false;
let count = 0;

let current_user = localStorage.getItem("Current_user");

let session = localStorage.getItem("loggedIn");
if(session == null)
{
    // for(let i = 0; i< sessionStorage.length;i++)
    // {
    //     if(sessionStorage.getItem(`user${i}`) == current_user )
    //     {
    //         // console.log("match");
    //         flag = true;
    //     }
    // }
    
    // if(!flag){
    //     // sessionStorage.setItem(`user${count}`,current_user);
    //  }
    //  else{
    //     document.getElementById("error").innerHTML =`Already logged in Session is active for ${current_user}`;
    // }
            let data = JSON.parse(window.localStorage.getItem('user'));
    
           if(data != null )
           {
               for(let i=0; i< data.length ; i++)
               {
                //    console.log(data[i].pass +" "+data[i].u_name);   
               }
           }
           else
           {
               document.getElementById("error").innerHTML = "No User is registered, Please create your account";   
    
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
                else if(data != null )
                {
                    let a = false;
                        for(let i=0; i< data.length ; i++)
                        {
                            if(username == data[i].u_name && password == data[i].pass ){
                                // console.log("user found "+data[i].pass +" "+data[i].u_name);
                                a = true;
                                // name.push(data[i].u_name);
                                localStorage.setItem("Current_user",data[i].u_name); 
                                localStorage.setItem("loggedIn",data[i].u_name)     
                            }
                        }
                        if(a == false)
                        {
                            document.getElementById("error").innerHTML = "User not found please check username/password";
                        }
                        else
                        {
                            let a = document.createElement('a');  
                                a.href = "dashboard.html";  
                                a.click();
                        }
                }
                else
                {
                    document.getElementById("error").innerHTML = "No User is registered, Please create your account"; 
                }
                a = false;
            }
                    
    
            function encrpyt(value)
            {
            let enc = "";
            for(let i = 0; i < value.length ; i++)
            {
                enc = enc + String.fromCharCode( (value.charCodeAt(i) + 3 ) ) ;
            }
            return enc;
            }

}
else
{
    console.log(session);
    current_user = session;
    let a = document.createElement('a');  
    a.href = "dashboard.html";  
    a.click();
}

