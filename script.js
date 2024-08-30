document.getElementById("playBtn").addEventListener("click", function () {
  var name = document.getElementById("nameInput").value;
  if (name) {
    localStorage.setItem("name", name);
    window.location.href = "start.html";
  } else {
    alert("Please enter your name.");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var name = localStorage.getItem("name");
  if (name) {
    document.getElementById("displayName").innerText = "Hello, " + name + "!";
    console.log(name);
  } else {
    document.getElementById("displayName").innerText = "No name provided.";
  }
});
