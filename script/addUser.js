let user_list = [];
function add_user() {
   let error_occured = false; 
   
  let first_name = document.getElementById("Name").value;
  if(first_name == "")
  {
    document.getElementById("f_Error").innerText = "Enter first Name";
    error_occured = true;
  }

  let user_name = document.getElementById("username").value;
  let reg_email = /^[a-z A-Z 0-9 _ -]+@[a-zA-Z]+\.com$/gi;
  
  if(!reg_email.test(user_name))
  {
    document.getElementById("emaiError").innerText = "wrong email";
    error_occured = true;
  }  
 

  let last_name = document.getElementById("Last-Name").value;
  if( last_name == "")
  {
    document.getElementById("l_Error").innerText = "Enter Last name";
    error_occured = true;
  }



  let gender = document.getElementById("Gender").value;
  if(gender == "")
  {
    document.getElementById("g_Error").innerText = "Enter Gender";
    error_occured = true;
  }

  let password = document.getElementById("pass1").value;    
  let confirm_password = document.getElementById("pass2").value;  

  let regPass =  /^[A-Z a-z 0-9 ]\w{7,14}$/;

  if( password != confirm_password )
  {
    document.getElementById("p_Error").innerText = "Password does not match";
    error_occured = true;
  } 
  else if( password == "" || confirm_password == ""){
    document.getElementById("p_Error").innerText = "Please enter password";
    error_occured = true;
  }
  else if(!regPass.test(password)){
    document.getElementById("p_Error").innerText = "Please password in between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter";
    error_occured = true;
  }
  
  let address = document.getElementById("Address").value;
  if(address == "")
  {
    document.getElementById("a_Error").innerText = "Enter address";
    error_occured = true;
  }


  let image = document.getElementById("image").src;
  if( image == "" || image == null )
  {
    document.getElementById("i_error").innerText = "please select a image";   
    error_occured = true;
  }

   
     
 var user_obj = {
                 f_Name: first_name,
                 l_name: last_name,
                 u_name: user_name,
                 gen: gender,
                 addr: address,
                 img : image,
                 pass : password,
                 con_passwd: confirm_password,
                 toDo:[],
                 pToDo:[]
                };


    if(!error_occured)
    {
        if(window.localStorage.getItem("user") != null)
        {
            let confirm = false;
            let data =  JSON.parse(window.localStorage.getItem("user"));
            console.log(data);
            for(let i =0 ; i< data.length ; i++)
            {
                var u1 = data[i].u_name; 
                if(u1.toLowerCase() == user_name.toLowerCase() )
                {
                    confirm = true;
                }
            }
            if(!confirm)
            {
                data.push(user_obj);
                window.localStorage.setItem('user',JSON.stringify(data));  
                document.getElementById("gen_error").innerText = "User Rgistered Successfully"; 
            }
            else
            {
                document.getElementById("gen_error").innerText = "Username already registered";
            }
        }
        else
        {
            user_list.push(user_obj);
            window.localStorage.setItem('user',JSON.stringify(user_list));
            document.getElementById("gen_error").innerText = "User Rgistered Successfully"; 
            for (let i=0; i< window.localStorage.length;i++)
            {  
                let res = window.localStorage.getItem("user");
                console.log(res);
            }
        }

    }
    else{
        document.getElementById("gen_error").innerText ="Enter Values Properly" ;
    }

}

function imageee() 
{
    var inputSrc = document.getElementById("image");
    var reader = new FileReader();
    reader.readAsDataURL(inputSrc.files[0]);
    reader.onloadend = function(event) {
        var Image = document.getElementById("image");
        Image.src = event.target.result;     
    }
    
}