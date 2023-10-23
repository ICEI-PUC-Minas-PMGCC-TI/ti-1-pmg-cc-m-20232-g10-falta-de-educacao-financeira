const apiPath = 'https://jsonserver-proknow.joopaulopaulo33.repl.co/usuarios';


function registerTask(id, task) {
    fetch(apiPath + 'id', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erro ao cadastrar tarefa', error))
}