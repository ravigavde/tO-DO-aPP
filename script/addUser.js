let user_list = [];
reader = new FileReader();
function add_user() {
  let first_name = document.getElementById("Name").value;
  let user_name = document.getElementById("username").value;
  let last_name = document.getElementById("Last-Name").value;
  let gender = document.getElementById("Gender").value;
  let address = document.getElementById("Address").value;

  let image = document.getElementById("image").files[0].name;
  let password = document.getElementById("pass1").value;    
  let confirm_password = document.getElementById("pass2").value;  
   
 var user_obj = {
                 f_Name: first_name,
                 l_name: last_name,
                 u_name: user_name,
                 gen: gender,
                 addr: address,
                 img : image,
                 pass : password,
                 con_passwd: confirm_password
                };


    if (window.Worker) 
    {
        let myWorker = new Worker("script/validation.js");

        myWorker.postMessage(user_obj);

        myWorker.onmessage = function(e){
            if(e.data!= undefined)
            {
                // alert(first_name+ " registered successfully");
                console.log(e.data);
                let c1 = e.data.result;
                let c2 = `${first_name}`+" has filled data correctly " ;
                let duplicate = true;
                
                let data =  JSON.parse(window.localStorage.getItem(window.localStorage.key(1)));
                
             

                for(let i =0; i< data.length ; i++)
                {
                    let e1 = user_name;
                    let e2 = data[i].u_name;

                    if(e1.toLowerCase() == e2.toLowerCase()){
                        duplicate = false;
                    }
                }




                if(c1 == c2 && duplicate)
                {
                   user_list.push(user_obj);
                   window.localStorage.setItem('user',JSON.stringify(user_list));
                    for (let i=0; i< window.localStorage.length;i++)
                    {
                        
                        let res = window.localStorage.getItem(window.localStorage.key(i));
                        console.log(res);
                    }
                }
                else if(duplicate==false)
                {
                    alert("Email id / username registered already");
                }
                else{
                   console.log("error check for valeus"); 
                   alert("Values not entered correctly");
                }
            }
            else{
                alert("Please fill the form correctly");
                }
          };
      
    }
}
