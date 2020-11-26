let session = localStorage.getItem("loggedIn");
let currentUser;
if (session == null) {
  let a = document.createElement("a");
  a.href = "index.html";
  a.click();
} else {
  
  currentUser = localStorage.getItem("Current_user");
  let taskName;
  let remRadio;
  let remDate;
  let public;
  let endDate;
  let category;
  let countId = 0;
  let deleteCounter = 0;

  let today = new Date().toISOString().split("T")[0];

  let toDo = [];
  
  function remindDate(value) {
    // console.log(value);
    if (value == "yes") {
      let a = document.getElementsByClassName("r_date");
      // console.log(a[0]);
      a[0].style.display = "inline";
      a[1].style.display = "inline";
      remDate = a[1].value;
    } else {
      let a = document.getElementsByClassName("r_date");
      // console.log(a[0]);
      a[0].style.display = "none";
      a[1].style.display = "none";
    }
    // a.style.display = "inline-block";
  }
  function isPublic(value) {
    if (value == "yes") {
      public = "yes";
    } else {
      public = "no";
    }
  }

  function deletee() {
    let selectBox = false;
    let start = countId;
    if (document.getElementById(countId - 1) != null) {
      let myTab = document.getElementById("list_t");
      let deleteList = [];
      let delC = 0;
      // console.log(countId);
      for (let index = 0; index < countId; index++) {
        let a = document.getElementById(index);
        if(a != null)
        {
          if (a.checked) {
            selectBox = true;
          }
        }
      }
      if (selectBox) {
        let conVal = confirm("Are you sure to delete ?");
        if (conVal) {
          for (let index = 0; index < countId; index++) {
            let a = document.getElementById(index);
            if (a.checked) {
              deleteList.push(index);
              myTab.deleteRow(index - delC);
              delC++; 
              deleteCounter++;
            }
          }
          countId--;
        } else {
          location.reload();
        }
      }
    } else {
      document.getElementById("errorMsg").innerText = "Select a Task";
      document.getElementById("errorMsg").style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById("errorMsg").innerHTML = "";
        document.getElementById("errorMsg").style.backgroundColor = "";
      }, 1500);
    }
    if(start == countId)
    {
      document.getElementById("errorMsg").innerText = "Select a Task to delete";
      document.getElementById("errorMsg").style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById("errorMsg").innerHTML = "";
        document.getElementById("errorMsg").style.backgroundColor = "";
      }, 1500);
    }
  }

  function Confirm() {
    countId = countId - deleteCounter;
    let newTodo = [];
    let error = false;
    let errorLine = 0;
    let taskname;
    let enddate;
    let categ;
    let remindate;
    let publc;
    let confirm ;

    let rowCounter = 0;
    let data = JSON.parse(window.localStorage.getItem("user"));
    let deleteList = [];
    let userTodo;
    let editedTodo = [];
    // console.log("total count id" +countId);
    for (let index = 0; index < countId; index++) {
      let a = document.getElementById(index);
      if (a.checked) {
        // console.log("true");
        deleteList.push(index);
      }
    }
    // console.log(deleteList);

    for (let i = 0; i < data.length; i++) {
      if (data[i].u_name == currentUser) {
        userTodo = data[i].toDo;
      }
    }

    let getData = document.getElementsByClassName("name");
    // console.log(getData);

    let myTab = document.getElementById("list_t");
    // console.log(myTab);

    for (let i = 0; i < myTab.rows.length; i++) {
      // console.log(myTab.rows[i]);
      let localCounter = 0;
      if(error == true)
      {
        break;
      }
      let tCells = myTab.rows.item(i).cells;
      for (let j = 0; j < tCells.length; j++) {
        if (localCounter == 0 ) {
          let a = tCells.item(j);
          let b = a.childNodes[0].value;
          // console.log("name"+b);
          localCounter++;
        } else if (localCounter == 1) {
          let a = tCells.item(j);
          let b = a.childNodes[0].value;
          if(b=="")
          {  
            error = true;
            errorLine = i;
          }
          taskname = b;
          localCounter++;
        } else if (localCounter == 2) {
          let a = tCells.item(j);
          let b = a.childNodes[0].value;
          if(b=="")
          {  
            error = true;
            errorLine = i;
          }
          // console.log("End date"+b);
          enddate = b;
          localCounter++;
        } else if (localCounter == 3) {
          let catReg =  /^(?:Work|work|Personal|personal)$/;
          let a = tCells.item(j);
          let b = a.childNodes[0].value;
          if(b=="" || !(catReg.test(b)) )
          {  
            error = true;
            errorLine = i;
          }
          // console.log("Category"+b);
          categ = b;
          localCounter++;
        } else if (localCounter == 4) {
          let a = tCells.item(j);
          let b = a.childNodes[0].value;
          // console.log("Reminder date"+b);
          remindDate = b;
          localCounter++;
        } else if (localCounter == 5) {
          let pubReg =  /^(?:Yes|yes|No|no)$/;
          let a = tCells.item(j);
          let b = a.childNodes[0].value;
          if(b==""|| !(pubReg.test(b)))
          {  
            error = true;
            errorLine = i;
          }
          // console.log("Is public"+b);
          publc = b;
          localCounter++;
        }
      }
      let temp = {
        name: taskname,
        endDate: enddate,
        category: categ,
        status: "pending",
        reminder: remindDate,
        public: publc,
      };
      // newTodo.push(temp);
      for (let i = 0; i < data.length; i++) {
        if (data[i].u_name == currentUser) {
          data[i].pToDo.push(temp);
          // console.log(data[i].toDo);
          confirm = data[i].pToDo;
        }
      }

      // console.log(rowCounter++);
    }
    if(!error)
    {

      for (let i = 0; i < data.length; i++) {
        if (data[i].u_name == currentUser) {
          data[i].toDo = [];
        }
      }
      if(confirm != undefined)
      {
        alert("Succesfully saved data");
        window.location = "dashboard.html";
      }
      else
      {
        document.getElementById("errorMsg").innerText = "Nothing to save, Please add some task first";
        document.getElementById("errorMsg").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("errorMsg").innerHTML = "";
          document.getElementById("errorMsg").style.backgroundColor = "";
        }, 1500);
      }
      countId = 0;
      deleteCounter = 0;
      window.localStorage.setItem("user", JSON.stringify(data));
    }
    else
    {
          document.getElementById("errorMsg").innerText = `Error at task line ${errorLine+1}`;
          document.getElementById("errorMsg").style.backgroundColor = "red";
          setTimeout(() => {
            document.getElementById("errorMsg").innerHTML = "";
            document.getElementById("errorMsg").style.backgroundColor = "";
          }, 1500);
    }
  }

  function add() {
    let mainUl = document.getElementById("edit_unorderList");
    let data = JSON.parse(window.localStorage.getItem("user"));
    let correct = true;

    taskName = document.getElementById("tasks").value;
    endDate = document.getElementById("e_date").value;
    document.getElementById("e_date").setAttribute("min", new Date());

    let today = new Date();
    remRadio = document.getElementsByClassName("r_date");
    remDate = remRadio[1].value;
    let rad = document.getElementsByName("rem");
    let pubRadio = document.getElementsByName("pub");

    category = document.getElementById("priority").value;
    console.log(taskName + endDate + category);
    if(taskName != "")
    {
      let ptodo;
      let todo;
      for(let i =0 ; i < data.length ; i++ )
      {
        if(currentUser == data[i].u_name)
        {
          ptodo = data[i].pToDo;
          todo = data[i].toDo;
        }
      }
      
      if(ptodo != undefined)
      {
        for(let i =0 ; i< ptodo.length ; i++)
        {
          if(taskName == ptodo[i].name)
          {
            correct = false;
            document.getElementById("errorMsg").innerText = "Task name already exists";
            document.getElementById("errorMsg").style.backgroundColor = "red";
            setTimeout(() => {
              document.getElementById("errorMsg").innerHTML = "";
              document.getElementById("errorMsg").style.backgroundColor = "";
            }, 1500);
  
          }
        }
      }
      
      if(todo != undefined)
      {
        for(let i =0 ; i< todo.length ; i++)
        {
            if(taskName == todo[i].name)
            {
              correct = false;
              document.getElementById("errorMsg").innerText = "Task name already exists";
              document.getElementById("errorMsg").style.backgroundColor = "red";
              setTimeout(() => {
                document.getElementById("errorMsg").innerHTML = "";
                document.getElementById("errorMsg").style.backgroundColor = "";
              }, 1500);
            }
        }
      }

    }

    if (taskName == "") {
      currentUser = 
      document.getElementById("errorMsg").innerText = "Please enter task name";
      document.getElementById("errorMsg").style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById("errorMsg").innerHTML = "";
        document.getElementById("errorMsg").style.backgroundColor = "";
      }, 1500);
      correct = false;
    } else if (endDate == "") {
      document.getElementById("errorMsg").innerText = "Please select date";
      document.getElementById("errorMsg").style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById("errorMsg").innerHTML = "";
        document.getElementById("errorMsg").style.backgroundColor = "";
      }, 1500);
      correct = false;
    } else if (Date.parse(endDate) <= today) {
      document.getElementById("errorMsg").innerText =
        "Please select date greater tha today";
      document.getElementById("errorMsg").style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById("errorMsg").innerHTML = "";
        document.getElementById("errorMsg").style.backgroundColor = "";
      }, 1500);
      correct = false;
    } else if (category == "") {
      document.getElementById("errorMsg").innerText = "Please enter category";
      document.getElementById("errorMsg").style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById("errorMsg").innerHTML = "";
        document.getElementById("errorMsg").style.backgroundColor = "";
      }, 1500);
      correct = false;
    } else if (rad[0].checked == false && rad[1].checked == false) {
      document.getElementById("errorMsg").innerText =
        "Please select yes/no for reminder";
      document.getElementById("errorMsg").style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById("errorMsg").innerHTML = "";
        document.getElementById("errorMsg").style.backgroundColor = "";
      }, 1500);
      correct = false;
    } else if (pubRadio[0].checked == false && pubRadio[1].checked == false) {
      document.getElementById("errorMsg").innerText =
        "Please select yes/no for public";
      document.getElementById("errorMsg").style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById("errorMsg").innerHTML = "";
        document.getElementById("errorMsg").style.backgroundColor = "";
      }, 1500);
      correct = false;
    } else if (rad[0].checked == true && remDate == "") {
      document.getElementById("errorMsg").innerText =
        "Please select reminder date";
      document.getElementById("errorMsg").style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById("errorMsg").innerHTML = "";
        document.getElementById("errorMsg").style.backgroundColor = "";
      }, 1500);
      correct = false;
    } else if (rad[0].checked == true && Date.parse(remDate) < today) {
      document.getElementById("errorMsg").innerText =
        "Please select reminder date greater tha today";
      document.getElementById("errorMsg").style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById("errorMsg").innerHTML = "";
        document.getElementById("errorMsg").style.backgroundColor = "";
      }, 1500);
      correct = false;
    } else if (
      rad[0].checked == true &&
      Date.parse(remDate) >= Date.parse(endDate)
    ) {
      document.getElementById("errorMsg").innerText =
        "Please select reminder date less than end date";
      document.getElementById("errorMsg").style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById("errorMsg").innerHTML = "";
        document.getElementById("errorMsg").style.backgroundColor = "";
      }, 1500);
      correct = false;
    }

    if (correct) {
      let task = {
        name: taskName,
        endDate: endDate,
        category: category,
        status: "pending",
        reminder: remDate,
        public: public,
      };
      toDo.push(task);
      console.log("The current user is"+currentUser);
      for (let i = 0; i < data.length; i++) {
        if (data[i].u_name == currentUser) {
          data[i].toDo.push(task);
          // console.log(data[i].toDo);
        }
      }
      task = null;

      window.localStorage.setItem("user", JSON.stringify(data));

      document.getElementById("errorMsg").innerText = "Sucessfully Added Task";
      document.getElementById("errorMsg").style.backgroundColor = "green";
      setTimeout(() => {
        document.getElementById("errorMsg").innerHTML = "";
        document.getElementById("errorMsg").style.backgroundColor = "";
      }, 1500);
      document.getElementById("remDate").value = "";
      document.getElementById("e_date").value = "";

      let sendData = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].u_name == currentUser) {
          sendData = data[i].toDo;
        }
      }
      display();
    }
  }
  function display() {
    countId = 0;
    let rowTable = "";
    let toDoRawData = [];
    let mainUl = document.getElementById("edit_unorderList");
    let data = JSON.parse(window.localStorage.getItem("user"));

    for (let i = 0; i < data.length; i++) {
      // console.log("In disp user find loop");
      if (data[i].u_name == currentUser) {
        toDoRawData = data[i].toDo;
      }
    }
    
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";

    let taskInput = document.createElement("input");
    taskInput.type = "text";

    let endDate = document.createElement("input");
    endDate.type = "date";

    let tCategory = document.createElement("input");
    tCategory.type = "text";
    tCategory.title = "Please enter only Personal or Work";

    let remDate = document.createElement("input");
    remDate.type = "date";

    let pubSelect = document.createElement("input");
    pubSelect.type = "text";
    pubSelect.title = "Please Enter yes or no";
    
    for (let i = 0; i < toDoRawData.length; i++) {
      taskInput.value = toDoRawData[i].name;
      endDate.value = toDoRawData[i].endDate;
      tCategory.value = toDoRawData[i].category;
      remDate.value = toDoRawData[i].reminder;
      pubSelect.value = toDoRawData[i].public;

      rowTable =
        rowTable +
        `<tr><td><input type="checkbox" name="" id="${countId++}"> </td>  <td><input type="text" class="name" value="${
          taskInput.value
        }" name="" id=""></td>  <td><input type="date" class="name" value="${
          endDate.value
        }" name="" id=""></td> <td><input type="text" class="name" value="${
          tCategory.value
        }" name="" id=""></td><td><input type="date" class="name" value="${
          remDate.value
        }" name="" id=""></td>  <td><input type="text" class="name" value="${
          pubSelect.value
        }" name="" id=""></td> `;
    }
    document.getElementById("list_t").innerHTML = rowTable;
  }
  
}
