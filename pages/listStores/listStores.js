const url = "http://localhost:8080/api/v1"

onload = () => {
    if (!window.sessionStorage.getItem("token")) {
        window.location.pathname = '/D:/Reposit%C3%B3rio%20Pessoal/frontend_a3/index.html';
    }

    fetch(`${url}/stores`, {
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
            const storeList = await res.json();
            const tbody = document.querySelector("#list-informations");
            const template = (store) => {
                return `
                    <tr>
                        <td>${store.cnpj}</td>
                        <td>${store.name}</td>
                        <td>${store.address}</td>
                        <td><a href="/D:/Reposit%C3%B3rio%20Pessoal/frontend_a3/pages/editRecords/index.html?type=store&id=${store.id}">Acessar</button></td>
                    </tr>
                    `
            }
            storeList.forEach(store => {
                const nodeItem = template(store);
                tbody.insertAdjacentHTML('beforeend', nodeItem);
            });
        }
    })
        .catch(err => {
            console.error('BBBBBBBBBBBBBBBBB', err);
        })
};