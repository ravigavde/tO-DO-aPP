let name = [];
let flag = false;
let count = 0;

let current_user = localStorage.getItem("Current_user");

let session = localStorage.getItem("loggedIn");
if (session == null) {
  let data = JSON.parse(window.localStorage.getItem("user"));
  let inpute = document.getElementById("pass");
  inpute.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("route_dashboard").click();
    }
  });

  if (data != null) {
    for (let i = 0; i < data.length; i++) {
      //    console.log(data[i].pass +" "+data[i].u_name);
    }
  } else {
    //    document.getElementById("error").innerHTML = "No User is registered, Please create your account";
  }

  function verify() {
    let username = document.getElementById("username").value;
    let password = encrpyt(document.getElementById("pass").value);

    if (username == "" && password == "") {
      document.getElementById("error").innerHTML =
        "Please enter username and password";
      document.getElementById("error").style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
        document.getElementById("error").style.backgroundColor = "";
      }, 1500);
    } else if (username == "") {
      document.getElementById("error").innerHTML = "Please enter username";
      document.getElementById("error").style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
        document.getElementById("error").style.backgroundColor = "";
      }, 1500);
    } else if (password == "") {
      document.getElementById("error").innerHTML = "Please enter password";
      document.getElementById("error").style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
        document.getElementById("error").style.backgroundColor = "";
      }, 1500);
    } else if (data != null) {
      let a = false;
      for (let i = 0; i < data.length; i++) {
        if (username == data[i].u_name && password == data[i].pass) {
          // console.log("user found "+data[i].pass +" "+data[i].u_name);
          a = true;
          // name.push(data[i].u_name);
          localStorage.setItem("Current_user", data[i].u_name);
          localStorage.setItem("loggedIn", data[i].u_name);
        }
      }
      if (a == false) {
        document.getElementById("error").innerHTML =
          "User not found please check username/password";
        document.getElementById("error").style.backgroundColor = "red";
        setTimeout(() => {
          document.getElementById("error").innerHTML = "";
          document.getElementById("error").style.backgroundColor = "";
        }, 1500);
      } else {
        let a = document.createElement("a");
        a.href = "dashboard.html";
        a.click();
      }
    } else {
      document.getElementById("error").innerHTML =
        "Please create your account first";
      document.getElementById("error").style.backgroundColor = "red";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
        document.getElementById("error").style.backgroundColor = "";
      }, 1500);
    }
    a = false;
  }

  function encrpyt(value) {
    let enc = "";
    for (let i = 0; i < value.length; i++) {
      enc = enc + String.fromCharCode(value.charCodeAt(i) + 3);
    }
    return enc;
  }
} else {
  current_user = session;
  let a = document.createElement("a");
  a.href = "dashboard.html";
  a.click();
}
