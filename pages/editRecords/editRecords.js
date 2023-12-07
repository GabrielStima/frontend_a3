const url = "http://localhost:8000/api/v1"
const params = new URLSearchParams(document.location.search);
const type = params.get("type");
const id = params.get("id");


function editRecord() {
    const fields = document.querySelectorAll(".form-group input");
    fields.forEach(element => element.disabled = false);
    actionButtons(true);
}

function cancelEdit() {
    const fields = document.querySelectorAll(".form-group input");
    fields.forEach(element => element.disabled = true);
    actionButtons(false);
}

function updateRecord() {
    const fields = document.querySelectorAll(".form-group input");
    let update = {};
    fields.forEach(element => {
        update[element.id] = element.value
    });

    if (type === 'customer') {
        fetch(`${url}/customers/customer/${id}`, {
            method: "PUT",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                // "Authorization": sessionStorage.getItem("token")
            },
            body: JSON.stringify({ ...update })
        }).then(async res => {
            if (!res.ok) {
                if (res.status === 401) {
                    window.location.pathname = '../../index.html';
                }
                console.error('asdasdasdasdasdas', res);
            } else {
                const customer = await res.json();
                existentRecordTemplate(customer, fields);
            }
        })
    }
    if (type === 'product') {
        fetch(`${url}/products/product/${id}`, {
            method: "PUT",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                // "Authorization": sessionStorage.getItem("token")
            },
            body: JSON.stringify({ ...update })
        }).then(async res => {
            if (!res.ok) {
                if (res.status === 401) {
                    window.location.pathname = '../../index.html';
                }
                console.error('Error', res);
            } else {
                const product = await res.json();
                existentRecordTemplate(product, fields);
            }
        })
    }
    if (type === 'store') {
        fetch(`${url}/stores/store/${id}`, {
            method: "PUT",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                // "Authorization": sessionStorage.getItem("token")
            },
            body: JSON.stringify({ ...update })
        }).then(async res => {
            if (!res.ok) {
                if (res.status === 401) {
                    window.location.pathname = '../../index.html';
                }
                console.error('Error', res);
            } else {
                const store = await res.json();
                existentRecordTemplate(store, fields);
            }
        })
    }
    if (type === 'user') {
        fetch(`${url}/users/user/${id}`, {
            method: "PUT",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                // "Authorization": sessionStorage.getItem("token")
            },
            body: JSON.stringify({ ...update })
        }).then(async res => {
            if (!res.ok) {
                if (res.status === 401) {
                    window.location.pathname = '../../index.html';
                }
                console.error('Error', res);
            } else {
                const user = await res.json();
                existentRecordTemplate(user, fields);
            }
        })
    }
}

function createRecord() {
    const fields = document.querySelectorAll(".form-group input");
    let record = {};
    fields.forEach(element => {
        record[element.id] = element.value
    });

    if (type === 'customer') {
        fetch(`${url}/customers/`, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                // "Authorization": sessionStorage.getItem("token")
            },
            body: JSON.stringify({ ...record })
        }).then(async res => {
            if (!res.ok) {
                if (res.status === 401) {
                    window.location.pathname = '../../index.html';
                }
                console.error('Error', res);
            } else {
                const customer = await res.json();
                window.location.href += `&id=${customer.id}`;
            }
        })
    }
    if (type === 'product') {
        fetch(`${url}/products/`, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                // "Authorization": sessionStorage.getItem("token")
            },
            body: JSON.stringify({ ...record })
        }).then(async res => {
            if (!res.ok) {
                if (res.status === 401) {
                    window.location.pathname = '../../index.html';
                }
                console.error('Error', res);
            } else {
                const product = await res.json();
                window.location.href += `&id=${product.id}`;
            }
        })
    }
    if (type === 'store') {
        fetch(`${url}/stores/`, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                // "Authorization": sessionStorage.getItem("token")
            },
            body: JSON.stringify({ ...record })
        }).then(async res => {
            if (!res.ok) {
                if (res.status === 401) {
                    window.location.pathname = '../../index.html';
                }
                console.error('Error', res);
            } else {
                const store = await res.json();
                window.location.href += `&id=${store.id}`;
            }
        })
    }
    if (type === 'user') {
        fetch(`${url}/users/`, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                // "Authorization": sessionStorage.getItem("token")
            },
            body: JSON.stringify({ ...update })
        }).then(async res => {
            if (!res.ok) {
                if (res.status === 401) {
                    window.location.pathname = '../../index.html';
                }
                console.error('Error', res);
            } else {
                const user = await res.json();
                window.location.href += `&id=${user.id}`;
            }
        })
    }
}

function actionButtons(toggle) {
    const actions = document.querySelector("#actions");
    if (!toggle) {
        if (document.querySelector("#cancelAction")) {
            document.querySelector("#cancelAction").remove();
            document.querySelector("#updateAction").remove();
        }
        actions.insertAdjacentHTML('beforeend', `<button id="editAction" onclick="editRecord()">Editar Registro</button>`);
    } else {
        if (document.querySelector("#editAction")) {
            document.querySelector("#editAction").remove();
        }
        actions.insertAdjacentHTML('beforeend', 
        `
        <button id="cancelAction" onclick="cancelEdit()">Cancelar</button>
        <button id="updateAction" onclick="updateRecord()">Atualizar Registro</button>
        `);
    }
}

function existentRecordTemplate(item, fields) {
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
                <input type="text" id="${element}"  placeholder="Digite ${sortedFields[index].field}" disabled name="${sortedFields[index].field}" value="${propertyValues[index]}">
            </div>
        `;

            target.insertAdjacentHTML('beforeend', template);
        }
    });

    actionButtons();
}

function newRecordTemplate(fields) {
    const target = document.querySelector("#editRegisters");
    const actions = document.querySelector("#actions");

    fields.forEach((element) => {
            let template = `
            <div class="form-group">
                <label for="${element.property}">${element.field}:</label>
                <input type="text" id="${element.property}" name="${element.field}" placeholder="Digite ${element.field}">
            </div>
        `;

            target.insertAdjacentHTML('beforeend', template);
    });

    actions.insertAdjacentHTML('beforeend', `<button id="createRecord" onclick="createRecord()">Criar Registro</button>`);
}

onload = () => {
    // if (!window.sessionStorage.getItem("token")) {
    //     window.location.pathname = '/D:/Reposit%C3%B3rio%20Pessoal/frontend_a3/index.html';
    // }

    if (type === 'customer') {
        const fields = [
            { property: 'firstname', field: 'Nome' },
            { property: 'lastname', field: 'Sobrenome' },
            { property: 'email', field: 'Email' },
            { property: 'phone', field: 'Telefone' },
            { property: 'birthdate', field: 'Data de Nascimento' }
        ]
        if (id) {
            fetch(`${url}/customers/customer/${id}`, {
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
                    console.error('asdasdasdasdasdas', res);
                } else {
                    const customer = await res.json();
                    existentRecordTemplate(customer, fields);
                }
            })
        } else {
            newRecordTemplate(fields);
        }
    }

    if (type === 'product') {
        const fields = [
            { property: 'title', field: 'Nome' },
            { property: 'price', field: 'Preço' },
            { property: 'stock', field: 'Estoque' },
            { property: 'brand', field: 'Marca' },
            { property: 'category', field: 'Categoria' }
        ]

        if (id) {
            fetch(`${url}/products/product/${id}`, {
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
                    console.error('asdasdasdasdasdas', res);
                } else {
                    const product = await res.json();
                    existentRecordTemplate(product, fields);
                }
            })    
        }else{
            newRecordTemplate(fields);
        }
        
    }

    if (type === 'store') {
        const fields = [
            { property: 'cnpj', field: 'CNPJ' },
            { property: 'name', field: 'Nome' },
            { property: 'address', field: 'Endereço' }
        ]

        if (id) {
            fetch(`${url}/stores/store/${id}`, {
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
                    console.error('asdasdasdasdasdas', res);
                } else {
                    const store = await res.json();
                    existentRecordTemplate(store, fields);
                }
            })    
        } else {
            newRecordTemplate(fields);
        }
        
    }

    if (type === 'user') {
        const fields = [
            { property: 'firstname', field: 'Nome' },
            { property: 'lastname', field: 'Sobrenome' },
            { property: 'email', field: 'Email' },
            { property: 'phone', field: 'Telefone' },
            { property: 'birthdate', field: 'Data de Nascimento' },
            { property: 'profile', field: 'Perfil' },
        ]

        if (id) {
            fetch(`${url}/users/user/${id}`, {
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
                    console.error('asdasdasdasdasdas', res);
                } else {
                    const user = await res.json();
                    existentRecordTemplate(user, fields);
                }
            })   
        } else {
            newRecordTemplate(fields);
        }
    }
}