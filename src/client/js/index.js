// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAzbhIpVD6OhApa24g4ygQCrRt1x4ZX-ks",
  authDomain: "scesite-1bcb7.firebaseapp.com",
  databaseURL: "https://scesite-1bcb7.firebaseio.com",
  projectId: "scesite-1bcb7",
  storageBucket: "scesite-1bcb7.appspot.com",
  messagingSenderId: "278511076958",
  appId: "1:278511076958:web:ef708ac1e9524dde4696cf",
  measurementId: "G-LCL9G94T6Z",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();

function myfunction() {
  var quantity = document.getElementById("quantityInput").value();
  alert(quantity);
}

function tableFilter() {
  // Declare variables
  var input = document.getElementById("search");
  var filter = input.value.toUpperCase();
  var table = document.getElementById("table");
  var trs = table.tBodies[0].getElementsByTagName("tr");

  // Loop through first tbody's rows
  for (var i = 0; i < trs.length; i++) {
    // define the row's cells
    var tds = trs[i].getElementsByTagName("td");

    // hide the row
    trs[i].style.display = "none";

    // loop through row cells
    for (var i2 = 0; i2 < tds.length; i2++) {
      // if there's a match
      if (tds[i2].innerHTML.toUpperCase().indexOf(filter) > -1) {
        // show the row
        trs[i].style.display = "";

        // skip to the next row
        continue;
      }
    }
  }
}

// const buttons = document.querySelectorAll(".btn");
// buttons.forEach(function (currentBtn) {
//   currentBtn.addEventListener("click", addLead);
// });

// $(document).on("click", ".btn", function () {
//   var value = $(this).closest("tr").find(".brand").html();
//   var newClientKey = database.ref().child("boom").push().key;
//   database.ref("Cart/" + newClientKey + "/Brand").set(value);
//   alert("Copied " + value);
// });

// function addLead() {
//   alert("Begin");
//   var Brand = $(this).closest("tr").find("#brand").val();
//   var Category = $(this).closest("tr").find("#category").val();
//   var Price = $(this).closest("tr").find("#price").val();
//   var Sku = $(this).closest("tr").find("#squ").val();
//   var pName = $(this).closest("tr").find("#pName").val();
//   var quantity = $(this).closest("tr").find("#quantityInput").val();

//   var newClientKey = database.ref().child("speakers").push().key;
//   database.ref("Cart/" + newClientKey + "/Brand").set(Brand);
//   database.ref("Cart/" + newClientKey + "/Category").set(Category);
//   database.ref("Cart/" + newClientKey + "/Sku").set(Sku);
//   database.ref("Cart/" + newClientKey + "/Price").set(Price);
//   database.ref("Cart/" + newClientKey + "/pName").set(pName);
//   database.ref("Cart/" + newClientKey + "/quantity").set(quantity);
// }

$(document).on("click", ".btn", function () {
  var Brand = $(this).closest("tr").find(".brand").html();
  var Category = $(this).closest("tr").find(".category").html();
  var Price = $(this).closest("tr").find(".price").html();
  var Sku = $(this).closest("tr").find(".squ").html();
  var pName = $(this).closest("tr").find(".pName").html();
  var quantity = $(this).closest("tr").find("#quantityInput").html();

  var newClientKey = database.ref().child("Cart").push().key;
  database.ref("Cart/" + newClientKey + "/Brand").set(Brand);
  database.ref("Cart/" + newClientKey + "/Category").set(Category);
  database.ref("Cart/" + newClientKey + "/Sku").set(Sku);
  database.ref("Cart/" + newClientKey + "/Price").set(Price);
  database.ref("Cart/" + newClientKey + "/pName").set(pName);
  database.ref("Cart/" + newClientKey + "/quantity").set(quantity);
  alert("Done!");
});

//בכל לחיצה להוסיף לאותה עגלה ולא לפתוח ילד חדש
admin
  .auth()
  .createUser({
    email: "user@example.com",
    emailVerified: false,
    phoneNumber: "+11234567890",
    password: "secretPassword",
    displayName: "John Doe",
    photoURL: "http://www.example.com/12345678/photo.png",
    disabled: false,
  })
  .then(function (userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);
  })
  .catch(function (error) {
    console.log("Error creating new user:", error);
  });
