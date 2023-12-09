const LOGIN_URL = "login.html";
const apiPath = "https://jsonserver-proknow.joopaulopaulo33.repl.co/usuarios";

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


function fetchData() {
    try {
        return fetch(apiPath)
            .then(response => response.json())
            .then(data => {
                console.log("eu to sendo impresso ", data);
                return data;
            });
    } catch (error) {
        console.log(error);
    }
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


async function login(username, password) {
    let users = await fetchData();

    for (const user of users) {
        console.log(user.login, user.senha)
        if (user.login === username && user.senha === password) {
            sessionStorage.setItem("usuarioAtual", JSON.stringify(user));
            console.log('usuario encontrado');
            return true;
        }
    }

    return false;
}


function logout() {
    sessionStorage.removeItem("usuarioAtual");
    window.location = 'index.html';
}




