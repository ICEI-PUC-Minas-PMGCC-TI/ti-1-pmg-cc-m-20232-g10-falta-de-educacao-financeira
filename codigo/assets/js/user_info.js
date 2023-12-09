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
        
        const data = JSON.parse(sessionStorage.getItem("usuarioAtual"));
        const name = data.nome;

        console.log(name);

        document.getElementById("username").textContent = name;
    } catch (error) {
        console.error("Erro ao obter o nome do usuario: ", error);
    }
}

document.addEventListener('DOMContentLoaded', showUsername);