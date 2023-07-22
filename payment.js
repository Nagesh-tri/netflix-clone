
// function change() {
//     $('[data-toggle="tooltip"]').tooltip()
//   }

let Name = document.getElementById("name")
let Card = document.getElementById("Card")
let Edate = document.getElementById("Edate")
let cvv = document.getElementById("cvv")
let payBtn = document.getElementById("payBtn")
let jwtToken = localStorage.getItem("jwtToken") || ""
let email = localStorage.getItem("email") || ""
let subscription = JSON.parse(localStorage.getItem("subscription")) || {}

payBtn.addEventListener("click", () => {

    if (Name.value == "" || Card.value == "" || Edate.value == "" || cvv.value == "") {
        already.style.display = "inline"
        setTimeout(() => {
            already.style.display = "none"
        }, 2000)
    } else {
        added.style.display = "inline"
        setTimeout(() => {
            added.style.display = "none";
            updateSubscription()
            window.location.href = "./home.html"
        }, 2000)
    }
})

function updateSubscription() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(jwtToken)
    var raw = JSON.stringify({
        "email": email,
        "subscriptionType": subscription.Type
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8088/auth/v1/user-controller/subscription", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

