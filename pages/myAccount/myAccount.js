const url = "http://localhost:8080/api/v1"

function editRecord() {
    const fields = document.querySelectorAll(".form-group input");
    fields.forEach(element => {
        if (element.id !== 'profile') {
            element.disabled = false
        }
    });
    actionButtons(true);
}

function cancelEdit() {
    const fields = document.querySelectorAll(".form-group input");
    fields.forEach(element => element.disabled = true);
    actionButtons(false);
}

function updateRecord() {
    const fields = document.querySelectorAll(".form-group input");
    fields.forEach(element => console.log(element));
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function modalForUpdatePassword() {
    const modal = document.getElementById("myModal");

    modal.style.display = "block";

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function updatePassword() {
   alert('Senha Alterada com Sucesso');
   closeModal(); 
}

function actionButtons(toggle) {
    const actions = document.querySelector("#actions");
    if (!toggle) {
        if (document.querySelector("#cancelAction")) {
            document.querySelector("#cancelAction").remove();
            document.querySelector("#updateAction").remove();
        }
        actions.insertAdjacentHTML('beforeend', `
            <button id="editAction" onclick="editRecord()">Editar Registro</button>
            <button id="modalForUpdatePassword" onclick="modalForUpdatePassword()">Atualizar senha</button>
        `);
    } else {
        if (document.querySelector("#editAction")) {
            document.querySelector("#editAction").remove();
            document.querySelector("#modalForUpdatePassword").remove();
        }
        actions.insertAdjacentHTML('beforeend',
            `
        <button id="cancelAction" onclick="cancelEdit()">Cancelar</button>
        <button id="updateAction" onclick="updateRecord()">Atualizar Registro</button>
        `);
    }
}

function template(item, fields) {
    const propertyNames = Object.keys(item);
    const propertyValues = Object.values(item);
    const target = document.querySelector("#myAccount");
    const sortedFields = propertyNames.map((item) => {
        return fields.find(element => element.property === item)
    })


    propertyNames.forEach((element, index) => {
        if (element !== 'id') {
            let template = `
            <div class="form-group">
                <label for="${element}">${sortedFields[index].field}:</label>
                <input type="text" id="${element}" disabled name="${sortedFields[index].field}" value="${propertyValues[index]}" placeholder="${sortedFields[index].field}">
            </div>
        `;
            target.insertAdjacentHTML('beforeend', template);
        }
    });

    actionButtons();
}

onload = () => {
    // if (!window.sessionStorage.getItem("token")) {
    //     window.location.pathname = '/D:/Reposit%C3%B3rio%20Pessoal/frontend_a3/index.html';
    // }

    // const userId = window.sessionStorage.getItem('ref');
    const userId = 'DEVE SER O ID DO USER';

    const fields = [
        { property: 'firstName', field: 'Nome' },
        { property: 'lastName', field: 'Sobrenome' },
        { property: 'email', field: 'Email' },
        { property: 'phone', field: 'Telefone' },
        { property: 'birthDate', field: 'Data de Nascimento' },
        { property: 'profile', field: 'Perfil' }
    ]

    fetch(`${url}/user/${userId}`, {
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
            const user = await res.json();
            template(user, fields);
        }
    })

}