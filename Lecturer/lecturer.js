function switchContent() {
    var inner = document.getElementById('inner');

    inner.innerHTML = "";

    var form = document.createElement("form");
    form.setAttribute('method',"post");
    form.setAttribute('action',"createUser.php");

    var n1 = document.createElement("p");
    n1_text = document.createTextNode("First name:");
    n1.appendChild(n1_text);

    var firstName = document.createElement("input");
    firstName.setAttribute('type',"text");
    firstName.setAttribute('name',"firstName");
    firstName.setAttribute('placeholder',"First name");

    var n2 = document.createElement("p");
    n2_text = document.createTextNode("Last name:");
    n2.appendChild(n2_text);

    var lastName = document.createElement("input");
    lastName.setAttribute('type',"text");
    lastName.setAttribute('name',"firstName");
    lastName.setAttribute('placeholder',"Last name");

    var ps = document.createElement("p");
    ps_text = document.createTextNode("Password:");
    ps.appendChild(ps_text);

    var password = document.createElement("input");
    password.setAttribute('type',"password");
    password.setAttribute('name',"password");
    password.setAttribute('placeholder',"*******");

    var brk = document.createElement("p");
    br = document.createTextNode("\n");
    brk.appendChild(br);

    var sub = document.createElement("button");
    sub.setAttribute('type',"submit");
    sub.className = "btn btn-success";
    sub_text = document.createTextNode("Sign up!");
    sub.appendChild(sub_text);

    form.appendChild(n1);
    form.appendChild(firstName);
    form.appendChild(n2);
    form.appendChild(lastName);
    form.appendChild(ps_text);
    form.appendChild(password);
    form.appendChild(brk);
    form.appendChild(sub);
    inner.appendChild(form);

}
