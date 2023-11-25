const url = "http://localhost:8080"

function handleLoginSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(url, {body: {email, password}})
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
}