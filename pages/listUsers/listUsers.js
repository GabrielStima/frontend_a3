const url = "http://localhost:8080/api/v1"

onload = () => {
    // if (!window.sessionStorage.getItem("token")) {
    //     window.location.pathname = '/D:/Reposit%C3%B3rio%20Pessoal/frontend_a3/index.html';
    // }

    fetch(`${url}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": sessionStorage.getItem("token")
        }
    }).then(async res => {
        if (res.status === 200) {
            const userList = await res.json();
            const tbody = document.querySelector("#list-informations");
            const template = (user) => {
                return `
                <tr>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.birthDate}</td>
                    <td>${user.profile}</td>
                    <td><a class="accessButton" href="/D:/Reposit%C3%B3rio%20Pessoal/frontend_a3/pages/editRecords/index.html?type=user&id=${user.id}">Acessar</button></td>
                </tr>
                `
            }
            userList.forEach(user => {
                const nodeItem = template(user);
                tbody.insertAdjacentHTML( 'beforeend', nodeItem);
            });
        } else if (res.status === 404 || res.status === 400) {
            console.error(res);
        }
    })
    .catch(err => {
        console.error(err);
    })
};