const url = "http://localhost:8080/api/v1"

function template(item, fields) {
    const propertyNames = Object.keys(item);
    const propertyValues = Object.values(item);
    const target = document.querySelector("#editRegisters");
    const sortedFields = propertyNames.map((item) => {
        return fields.find(element => element.property === item)
    })


    propertyNames.forEach((element, index) => {
        if (element !== 'id') {
            let template = `
            <div class="form-group">
                <label for="${element}">${sortedFields[index].field}:</label>
                <input type="text" id="${element}" name="${sortedFields[index].field}" value="${propertyValues[index]}">
            </div>
        `;

            target.insertAdjacentHTML('beforeend', template);
        }
    });
}

onload = () => {
    let params = new URLSearchParams(document.location.search);
    let type = params.get("type");
    let id = params.get("id");

    if (type === 'customer') {
        const fields = [
            { property: 'firstName', field: 'Nome' },
            { property: 'lastName', field: 'Sobrenome' },
            { property: 'email', field: 'Email' },
            { property: 'phone', field: 'Telefone' },
            { property: 'birthDate', field: 'Data de Nascimento' }
        ]

        fetch(`${url}/customer/${id}`, {
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
                const customer = await res.json();
                template(customer, fields);
            }
        })
    }

    if (type === 'product') {
        const fields = [
            { property: 'title', field: 'Nome' },
            { property: 'price', field: 'Preço' },
            { property: 'stock', field: 'Estoque' },
            { property: 'brand', field: 'Marca' },
            { property: 'category', field: 'Categoria' }
        ]

        fetch(`${url}/product/${id}`, {
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
                const product = await res.json();
                template(product, fields);
            }
        })
    }

    if (type === 'store') {
        const fields = [
            { property: 'cnpj', field: 'CNPJ' },
            { property: 'name', field: 'Nome' },
            { property: 'address', field: 'Endereço' },
            { property: 'customerId', field: 'Cordenador da Loja' }
        ]

        fetch(`${url}/store/${id}`, {
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
                const store = await res.json();
                template(store, fields);
            }
        })
    }

    if (type === 'user') {
        const fields = [
            { property: 'firstName', field: 'Nome' },
            { property: 'lastName', field: 'Sobrenome' },
            { property: 'email', field: 'Email' },
            { property: 'phone', field: 'Telefone' },
            { property: 'birthDate', field: 'Data de Nascimento' },
            { property: 'profile', field: 'Perfil' },
        ]

        fetch(`${url}/user/${id}`, {
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
                const user = await res.json();
                template(user, fields);
            }
        })
    }
}