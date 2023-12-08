const url = "http://localhost:8000/api/v1"

onload = () => {
    // if (!window.sessionStorage.getItem("token")) {
    //     window.location.pathname = '../../index.html';
    // }
    
    fetch(`${url}/customers`, {
        method: "GET",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            // "Authorization": sessionStorage.getItem("token")
        }
    }).then(async res => {
        if (!res.ok) {
            if (res.status === 401) {
                window.location.pathname = '../../index.html';
            }
            console.error('Error', res);
        } else {
            const customerList = await res.json();
            const tbody = document.querySelector("#list-informations");
            const template = (customer) => {
                return `
                    <tr>
                        <td>${customer.firstname}</td>
                        <td>${customer.lastname}</td>
                        <td>${customer.email}</td>
                        <td>${customer.phone}</td>
                        <td>${customer.birthdate}</td>
                        <td><a class="accessButton" href="../editRecords/index.html?type=customer&id=${customer.id}">Acessar</button></td>
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