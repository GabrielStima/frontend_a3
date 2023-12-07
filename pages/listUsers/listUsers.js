const url = "http://localhost:8000/api/v1"

onload = () => {
    // if (!window.sessionStorage.getItem("token")) {
    //     window.location.pathname = '../../index.html';
    // }

    fetch(`${url}/users`, {
        method: "GET",
        mode: 'cors',
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
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.birthdate}</td>
                    <td>${user.profile}</td>
                    <td><a class="accessButton" href="../editRecords/index.html?type=user&id=${user.id}">Acessar</button></td>
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