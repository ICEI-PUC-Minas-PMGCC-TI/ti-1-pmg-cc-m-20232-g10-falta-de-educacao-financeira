const LOGIN_URL = "login.html";
const apiPath = "'https://jsonserver-proknow.joopaulopaulo33.repl.co/usuarios'";

function generateUUID() {
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


async function fetchData() {
    try {
        await fetch(apiPath)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return data;
            });
    } catch (error) {
        console.log(error);
    }
}

function getUser(username) {

    let users = fetchData();
    return users.find(user => user.username === username);

}

async function saveUser(user) {
    try {
        const response = await fetch(apiPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        console.log('Success:', data);

    } catch (error) {
        console.error('Erro:', error);
    }
}


function login(username, password) {
    let user = getUser(username);
    if (user) {
        if (user.password === password) {
            localStorage.setItem("usuarioUsuario", JSON.stringify(user));
            //window.location.href = "index.html";
            console.log("Login efetuado com sucesso");
        } else {
            alert("Usuario ou senha invalidos");
        }
    } else {
        let newUser = {
            id: generateUUID(),
            login: username,
            senha: password,
            nome: '',
            email: ''
        };
        saveUser(newUser);
        // O usuário está logado
        sessionStorage.setItem('usuarioCorrente', JSON.stringify(newUser));
        console.log("temos que chamar o modal de cadastro");
    }
}


function logout() {
    localStorage.removeItem("usuarioUsuario");
}

document.addEventListener("DOMContentLoaded", fetchData)


