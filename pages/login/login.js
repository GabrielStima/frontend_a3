const url = "http://localhost:8080/api/v1"

function handleUnexpectedError(error) {
    document.getElementById("error-info").innerHTML = "Um erro aconteceu por favor contate o suporte";
    document.getElementById("error-container").classList.add("error-container");
    setTimeout(() => {
        document.getElementById("error-container").classList.remove("error-container");
        document.getElementById("error-info").innerHTML = "";
    }, 1500)
    console.error(error);
}

function handleInvalidData(response) {
    document.getElementById("error-info").innerHTML = "Dados invalidos, confira se os dados usados estão corretos";
    document.getElementById("error-container").classList.add("error-container");
    setTimeout(() => {
        document.getElementById("error-container").classList.remove("error-container");
        document.getElementById("error-info").innerHTML = "";
    }, 1500)
    console.error(response);
}

function handleLoginSubmit (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    fetch(`${url}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(async res => {
            if (res.status === 200) {
                const { token } = await res.json();
                
                if (!token) {
                    handleUnexpectedError("null token");
                }
                
                sessionStorage.setItem("token", token);
                window.location.href="pages/home/index.html";

            } else if (res.status === 404 || res.status === 400) {
                handleInvalidData(res);
            }
        })
        .catch(err => {
            handleUnexpectedError(err);
        })
}