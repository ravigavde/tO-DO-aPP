console.log("Hello this is dash borad");
let current_user = localStorage.getItem("Current_user");
let count = 0;
let flag = false;
let name_count = 0;
let pTodo;

let taskname;
let endDate;
let category;
let reminderDate;
let public;


console.log("the current user is "+ current_user);
let greet = `Welcome ${current_user}`;

try{
    let data = JSON.parse(window.localStorage.getItem("user"));
    console.log("In dashboard page");

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
        function showProfile()
        {
            let box = document.getElementById("userbox");
            box.style.display = "inline-block";
        }

        function reset(){
                    let a = document.getElementById("profileChange").files[0];
                    for(let i=0; i< data.length ; i++)
                    {
                        if(current_user == data[i].u_name)
                        {
                            console.log("reset data found");
                            data[i].f_Name = first_name.children[1].value;
                            data[i].l_name = last_name.children[1].value  ;
                            data[i].addr = address.children[1].value ;
                            data[i].gen = gender.children[1].value ;
                            if( a!= undefined)
                            {
                                data[i].img = document.getElementById("profileChange").src;
                            }
                        }

                    } 
                    // console.log(JSON.stringify(data));
                    window.localStorage.setItem('user',JSON.stringify(data));
                    document.getElementById("main_msg").innerText = "Profile Updated Successfully";
                    let box = document.getElementById("userbox");
                     box.style.display = "none";
               
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
        function changePic(){
            let changePicInput = document.getElementById("profileChange");
            let reader = new FileReader();
            reader.readAsDataURL(changePicInput.files[0]);
            reader.onloadend = function(event) {
                let Image = document.getElementById("profileChange");
                Image.src = event.target.result;     
            }
        }
        function display()
        {
            
            let data = JSON.parse(window.localStorage.getItem("user"));
            for(let i =0; i< data.length ; i++)
            {
                if(data[i].u_name == current_user)
                {
                    pTodo = data[i].pToDo;
                }
            }
            console.log(pTodo.length);
            if (pTodo.length == 0 ) 
            {
                document.getElementById("main_msg").innerHTML = "Please add To list";
            }
            else
            {
                    console.log(pTodo);
                    taskname;
                    endDate;
                    category;
                    reminderDate;
                    public;




            }

            




        }


display();

}
catch(Error)
{
    alert("No USer is registered");
}        