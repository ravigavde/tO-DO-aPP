let session = localStorage.getItem("loggedIn");
if (session == null) {
  let a = document.createElement("a");
  a.href = "index.html";
  a.click();
} else {
  // console.log("Hello this is dash borad");
  let current_user = localStorage.getItem("Current_user");
  let count = 0;
  let flag = false;
  let name_count = 0;
  let pTodo;

  let taskname;
  let endDate;
  let category;
  let reminderDate;
  let done_count = 0;

  // console.log("the current user is "+ current_user);
  let greet = `Welcome ${current_user}`;

  try {
    let data = JSON.parse(window.localStorage.getItem("user"));
    // console.log("In dashboard page");

    let first_name;
    let last_name;
    let address;
    let gender;
    let profile;
    let temp_gender;

    for (let i = 0; i < data.length; i++) {
      if (current_user == data[i].u_name) {
        first_name = addTask(data[i].f_Name);
        last_name = addTask(data[i].l_name);
        address = addTask(data[i].addr);
        gender = addTask(data[i].gen);
        temp_gender = data[i].gen;
        profile = data[i].img;
        active_user = data[i].u_name;
      }
    }

    window.onload = function () {
      document.getElementById("profile").src = profile;
      let unorderedList = document.getElementById("user_detailss");
      unorderedList.appendChild(first_name);
      unorderedList.appendChild(last_name);
      unorderedList.appendChild(gender);
      unorderedList.appendChild(address);

      document.getElementById("taskSearch").value = "";
      if (temp_gender == "Male") {
        document.getElementById("male").selected = true;
      } else if (temp_gender == "Female") {
        document.getElementById("female").selected = true;
      } else if (temp_gender == "Other") {
        document.getElementById("other").selected = true;
      }
      public();
      reminder();
    };

    function addTask(object) {
      // console.log("workjing"+object);
      let editInput;
      let label = document.createElement("label");

      if (name_count == 0) {
        editInput = document.createElement("input"); //text
        editInput.type = "text";
        editInput.value = object;

        label.innerText = "First Name ";
        editInput.className = "FirstName";
        name_count++;
      } else if (name_count == 1) {
        editInput = document.createElement("input"); //text
        editInput.type = "text";
        editInput.value = object;

        label.innerText = "Last Name ";
        editInput.className = "LastName";
        name_count++;
      } else if (name_count == 2) {
        editInput = document.createElement("TEXTAREA"); //text
        editInput.type = "text";
        editInput.value = object;

        label.innerText = "Address ";
        editInput.className = "Address";
        name_count++;
      } else if (name_count == 3) {
        editInput = document.createElement("select"); //text
        let option1 = document.createElement("option");
        let option2 = document.createElement("option");
        let option3 = document.createElement("option");

        option1.text = "Male";
        option1.value = "Male";
        option1.id = "male";

        option2.text = "Female";
        option2.value = "Female";
        option2.id = "female";

        option3.text = "Other";
        option3.value = "Other";
        option3.id = "other";

        editInput.add(option1);
        editInput.add(option2);
        editInput.add(option3);

        label.innerText = "Gender ";
        name_count++;
        editInput.className = "Gender";
      }

      let listItem = document.createElement("li");
      listItem.appendChild(label);
      listItem.appendChild(editInput);
      return listItem;
    }
    function showProfile() {
      document.getElementById("main_msg").innerText = "";

      let box = document.getElementById("userbox");
      box.style.display = "inline-block";
    }

    function reset() {
     let f_Name = first_name.children[1].value;
     let l_name = last_name.children[1].value;
     let addr = address.children[1].value;

     if(f_Name == ""  && l_name =="" && addr =="" )
     {
      document.getElementById("main_msg").innerText =
      "Please enter first name , last name and address";
     }
     else if(l_name == "")
     {
      document.getElementById("main_msg").innerText =
      "last name cannot be empty";
     }
     else if(addr == "")
     {
      document.getElementById("main_msg").innerText =
      "Address cannot be empty";
     }
     else if(f_Name =="")
     {
      document.getElementById("main_msg").innerText =
      "Please enter first name";
     }
     else
     {
       let a = document.getElementById("profileChange").files[0];
       let sex;
       let g = gender.children[1].options.selectedIndex;
       if (g == 0) {
         sex = "Male";
       } else if (g == 1) {
         sex = "Female";
       } else if (g == 2) {
         sex = "Other";
       }
       console.log(sex);
       for (let i = 0; i < data.length; i++) {
         if (current_user == data[i].u_name) {
           // console.log("reset data found");
           data[i].f_Name = first_name.children[1].value;
           data[i].l_name = last_name.children[1].value;
           data[i].addr = address.children[1].value;
           data[i].gen = sex;
           if (a != undefined) {
             data[i].img = document.getElementById("profileChange").src;
           }
         }
       }
       // console.log(JSON.stringify(data));
       window.localStorage.setItem("user", JSON.stringify(data));
       document.getElementById("userbox").style.display = "none";
     }
     location.reload();
     document.getElementById("main_msg").innerText =
         "Profile Updated Successfully";
    }

    function logout() {
      for (let i = 0; i < sessionStorage.length; i++) {
        sessionStorage.removeItem(`user${i}`);
      }
      localStorage.removeItem("loggedIn");
      window.location.href = "index.html";
    }
    function changePic() {
      let imageReg = /.(gif|jpe?g|png|webp|bmp)$/i;
      let changePicInput = document.getElementById("profileChange");
      if(imageReg.test(changePicInput.value))
      {
        let reader = new FileReader();
        reader.readAsDataURL(changePicInput.files[0]);
        reader.onloadend = function (event) {
          let Image = document.getElementById("profileChange");
          Image.src = event.target.result;
        };
      }
      else
      {
        document.getElementById("main_msg").innerText =
         "Select image with jpeg ,jpg ,png etc extions only";

      }

    }
    function display() {
      document.getElementById("main_msg").innerText = "";

      let data = JSON.parse(window.localStorage.getItem("user"));
      for (let i = 0; i < data.length; i++) {
        if (data[i].u_name == current_user) {
          pTodo = data[i].pToDo;
        }
      }
      // console.log(pTodo.length);
      if (pTodo.length == 0) {
        document.getElementById("main_msg").innerHTML = "Please add task To the list";
      } else {
        // console.log(pTodo);
        taskname;
        endDate;
        category;
        reminderDate;

        let table = document.getElementById("display");
        let rows =
          "<th>Task Name</th> <th>Category</th> <th>Status</th><th></th>";
        for (let i = 0; i < pTodo.length; i++) {
            if(pTodo[i].name != undefined)
            {
                rows =
                  rows +
                  `<tr> <td>${pTodo[i].name}</td><td>${pTodo[i].category}</td> <td>${
                    pTodo[i].status
                  }</td><td><input onclick= "doneFun(this.id)" type="button" id=${done_count++} value="Done"></td></tr>`;
            }
        }
        table.innerHTML = rows;
      }
      done_count = 0;
      categ("all");
    }

    function categ(value) {
        let selectId = 0;
      document.getElementById("main_msg").innerText = "";
      if (value == "Personal") {
        let hide = document.getElementById("delete").style.display="none";

        let data = JSON.parse(window.localStorage.getItem("user"));
        for (let i = 0; i < data.length; i++) {
          if (data[i].u_name == current_user) {
            pTodo = data[i].pToDo;
          }
        }
        // console.log(pTodo.length);
        if (pTodo.length == 0) {
          document.getElementById("main_msg").innerHTML = "Please add To list";
        } else {
          // console.log(pTodo);
          taskname;
          endDate;
          category;
          reminderDate;

          let table = document.getElementById("display");
          let rows =
          "<th>Task Name</th> <th>Category</th> <th>Status</th><th>End Date</th><th></th>";
          for (let i = 0; i < pTodo.length; i++) {
            if (
              pTodo[i].category == "Personal" ||
              pTodo[i].category == "personal"
            ) {
              if (pTodo[i].status != "Done") {
                rows =
                rows +
                `<tr> <td>${pTodo[i].name}</td><td>${
                  pTodo[i].category
                }</td> <td>${
                  pTodo[i].status
                }</td><td>${pTodo[i].endDate}</td><td><input onclick= "doneFun(this.id)" type="button" id=${done_count++} value="Done"></td></tr>`;
              }
            }
          }
          table.innerHTML = rows;
        }
        done_count = 0;
      } else if (value == "work") {
        let hide = document.getElementById("delete").style.display="none";
        let data = JSON.parse(window.localStorage.getItem("user"));
        for (let i = 0; i < data.length; i++) {
          if (data[i].u_name == current_user) {
            pTodo = data[i].pToDo;
          }
        }
        // console.log(pTodo.length);
        if (pTodo.length == 0) {
          document.getElementById("main_msg").innerHTML = "Please add To list";
        } else {
          // console.log(pTodo);
          taskname;
          endDate;
          category;
          reminderDate;

          let table = document.getElementById("display");
          let rows =
            "<th>Task Name</th> <th>Category</th> <th>Status</th><th>End Date</th><th></th>";
          for (let i = 0; i < pTodo.length; i++) {
            if (pTodo[i].category == "Work" || pTodo[i].category == "work") {
              if (pTodo[i].status != "Done") {
                rows =
                  rows +
                  `<tr> <td>${pTodo[i].name}</td><td>${
                    pTodo[i].category
                  }</td> <td>${
                    pTodo[i].status
                  }</td><td>${pTodo[i].endDate}</td><td><input onclick= "doneFun(this.id)" type="button" id=${done_count++} value="Done"></td></tr>`;
              }
            }
          }
          table.innerHTML = rows;
        }
        done_count = 0;
      } else if (value == "Pending") {
        let hide = document.getElementById("delete").style.display="none";
        let data = JSON.parse(window.localStorage.getItem("user"));
        for (let i = 0; i < data.length; i++) {
          if (data[i].u_name == current_user) {
            pTodo = data[i].pToDo;
          }
        }
        // console.log(pTodo.length);
        if (pTodo.length == 0) {
          document.getElementById("main_msg").innerHTML = "Please add To list";
        } else {
          // console.log(pTodo);
          taskname;
          endDate;
          category;
          reminderDate;

          let table = document.getElementById("display");
          let rows =
          "<th>Task Name</th> <th>Category</th> <th>Status</th><th>End Date</th><th></th>";
          for (let i = 0; i < pTodo.length; i++) {
            if (pTodo[i].status == "Pending" || pTodo[i].status == "pending") {
                rows =
                rows +
                `<tr> <td>${pTodo[i].name}</td><td>${
                  pTodo[i].category
                }</td> <td>${
                  pTodo[i].status
                }</td><td>${pTodo[i].endDate}</td><td><input onclick= "doneFun(this.id)" type="button" id=${done_count++} value="Done"></td></tr>`;
            }
          }
          table.innerHTML = rows;
        }
        done_count = 0;
      } else if (value == "Done") {
        let hide = document.getElementById("delete").style.display="none";

        let data = JSON.parse(window.localStorage.getItem("user"));
        for (let i = 0; i < data.length; i++) {
          if (data[i].u_name == current_user) {
            pTodo = data[i].pToDo;
          }
        }
        // console.log(pTodo.length);
        if (pTodo.length == 0) {
          document.getElementById("main_msg").innerHTML = "Please add To list";
        } else {
          // console.log(pTodo);
          taskname;
          endDate;
          category;
          reminderDate;

          let table = document.getElementById("display");
          let rows =
            "<th>Task Name</th> <th>Category</th> <th>Status</th><th></th>";
          for (let i = 0; i < pTodo.length; i++) {
            if (pTodo[i].status == "Done" || pTodo[i].status == "done") {
              rows =
                rows +
                `<tr> <td>${pTodo[i].name}</td><td>${pTodo[i].category}</td> <td>${pTodo[i].status}</td></tr>`;
            }
          }
          table.innerHTML = rows;
        }
        done_count = 0;
      } else if (value == "Due") {
        let hide = document.getElementById("delete").style.display="none";

        let data = JSON.parse(window.localStorage.getItem("user"));
        for (let i = 0; i < data.length; i++) {
          if (data[i].u_name == current_user) {
            pTodo = data[i].pToDo;
          }
        }
        if (pTodo.length == 0) {
          document.getElementById("main_msg").innerHTML = "Please add To list";
        } else {
          let today = new Date();
          let table = document.getElementById("display");
          let rows =
            "<th>Task Name</th> <th>Category</th> <th>Status</th><th>End Date</th>";
          for (let i = 0; i < pTodo.length; i++) {
            // console.log( pTodo[i].endDate );
            if (
              today > Date.parse(pTodo[i].endDate) &&
              pTodo[i].status != "Done"
            ) {
              pTodo[i];
              rows =
                rows +
                `<tr> <td>${pTodo[i].name}</td><td>${pTodo[i].category}</td> <td>${pTodo[i].status}</td><td>${pTodo[i].endDate}</td></tr>`;
            }
          }
          table.innerHTML = rows;
        }
      } else if (value == "all") {
        let hide = document.getElementById("delete").style.display="block";
        let data = JSON.parse(window.localStorage.getItem("user"));
        for (let i = 0; i < data.length; i++) {
          if (data[i].u_name == current_user) {
            pTodo = data[i].pToDo;
          }
        }
        if (pTodo.length == 0) {
          document.getElementById("main_msg").innerHTML = "Please add To list";
        } else {
          let table = document.getElementById("display");
          let rows =
            "<th>Select</th> <th>Task Name</th> <th>Category</th> <th>Status</th><th></th>";
          for (let i = 0; i < pTodo.length; i++) {
            if(pTodo[i].name != undefined)
            {
                rows = rows +`<tr><td><input type="checkbox" name="" id="${selectId++}"></td> <td>${pTodo[i].name}</td><td>${pTodo[i].category}</td> <td>${pTodo[i].status}</td></tr>`;
            }
          }
          table.innerHTML = rows;
        }
      }
    }
    function nameSeacrh() {
      document.getElementById("main_msg").innerText = "";
      let searchByNameCount = 0;
      let name = document.getElementById("taskSearch").value;
      if (name == "") {
        document.getElementById("main_msg").innerText =
          "Please enter a valid Task name";
      } else {
        let data = JSON.parse(window.localStorage.getItem("user"));
        for (let i = 0; i < data.length; i++) {
          if (data[i].u_name == current_user) {
            pTodo = data[i].pToDo;
          }
        }
        // console.log(pTodo.length);
        if (pTodo.length == 0) {
          document.getElementById("main_msg").innerHTML = "Please add To list";
        } else {
          // console.log(pTodo);
          taskname;
          endDate;
          category;
          reminderDate;

          let table = document.getElementById("display");
          let rows =
            "<th>Task Name</th> <th>Category</th> <th>Status</th><th></th>";
          for (let i = 0; i < pTodo.length; i++) {
            if (pTodo[i].name == name) {
              searchByNameCount++;
              rows =
                rows +
                `<tr> <td>${pTodo[i].name}</td><td>${
                  pTodo[i].category
                }</td> <td>${
                  pTodo[i].status
                }</td><td><input onclick= "doneFun(this.id)" type="button" id=${done_count++} value="Done"></td></tr>`;
            }
          }
          table.innerHTML = rows;
          if (searchByNameCount == 0) {
            document.getElementById("main_msg").innerHTML = "Task not found";
          }
        }
        done_count = 0;
      }
    }

    function doneFun(value) {
      let a;
      let b;
      let tempTodo;
      let table = document.getElementById("display");
      a = ++value;
      for (let i = 0; i < table.rows.length; i++) {
        if (i == a) {
          b = table.rows[i].cells[0].innerText;
        }
      }
      a = 0;
      let data = JSON.parse(window.localStorage.getItem("user"));
      for (let i = 0; i < data.length; i++) {
        if (data[i].u_name == current_user) {
          for (let j = 0; j < data[i].pToDo.length; j++) {
            if (data[i].pToDo[j].name == b) {
              data[i].pToDo[j].status = "Done";
              // console.log(data[i].pToDo[j].status);
            }
          }
        }
      }
      window.localStorage.setItem("user", JSON.stringify(data));
      location.reload();
      // console.log( tempTodo );
    }

    display();
  } catch (Error) {
    alert("No USer is registered");
    console.log(Error);
  }

  function reminder() {
    let date = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getYear();

    let div = document.getElementById("reminder");
    let data = JSON.parse(window.localStorage.getItem("user"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].u_name == current_user) {
        pTodo = data[i].pToDo;
      }
    }
    if (pTodo.length > 0) {
      // reminTable
      let reminTable = document.getElementById("reminTable");
      let rows = "";
      for (let i = 0; i < pTodo.length; i++) {
        if (pTodo[i].reminder != "" && pTodo[i].reminder != undefined ) {
          rows =
            rows +
            `<tr> <td>${pTodo[i].name}</td><td>${pTodo[i].reminder}</td></tr>`;
        }
      }
      reminTable.innerHTML = rows;
    }
  }

  function public() {
    let div = document.getElementById("public");
    let publictable = document.getElementById("pubTable");

    let data = JSON.parse(window.localStorage.getItem("user"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].u_name == current_user) {
        pTodo = data[i].pToDo;
      }
    }
    if (pTodo.length > 0) {
      let rows = "";
      for (let i = 0; i < pTodo.length; i++) {
        if (pTodo[i].public == "yes" || pTodo[i].public == "Yes") {
          rows =
            rows +
            `<tr> <td>${pTodo[i].name}</td><td>${pTodo[i].category}</td> <td>${pTodo[i].status}</td></tr>`;
        }
      }
      publictable.innerHTML = rows;
    }
  }
  function deletee()
  {
    let all = document.getElementById("all");
    let temp = [];
    let delet = [];
    let data = JSON.parse(window.localStorage.getItem("user"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].u_name == current_user) {
        pTodo = data[i].pToDo;
      }
    }
  
    if(all.checked)
    {
        for(let i =0 ; i < pTodo.length ; i++)
        {
            let task = document.getElementById(i);
            if(task !=null)
            {
                if(task.checked && task != null)
                {
                    delet.push(i);
                }
            }
        }
        for(let i=0,k=0; i < pTodo.length ; i++)
        {
            let flag = false;
            for(let j=0; j < delet.length; j++ )
            {
                if(i == delet[j])
                {
                    flag = true;
                }
            }
            if(flag == false)
            {
                temp[k] = pTodo[i];
                k++;
            }
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].u_name == current_user) {
               data[i].pToDo = temp;
            }
          }
        window.localStorage.setItem('user',JSON.stringify(data)); 
        document.getElementById("main_msg").innerHTML = "Deleted the selected tasks"; 
        display();
    }
    else{
    document.getElementById("main_msg").innerHTML = "Please select all category to delete tasks";
    }
  }
  categ("all");
}
