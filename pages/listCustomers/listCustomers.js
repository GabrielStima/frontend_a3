const url = "http://localhost:8080/api/v1"

onload = () => {
    if (!window.sessionStorage.getItem("token")) {
        window.location.pathname = '/D:/Reposit%C3%B3rio%20Pessoal/frontend_a3/index.html';
    }
    
    fetch(`${url}/customers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("token")
        }
    }).then(async res => {
        if (!res.ok) {
            if (res.status === 401) {
                window.location.pathname = '/D:/Reposit%C3%B3rio%20Pessoal/frontend_a3/index.html';
            }
            console.error('asdasdasdasdasdas', res);
        } else {
            const customerList = await res.json();
            const tbody = document.querySelector("#list-informations");
            const template = (customer) => {
                return `
                    <tr>
                        <td>${customer.firstName}</td>
                        <td>${customer.lastName}</td>
                        <td>${customer.email}</td>
                        <td>${customer.phone}</td>
                        <td>${customer.birthDate}</td>
                        <td><a class="accessButton" href="/D:/Reposit%C3%B3rio%20Pessoal/frontend_a3/pages/editRecords/index.html?type=customer&id=${customer.id}">Acessar</button></td>
                    </tr>
                    `
            }
            customerList.forEach(customer => {
                const nodeItem = template(customer);
                tbody.insertAdjacentHTML('beforeend', nodeItem);
            });
        }
    })
        .catch(err => {
            console.error('BBBBBBBBBBBBBBBBB', err);
        })
};