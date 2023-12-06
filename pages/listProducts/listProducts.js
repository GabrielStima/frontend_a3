const url = "http://localhost:8080/api/v1"

onload = () => {
    // if (!window.sessionStorage.getItem("token")) {
    //     window.location.pathname = '/D:/Reposit%C3%B3rio%20Pessoal/frontend_a3/index.html';
    // }

    fetch(`${url}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": sessionStorage.getItem("token")
        }
    }).then(async res => {
        if (!res.ok) {
            if (res.status === 401) {
                window.location.pathname = '/D:/Reposit%C3%B3rio%20Pessoal/frontend_a3/index.html';
            }
            console.error('asdasdasdasdasdas', res);
        } else {
            const productList = await res.json();
            const tbody = document.querySelector("#list-informations");
            const template = (product) => {
                return `
                    <tr>
                        <td>${product.title}</td>
                        <td>${product.price}</td>
                        <td>${product.stock}</td>
                        <td>${product.brand}</td>
                        <td>${product.category}</td>
                        <td><a class="accessButton" href="/D:/Reposit%C3%B3rio%20Pessoal/frontend_a3/pages/editRecords/index.html?type=product&id=${product.id}">Acessar</button></td>
                    </tr>
                    `
            }
            productList.forEach(product => {
                const nodeItem = template(product);
                tbody.insertAdjacentHTML('beforeend', nodeItem);
            });
        }
    })
        .catch(err => {
            console.error('BBBBBBBBBBBBBBBBB', err);
        })
};