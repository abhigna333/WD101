
let user_entries = [];

function fillTable(){
    let obj = localStorage.getItem("user_entries");
    if(obj){
        user_entries = JSON.parse(obj);
    }else{
        user_entries = [];
    }
    return user_entries;
}
user_entries = fillTable();

let username = document.getElementById("name"),
  email = document.getElementById("email"),
  password = document.getElementById("password"),
  accept = document.getElementById("acceptTerms"),
  dob = document.getElementById("dob");

let errormsg = document.getElementsByClassName("errormsg");

let form = document.getElementById("form");

function verify(elem,message,cnd){
    if(cnd){
        elem.style.border = "2px solid red";
        elem.setCustomValidity(message);
        elem.reportValidity();
    }else{
        elem.style.border = "2px solid green";
        elem.setCustomValidity('');

    }
}

function checkDOB(){
    let age = new Date().getFullYear() - new Date(dob.value).getFullYear();
    if(age < 18 || age > 55){
        return false;
    }else{
        return true;
    }
}
let message_name = "Username must be at least 3 characters long";
let message_email = "Enter valid email";
let message_agree = "You must agree to the terms and conditions";
let message_dob = "Your age must be between 18 and 55";

username.addEventListener("input", (e) => {
    let cond_name = username.value.length < 3;
    e.preventDefault();
    verify(username,message_name,cond_name);
});

email.addEventListener("input", (e) => {
    let cond_email = !(email.value.includes("@") && email.value.includes("."));
    e.preventDefault();
    verify(email,message_email,cond_email);
});

dob.addEventListener("input", (e) => {
    let cond_dob = !checkDOB();
    e.preventDefault();
    verify(dob,message_dob,cond_dob);
});

/*accept.addEventListener("input", (e) => {
    let cond_agree = !accept.checked;
    e.preventDefault();
    verify(accept,message_agree,cond_agree);
});*/

function makeObject(){
    let check = false;
    if(accept.checked){
        check = true;
    }
    let obj = {
        name: username.value,
        email: email.value,
        password: password.value,
        dob: dob.value,
        checked: accept.checked
    }
    return obj;
}


function displayTable(){
    let table = document.getElementById("table");
    let entries = user_entries;
    let str = `<tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Dob</th>
                    <th>Accepted terms?</th>
                </tr>\n`;
    for(let i=0;i<entries.length;i++){
        str += `<tr>
                    <td>${entries[i].name}</td>
                    <td>${entries[i].email}</td>
                    <td>${entries[i].password}</td>
                    <td>${entries[i].dob}</td>
                    <td>${entries[i].checked}</td>
                </tr>\n`;
    }
    table.innerHTML = str;
}

form.addEventListener("submit", (e) => {
    let obj = makeObject();
    user_entries.push(obj);
    localStorage.setItem("user_entries", JSON.stringify(user_entries));
    /*let cond_agree= !accept.checked;
    e.preventDefault();
    if (!cond_agree) {
        
    }*/
    /*let paragraph = document.getElementById("para");
    let res = "";
    for(let i = 0; i < user_entries.length; i++){
        res += user_entries[i].name + user_entries[i].email + user_entries[i].password + user_entries[i].dob + user_entries[i].checked + "\n";
    }
    res += "Hoioiiioioi";
    paragraph.innerHTML = res;*/
    displayTable();
});

/*let clear_data = document.getElementById("clear");

clear_data.addEventListener("submit", (e) => {
    localStorage.clear();
    
    displayTable([]);
})*/

window.onload = (event) => {
    displayTable();
};