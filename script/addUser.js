let userList = [];
function add_user() {
  let errorOccured = false;
  let resetBtn = document.getElementById("resetBtn");
  let firstName = document.getElementById("Name").value;
  if (firstName == "") {
    document.getElementById("f_Error").innerText = "Enter first Name";
    errorOccured = true;
  }

  let userName = document.getElementById("username").value;
  let regEmail = /^[a-z A-Z 0-9 _ -]+@[a-zA-Z]+\.com$/gi;

  if (!regEmail.test(userName)) {
    document.getElementById("emaiError").innerText = "wrong email";
    errorOccured = true;
  }

  let lastName = document.getElementById("Last-Name").value;
  if (lastName == "") {
    document.getElementById("l_Error").innerText = "Enter Last name";
    errorOccured = true;
  }

  let gender = document.getElementById("Gender").value;
  if (gender == "Select your Gender") {
    document.getElementById("g_Error").innerText = "Select Gender";
    errorOccured = true;
  }

  let password = document.getElementById("pass1").value;
  let confirm_password = document.getElementById("pass2").value;
  let encPass;
  let capital = /[A-Z]/g;
  let small = /[a-z]/g;
  let number = /[0-9]/g;
  let symbol = /[!@#$%^&*]/g;

  if (password != confirm_password) {
    document.getElementById("p_Error").innerText = "Password does not match";
    errorOccured = true;
  } else if (password == "" || confirm_password == "") {
    document.getElementById("p_Error").innerText = "Please enter password";
    errorOccured = true;
  } else if (
    !(
      capital.test(password) &&
      small.test(password) &&
      number.test(password) &&
      symbol.test(password) &&
      password.length > 6 &&
      password.length < 17
    )
  ) {
    document.getElementById("p_Error").innerText =
      "Please enter password in between 7 to 16 characters which contain one upper and one lower case characters, numeric digits, any special symbol and first character must be a letter";
    errorOccured = true;
  } else {
    encPass = encrpyt(password);
  }

  let address = document.getElementById("Address").value;
  if (address == "") {
    document.getElementById("a_Error").innerText = "Enter address";
    errorOccured = true;
  }

  let image = document.getElementById("image").src;
  let imageReg = /.(gif|jpe?g|png|webp|bmp)$/i;
  if (image == "" || image == null) {
    document.getElementById("i_error").innerText = "please select a image";
    errorOccured = true;
  } else if (imageReg.test(document.getElementById("image").value) == false) {
    document.getElementById("i_error").innerText =
      "cannot select document other than images";
    errorOccured = true;
  }

  var userObj = {
    f_Name: firstName,
    l_name: lastName,
    u_name: userName,
    gen: gender,
    addr: address,
    img: image,
    pass: encPass,
    toDo: [],
    pToDo: [],
  };

  if (!errorOccured) {
    if (window.localStorage.getItem("user") != null) {
      let confirm = false;
      let data = JSON.parse(window.localStorage.getItem("user"));
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        var u1 = data[i].u_name;
        if (u1.toLowerCase() == userName.toLowerCase()) {
          confirm = true;
        }
      }
      if (!confirm) {
        data.push(userObj);
        window.localStorage.setItem("user", JSON.stringify(data));
        document.getElementById("gen_error").innerText =
          "User Rgistered Successfully";
        setTimeout(() => {
          window.location = "index.html";
        }, 2000);
      } else {
        document.getElementById("gen_error").innerText =
          "Username already registered";
      }
    } else {
      userList.push(userObj);
      window.localStorage.setItem("user", JSON.stringify(userList));
      for (let i = 0; i < window.localStorage.length; i++) {
        let res = window.localStorage.getItem("user");
        // console.log(res);
      }
      document.getElementById("gen_error").innerText =
        "User Rgistered Successfully";
      setTimeout(() => {
        window.location = "index.html";
      }, 2000);
    }
  } else {
    document.getElementById("gen_error").innerText = "Enter Values Properly";
  }
}

function imageee() {
  var inputSrc = document.getElementById("image");
  var reader = new FileReader();
  reader.readAsDataURL(inputSrc.files[0]);
  reader.onloadend = function (event) {
    var Image = document.getElementById("image");
    Image.src = event.target.result;
  };
}
function encrpyt(value) {
  let enc = "";
  for (let i = 0; i < value.length; i++) {
    enc = enc + String.fromCharCode(value.charCodeAt(i) + 3);
  }
  // console.log(enc);
  return enc;
}
function remove() {
  document.getElementById("emaiError").innerText = "";
  document.getElementById("f_Error").innerText = "";
  document.getElementById("l_Error").innerText = "";
  document.getElementById("g_Error").innerText = "";
  document.getElementById("p_Error").innerText = "";
  document.getElementById("a_Error").innerText = "";
  document.getElementById("i_error").innerText = "";
  document.getElementById("gen_error").innerText = "";
}
