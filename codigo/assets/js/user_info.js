const apiPath = 'https://jsonserver-proknow.joopaulopaulo33.repl.co/usuarios';
async function getData() {
    const response = await fetch(apiPath);
    if (!response.ok) {
        throw new Error("Não foi possivel encontrar o usuario!");
    }
    return await response.json();

}

async function showUsername() {
    try {

        //temos que pegar o usuario do localStorage/sessionStorage quando ele logar
        const data = await getData();
        const firstUser = data[0];
        const username = firstUser.nome;

        document.getElementById("username").textContent = username;
    } catch (error) {
        console.error("Erro ao obter o nome do usuario: ", error);
    }
}

document.addEventListener('DOMContentLoaded', showUsername);