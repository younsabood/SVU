let bar = document.getElementById("bar");
let cancel_bar = document.getElementById("cancel-bar");
let aside_hide = document.querySelector(".aside");
let input = document.querySelectorAll(".input");
let label = document.querySelector("label");

let account = document.getElementById("account_name");
let number = document.getElementById("number");
let birth = document.getElementById("birth");
let username = document.getElementById("username");

let prog_select = document.getElementById("prog-select");
let spin = document.getElementById("spin");

birth.addEventListener("focus", function () {
  birth.type = "date";
});
birth.addEventListener("blur", function () {
  if (birth.value == "") {
    birth.type = "text";
  } else {
    birth.type = "date";
  }
});

number.addEventListener("input", function () {
  if (number.value == "+963") {
    number.setAttribute("pattern", "[+][0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}");
  }
});
number.addEventListener("focus", function () {
  number.placeholder = "+963-932-264-458";
});
number.addEventListener("blur", function () {
  if (number.value == "") {
    number.placeholder = " ";
  }
});

window.addEventListener("load", () => {
  window.addEventListener("online", () => console.log("Became online"));
  window.addEventListener("offline", () => console.log("Became offline"));
  console.log("window.navigator.onLine is " + window.navigator.onLine);
});

bar.onclick = function () {
  setTimeout(() => {
    aside_hide.style.opacity = 1;
  }, 200);
};

cancel_bar.onclick = function () {
  setTimeout(() => {
    aside_hide.style.opacity = 0;
  }, 200);
};
let show = document.getElementById("show");
show.onclick = function () {
  fet(null);
};
let tt = document.querySelector(".tt");
let copy = document.querySelector(".copy");
copy.onclick = function () {
  navigator.clipboard.writeText(tt.value);
  swal.fire("Copy", "تم النسخ للحافظة", "success");
};
var x = "";
if (document.querySelector('input[name="sort"]')) {
  document.querySelectorAll('input[name="sort"]').forEach((elem) => {
    elem.addEventListener("change", function (event) {
      spin.style.opacity = 1;
      spin.classList.add("spin");
      console.log("add");
      x = event.target.value;
      fet(x);
    });
  });
}
function fet(x) {
  var temp = "";
  tt.innerHTML = "";
  var json_data = {};
  fetch("https://sheetdb.io/api/v1/jzo9sx7vzeiyx").then((res) => {
    res.json().then((data) => {
      console.log(data);
      data = data.sort((a, b) => {
        if (x != "" && x == "id") {
          if (a.id < b.id) {
            return -1;
          }
        } else if (x != "" && x == "username") {
          if (a.username < b.username) {
            return -1;
          }
        } else if (x != "" && x == "account_name") {
          if (a.account_name < b.account_name) {
            return -1;
          }
        } else if (x != "" && x == "program") {
          if (a.account_name < b.account_name) {
            return -1;
          }
        } else if (x == null) {
          data = data;
        }
      });
      setTimeout(() => {
        spin.classList.remove("spin");
        spin.style.opacity = 0;
      }, 500);
      data.forEach((itemData) => {
        if (itemData.program == prog_select.value && prog_select.value != "") {
          temp += "<tr>";
          temp += "<td>" + itemData.id + "</td>";
          temp += "<td>" + itemData.program + "</td>";
          temp += "<td>" + itemData.account_name + "</td>";
          temp += "<td>" + itemData.username + "</td>";
          temp += "<td>" + itemData.number + "</td>";
          temp += "<td>" + itemData.birth + "'" + "</td></tr>";
          document.getElementById("data").innerHTML = temp;
          json_data = {
            id: itemData.id,
            program: itemData.program,
            account: itemData.account_name,
            username: itemData.username,
            birth: itemData.birth,
          };
          tt.textContent += JSON.stringify(json_data, null, 4);
        } else if (prog_select.value == "") {
          temp += "<tr>";
          temp += "<td>" + itemData.id + "</td>";
          temp += "<td>" + itemData.program + "</td>";
          temp += "<td>" + itemData.account_name + "</td>";
          temp += "<td>" + itemData.username + "</td>";
          temp += "<td>" + itemData.number + "</td>";
          temp += "<td>" + itemData.birth + "'" + "</td></tr>";
          document.getElementById("data").innerHTML = temp;
          json_data = {
            id: itemData.id,
            program: itemData.program,
            account: itemData.account_name,
            username: itemData.username,
            birth: itemData.birth,
          };
          tt.textContent += JSON.stringify(json_data, null, 4);
        }
      });
    });
  });
}

let captcha = new Array();
const activeCaptcha = document.getElementById("captcha");
function createCaptcha() {
  for (q = 0; q < 6; q++) {
    if (q % 2 == 0) {
      captcha[q] = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
    } else {
      captcha[q] = Math.floor(Math.random() * 10 + 0);
    }
  }
  var theCaptcha = captcha.join("");
  activeCaptcha.innerHTML = `${theCaptcha}`;
}
let cap = document.getElementById("cap");

var id = document.getElementById("id");
let signupbtn = document.getElementById("account_name");
signupbtn.addEventListener("mouseover", () => {
  fetch("https://sheetdb.io/api/v1/jzo9sx7vzeiyx").then((res) => {
    res.json().then((data) => {
      id.value = data.length;
    });
  });
});

function openOnce(url, target) {
  // open a blank "target" window
  // or get the reference to the existing "target" window
  let winref = window.open("", target, "");

  // if the "target" window was just opened, change its url
  if (winref.location.href === "about:blank") {
    winref.location.href = url;
  }
  document.getElementById("id").value = "";
  input.forEach((e) => {
    e.value = "";
    if (birth.value == "") {
      birth.type = "text";
    } else {
      birth.type = "date";
    }
    if (number.value == "") {
      number.placeholder = " ";
    }
  });
  window.location.reload();
  return winref;
}
let form = document.getElementById("sheetdb-form");
var signup = document.getElementById("signupbtn");
signup.disabled = true;
cap.addEventListener("input", function () {
  if (activeCaptcha.innerHTML == cap.value && id != "") {
    signup.disabled = false;
  } else {
    signup.disabled = true;
  }
});
form.addEventListener("submit", (e) => {
  let num = "'" + number.value + "'";
  number.value = num;
  number.style.color = "#000";
  number.style.borderColor = "#00ff26";
  document.querySelector(".lbl").style.color = "#00ff26";
  e.preventDefault();
  fetch(form.action, {
    method: "POST",
    body: new FormData(document.getElementById("sheetdb-form")),
  }).then((res) => {
    openOnce(
      "https://docs.google.com/spreadsheets/d/18kZ67VtcsijASNqx4t4f40wwjxdY86muDkKKJ06Tfmk/edit?usp=sharing,",
      "about:blank"
    );
  });
});
