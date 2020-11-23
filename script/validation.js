this.onmessage = function (e) {
  if (e.data != undefined) {
    let password_boolean;
    let first_Name = e.data.f_Name;
    let last_name = e.data.l_name;
    let user_name = e.data.u_name;
    let gender = e.data.gen;
    let address = e.data.addr;
    let image = e.data.img;
    let profile = e.data.img;
    let password = e.data.pass;
    let confirm_password = e.data.con_passwd;

    let reg_email = /^[a-z A-Z 0-9 _ -]+@[a-zA-Z]+\.com$/gi;

    if (password != confirm_password) {
      console.log("entered password and confirm password does not match!!");
      password_boolean = false;
    } else {
      password_boolean = true;
    }

    console.log(e.data.f_Name);

    if (
      reg_email.test(user_name) &&
      first_Name != "" &&
      last_name != "" &&
      gender != "" &&
      address != "" &&
      image !== "" &&
      password_boolean
    ) {
      this.postMessage({
        result: e.data.f_Name + " has filled data correctly ",
      });
    } else {
      this.postMessage({ result: "DIDn't work" });
    }
  }
};
