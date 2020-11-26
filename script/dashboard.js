let session = localStorage.getItem("loggedIn");
if (session == null) {
  let a = document.createElement("a");
  a.href = "index.html";
  a.click();
} else {
  // console.log("Hello this is dash borad");
  let currentUser = localStorage.getItem("Current_user");
  let searchBox = document.getElementById("taskSearch");
  let count = 0;
  let flag = false;
  let nameCount = 0;
  let pTodo;

  let taskName;
  let endDate;
  let category;
  let reminderDate;
  let doneCount = 0;

  // console.log("the current user is "+ currentUser);
  let greet = `Welcome ${currentUser}`;

  try {
    let data = JSON.parse(window.localStorage.getItem("user"));
    // console.log("In dashboard page");

    let firstName;
    let lastName;
    let address;
    let gender;
    let profile;
    let tempGender;

    for (let i = 0; i < data.length; i++) {
      if (currentUser == data[i].u_name) {
        firstName = addTask(data[i].f_Name);
        lastName = addTask(data[i].l_name);
        address = addTask(data[i].addr);
        gender = addTask(data[i].gen);
        tempGender = data[i].gen;
        profile = data[i].img;
        active_user = data[i].u_name;
      }
    }

    window.onload = function () {
      document.getElementById("profile").src = profile;
      let unorderedList = document.getElementById("user_detailss");
      unorderedList.appendChild(firstName);
      unorderedList.appendChild(lastName);
      unorderedList.appendChild(gender);
      unorderedList.appendChild(address);

      document.getElementById("taskSearch").value = "";
      if (tempGender == "Male") {
        document.getElementById("male").selected = true;
      } else if (tempGender == "Female") {
        document.getElementById("female").selected = true;
      } else if (tempGender == "Other") {
        document.getElementById("other").selected = true;
      }
      public();
      reminder();
    };

    searchBox.addEventListener("keyup", function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("searchBtn").click();
      }
    });

    function addTask(object) {
      // console.log("workjing"+object);
      let editInput;
      let label = document.createElement("label");

      if (nameCount == 0) {
        editInput = document.createElement("input"); //text
        editInput.type = "text";
        editInput.value = object;

        label.innerText = "First Name ";
        editInput.className = "FirstName";
        nameCount++;
      } else if (nameCount == 1) {
        editInput = document.createElement("input"); //text
        editInput.type = "text";
        editInput.value = object;

        label.innerText = "Last Name ";
        editInput.className = "LastName";
        nameCount++;
      } else if (nameCount == 2) {
        editInput = document.createElement("TEXTAREA"); //text
        editInput.type = "text";
        editInput.value = object;

        label.innerText = "Address ";
        label.id = "addressLabel";
        editInput.className = "Address";
        nameCount++;
      } else if (nameCount == 3) {
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
        nameCount++;
        editInput.className = "Gender";
      }

      let listItem = document.createElement("li");
      listItem.appendChild(label);
      listItem.appendChild(editInput);
      return listItem;
    }
    function showProfile() {
      let box = document.getElementById("userbox");
      box.style.display = "inline-block";
      document.getElementById("editBtn").style.display = "none";
    }

    function reset() {
      let fName = firstName.children[1].value;
      let lName = lastName.children[1].value;
      let addr = address.children[1].value;

      if (fName == "" && lName == "" && addr == "") {
        document.getElementById("main_msg").innerText =
          "Please enter first name , last name and address";
        document.getElementById("main_msg").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("main_msg").innerHTML = "";
          document.getElementById("main_msg").style.backgroundColor = "";
        }, 1500);
      } else if (lName == "") {
        document.getElementById("main_msg").innerText =
          "last name cannot be empty";
        document.getElementById("main_msg").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("main_msg").innerHTML = "";
          document.getElementById("main_msg").style.backgroundColor = "";
        }, 1500);
      } else if (addr == "") {
        document.getElementById("main_msg").innerText =
          "Address cannot be empty";
        document.getElementById("main_msg").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("main_msg").innerHTML = "";
          document.getElementById("main_msg").style.backgroundColor = "";
        }, 1500);
      } else if (fName == "") {
        document.getElementById("main_msg").innerText =
          "Please enter first name";
        document.getElementById("main_msg").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("main_msg").innerHTML = "";
          document.getElementById("main_msg").style.backgroundColor = "";
        }, 1500);
      } else {
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

        for (let i = 0; i < data.length; i++) {
          if (currentUser == data[i].u_name) {
            // console.log("reset data found");
            data[i].f_Name = firstName.children[1].value;
            data[i].l_name = lastName.children[1].value;
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
        document.getElementById("main_msg").innerText =
          "Profile Updated Successfully";
        document.getElementById("main_msg").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("main_msg").innerHTML = "";
          document.getElementById("main_msg").style.backgroundColor = "";
        }, 1500);
        setTimeout(() => {
          location.reload();
        }, 1500);
      }
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
      if (imageReg.test(changePicInput.value)) {
        let reader = new FileReader();
        reader.readAsDataURL(changePicInput.files[0]);
        reader.onloadend = function (event) {
          let Image = document.getElementById("profileChange");
          Image.src = event.target.result;
        };
      } else {
        document.getElementById("main_msg").innerText =
          "Select image with jpeg ,jpg ,png etc extions only";
        document.getElementById("main_msg").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("main_msg").innerHTML = "";
          document.getElementById("main_msg").style.backgroundColor = "";
        }, 1500);
      }
    }
    function display() {
      let data = JSON.parse(window.localStorage.getItem("user"));
      for (let i = 0; i < data.length; i++) {
        if (data[i].u_name == currentUser) {
          pTodo = data[i].pToDo;
        }
      }
      // console.log(pTodo.length);
      if (pTodo.length == 0) {
        document.getElementById("main_msg").innerHTML =
          "Please add task To the list";
        document.getElementById("main_msg").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("main_msg").innerHTML = "";
          document.getElementById("main_msg").style.backgroundColor = "";
        }, 1500);
      } else {
        // console.log(pTodo);
        taskName;
        endDate;
        category;
        reminderDate;

        let table = document.getElementById("display");
        let rows =
          "<th>Task Name</th> <th>Category</th> <th>Status</th><th></th>";
        for (let i = 0; i < pTodo.length; i++) {
          if (pTodo[i].name != undefined) {
            rows =
              rows +
              `<tr> <td>${pTodo[i].name}</td><td>${
                pTodo[i].category
              }</td> <td>${
                pTodo[i].status
              }</td><td><input onclick= "doneFun(this.id)" type="button" id=${doneCount++} value="Done"></td></tr>`;
          }
        }
        table.innerHTML = rows;
      }
      doneCount = 0;
      categ("all");
    }

    function stat() {
      let radio = document.getElementsByName("cat");
      let checkBox = document.getElementsByName("status");
      let table = document.getElementById("display");
      let rows =
        "<th>Task Name</th> <th>Category</th> <th>Status</th><th>End Date</th><th></th>";
      let data = JSON.parse(window.localStorage.getItem("user"));
      let doneCount = 0;
      let today = new Date();
      let fetch = false;

      document.getElementById("nothing").innerText = "";
      for (let i = 0; i < data.length; i++) {
        if (data[i].u_name == currentUser) {
          pTodo = data[i].pToDo;
        }
        for (let i = 0; i < radio.length; i++) {
          radio[i].checked = false;
        }
      }
      if (pTodo.length == 0) {
        let table = document.getElementById("display");
        let rows =
          "<th>Task Name</th> <th>Category</th> <th>Status</th><th>End Date</th><th></th>";
        table.innerHTML = rows;
        document.getElementById("nothing").innerText = "No data to show";
        document.getElementById("main_msg").innerHTML = "Please add To list";
        document.getElementById("main_msg").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("main_msg").innerHTML = "";
          document.getElementById("main_msg").style.backgroundColor = "";
        }, 1500);
      } else {
        for (let i = 0; i < checkBox.length; i++) {
          if (checkBox[i].checked) {
            if (checkBox[i].id == "pending") {
              for (let i = 0; i < pTodo.length; i++) {
                if (
                  pTodo[i].status == "Pending" ||
                  pTodo[i].status == "pending"
                ) {
                  rows =
                    rows +
                    `<tr> <td>${pTodo[i].name}</td><td>${
                      pTodo[i].category
                    }</td> <td>${pTodo[i].status}</td><td>${
                      pTodo[i].endDate
                    }</td><td><input onclick= "doneFun(this.id)" type="button" id=${doneCount++} value="Done"></td></tr>`;
                }
              }
            } else if (checkBox[i].id == "done") {
              for (let i = 0; i < pTodo.length; i++) {
                if (pTodo[i].status == "done" || pTodo[i].status == "Done") {
                  rows =
                    rows +
                    `<tr> <td>${pTodo[i].name}</td><td>${pTodo[i].category}</td> <td>${pTodo[i].status}</td><td>${pTodo[i].endDate}</td><td></td></tr>`;
                }
              }
            } else if (checkBox[i].id == "due") {
              for (let i = 0; i < pTodo.length; i++) {
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
            }
          }
        }
        table.innerHTML = rows;
        if (rows.length == 78) {
          document.getElementById("nothing").innerText = "No data to show";
        }
      }

      //
      //
    }
    function categ(value) {
      let checkBox = document.getElementsByName("status");
      let selectId = 0;

      document.getElementById("nothing").innerText = "";
      for (let o = 0; o < checkBox.length; o++) {
        checkBox[o].checked = false;
      }
      if (value == "Personal") {
        let data = JSON.parse(window.localStorage.getItem("user"));
        for (let i = 0; i < data.length; i++) {
          if (data[i].u_name == currentUser) {
            pTodo = data[i].pToDo;
          }
        }
        // console.log(pTodo.length);
        if (pTodo.length == 0) {
          let table = document.getElementById("display");
          let rows =
            "<th>Task Name</th> <th>Category</th> <th>Status</th><th>End Date</th><th></th>";
          table.innerHTML = rows;
          document.getElementById("nothing").innerText = "No data to show";
          document.getElementById("main_msg").innerHTML = "Please add To list";
          document.getElementById("main_msg").style.backgroundColor = "red";
          setTimeout(() => {
            document.getElementById("main_msg").innerHTML = "";
            document.getElementById("main_msg").style.backgroundColor = "";
          }, 1500);
        } else {
          // console.log(pTodo);
          taskName;
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
                  }</td> <td>${pTodo[i].status}</td><td>${
                    pTodo[i].endDate
                  }</td><td><input onclick= "doneFun(this.id)" type="button" id=${doneCount++} value="Done"></td></tr>`;
              }
            }
          }
          if (rows.length == 78) {
            document.getElementById("nothing").innerText = "No data to show";
          }
          table.innerHTML = rows;
        }
        doneCount = 0;
      } else if (value == "work") {
        let data = JSON.parse(window.localStorage.getItem("user"));
        for (let i = 0; i < data.length; i++) {
          if (data[i].u_name == currentUser) {
            pTodo = data[i].pToDo;
          }
        }
        // console.log(pTodo.length);
        if (pTodo.length == 0) {
          let table = document.getElementById("display");
          let rows =
            "<th>Task Name</th> <th>Category</th> <th>Status</th><th>End Date</th><th></th>";
          table.innerHTML = rows;
          document.getElementById("nothing").innerText = "No data to show";
          document.getElementById("main_msg").innerHTML = "Please add To list";
          document.getElementById("main_msg").style.backgroundColor = "red";
          setTimeout(() => {
            document.getElementById("main_msg").innerHTML = "";
            document.getElementById("main_msg").style.backgroundColor = "";
          }, 1500);
        } else {
          // console.log(pTodo);
          taskName;
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
                  }</td> <td>${pTodo[i].status}</td><td>${
                    pTodo[i].endDate
                  }</td><td><input onclick= "doneFun(this.id)" type="button" id=${doneCount++} value="Done"></td></tr>`;
              }
            }
          }
          if (rows.length == 78) {
            document.getElementById("nothing").innerText = "No data to show";
          }
          if (rows.length == 78) {
            document.getElementById("nothing").innerText = "No data to show";
          }
          table.innerHTML = rows;
        }
        doneCount = 0;
      } else if (value == "all") {
        let data = JSON.parse(window.localStorage.getItem("user"));
        for (let i = 0; i < data.length; i++) {
          if (data[i].u_name == currentUser) {
            pTodo = data[i].pToDo;
          }
        }
        if (pTodo.length == 0) {
          let table = document.getElementById("display");
          let rows =
            "<th>Task Name</th> <th>Category</th> <th>Status</th><th></th>";
          table.innerHTML = rows;
          document.getElementById("main_msg").innerHTML = "Please add To list";
          document.getElementById("main_msg").style.backgroundColor = "red";
          setTimeout(() => {
            document.getElementById("main_msg").innerHTML = "";
            document.getElementById("main_msg").style.backgroundColor = "";
          }, 1500);
          document.getElementById("nothing").innerText = "No data to show";
        } else {
          let table = document.getElementById("display");
          let rows =
            "<th>Task Name</th> <th>Category</th> <th>Status</th><th></th>";
          for (let i = 0; i < pTodo.length; i++) {
            if (pTodo[i].name != undefined) {
              rows =
                rows +
                `<tr><td>${pTodo[i].name}</td><td>${pTodo[i].category}</td> <td>${pTodo[i].status}</td></tr>`;
            }
          }
          if (rows.length == 78) {
            document.getElementById("nothing").innerText = "No data to show";
          }
          table.innerHTML = rows;
        }
      }
    }
    function nameSeacrh() {
      let searchByNameCount = 0;
      let name = document.getElementById("taskSearch").value;
      let nameReg = new RegExp(name, "gi");
      if (name == "") {
        document.getElementById("main_msg").innerText =
          "Please enter a valid Task name";
        document.getElementById("main_msg").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("main_msg").innerHTML = "";
          document.getElementById("main_msg").style.backgroundColor = "";
        }, 1500);
      } else {
        let data = JSON.parse(window.localStorage.getItem("user"));
        for (let i = 0; i < data.length; i++) {
          if (data[i].u_name == currentUser) {
            pTodo = data[i].pToDo;
          }
        }
        // console.log(pTodo.length);
        if (pTodo.length == 0) {
          document.getElementById("main_msg").innerHTML = "Please add To list";
          document.getElementById("main_msg").style.backgroundColor = "red";
          setTimeout(() => {
            document.getElementById("main_msg").innerHTML = "";
            document.getElementById("main_msg").style.backgroundColor = "";
          }, 1500);
        } else {
          // console.log(pTodo);
          taskName;
          endDate;
          category;
          reminderDate;

          let nameRegEx = /`${name}`/g;
          let table = document.getElementById("display");
          let rows =
            "<th>Task Name</th> <th>Category</th> <th>Status</th><th></th>";
          for (let i = 0; i < pTodo.length; i++) {
            if (nameReg.test(pTodo[i].name)) {
              searchByNameCount++;
              rows =
                rows +
                `<tr> <td>${pTodo[i].name}</td><td>${
                  pTodo[i].category
                }</td> <td>${
                  pTodo[i].status
                }</td><td><input onclick= "doneFun(this.id)" type="button" id=${doneCount++} value="Done"></td></tr>`;
            }
          }
          table.innerHTML = rows;
          if (rows.length == 61) {
            document.getElementById("main_msg").innerHTML = "Task not found";
            document.getElementById("main_msg").style.backgroundColor = "red";
            setTimeout(() => {
              document.getElementById("main_msg").innerHTML = "";
              document.getElementById("main_msg").style.backgroundColor = "";
            }, 1500);
          }
        }
        doneCount = 0;
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
        if (data[i].u_name == currentUser) {
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
    let reminTable = document.getElementById("reminTable");
    let div = document.getElementById("reminder");
    let data = JSON.parse(window.localStorage.getItem("user"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].u_name == currentUser) {
        pTodo = data[i].pToDo;
      }
    }
    if (pTodo.length > 0) {
      // reminTable

      let rows = "  <th>Task Name</th> <th>Reminder Date</th>";
      for (let i = 0; i < pTodo.length; i++) {
        if (pTodo[i].reminder != "" && pTodo[i].reminder != undefined) {
          rows =
            rows +
            `<tr> <td>${pTodo[i].name}</td><td>${pTodo[i].reminder}</td></tr>`;
        }
      }
      reminTable.innerHTML = rows;
      if (rows.length == 43) {
        reminTable.innerHTML = "<tr><td>No data to show</td></tr>";
      }
    } else {
      rows =
        "<th>Task Name</th> <th>Category</th> <th>Status</th><th>End Date</th><th></th>";
        reminTable.innerHTML = rows;
      reminTable.innerHTML = "<tr><td>No data to show</td></tr>";
    }
  }
  function find() {
    let radio = document.getElementsByName("cat");
    let checkBox = document.getElementsByName("status");
    document.getElementById("nothing").innerText = "";
    let startDate = document.getElementById("start").value;
    let endDate = document.getElementById("end").value;
    let data = JSON.parse(window.localStorage.getItem("user"));
    let todo;
    let table = document.getElementById("display");
    let doneCount = 0;
  
    for(let i=0 ; i < radio.length ; i++)
    {
      radio[i].checked = false;
      checkBox[i].checked = false;

    }


    if(startDate =="" && endDate=="")
    {
      document.getElementById("main_msg").innerHTML = "Please select start date and end date";
      document.getElementById("main_msg").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("main_msg").innerHTML = "";
          document.getElementById("main_msg").style.backgroundColor = "";
        }, 1500);
    }
    else if( startDate =="")
    {
      document.getElementById("main_msg").innerHTML = "Please select start date";
      document.getElementById("main_msg").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("main_msg").innerHTML = "";
          document.getElementById("main_msg").style.backgroundColor = "";
        }, 1500);
    }
    else if( endDate =="")
    {
      document.getElementById("main_msg").innerHTML = "Please select end date";
      document.getElementById("main_msg").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("main_msg").innerHTML = "";
          document.getElementById("main_msg").style.backgroundColor = "";
        }, 1500);
    }
    else if(Date.parse(startDate) >= Date.parse(endDate)   )
    {
      document.getElementById("main_msg").innerHTML = "Please select start date less than end date";
      document.getElementById("main_msg").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("main_msg").innerHTML = "";
          document.getElementById("main_msg").style.backgroundColor = "";
        }, 1500);
    } 

   else
    {
      for (let i = 0; i < data.length; i++) {
        if (data[i].u_name == currentUser) {
          todo = data[i].pToDo;
        }
      }
      if (todo.length > 0) {
        let rows =
          "<th>Task Name</th> <th>Category</th> <th>Status</th><th>End Date</th><th></th>";
        for (let i = 0; i < todo.length; i++) {
          if (
            Date.parse(todo[i].endDate) >= Date.parse(startDate) &&
            Date.parse(todo[i].endDate) <= Date.parse(endDate) &&
            todo[i].status != "Done"
          ) {
            rows =
              rows +
              `<tr> <td>${todo[i].name}</td><td>${todo[i].category}</td> <td>${
                pTodo[i].status
              }</td><td>${
                todo[i].endDate
              }</td><td><input onclick= "doneFun(this.id)" type="button" id=${doneCount++} value="Done"></td></tr>`;
          }
        }
        table.innerHTML = rows;
        if(rows.length == 78)
        {
          document.getElementById("nothing").innerText = "No data to show";
        }
      } else {
        let rows =
          "<th>Task Name</th> <th>Category</th> <th>Status</th><th>End Date</th><th></th>";
        table.innerHTML = rows;
        document.getElementById("nothing").innerText = "No data to show";
        document.getElementById("main_msg").innerHTML = "Please add To list";
        document.getElementById("main_msg").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("main_msg").innerHTML = "";
          document.getElementById("main_msg").style.backgroundColor = "";
        }, 1500);
      }

    }

  }

  function public() {
    let div = document.getElementById("public");
    let publictable = document.getElementById("pubTable");
    let data = JSON.parse(window.localStorage.getItem("user"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].u_name == currentUser) {
        pTodo = data[i].pToDo;
      }
    }
    if (pTodo.length > 0) {
      let rows = "  <th>Task Name</th> <th>Category</th> <th>Status </th>";
      for (let i = 0; i < pTodo.length; i++) {
        if (pTodo[i].public == "yes" || pTodo[i].public == "Yes") {
          rows =
            rows +
            `<tr> <td>${pTodo[i].name}</td><td>${pTodo[i].category}</td> <td>${pTodo[i].status}</td></tr>`;
        }
      }
      publictable.innerHTML = rows;
      if (rows.length == 55) {
        publictable.innerHTML = "<tr><td>No data to show</td></tr>";
      }
    } else {
      publictable.innerHTML = "<tr><td>No data to show</td></tr>";
    }
  }
  categ("all");
}
