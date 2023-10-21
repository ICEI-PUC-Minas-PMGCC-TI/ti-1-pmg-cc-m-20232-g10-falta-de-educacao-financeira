const apiPath = 'https://jsonserver-proknow.joopaulopaulo33.repl.co/usuarios';


async function readIncoming() {

  await fetch(apiPath)
    .then(response => response.text())
    .then(users => {
      console.log(users);
    })
    .catch(error => {
      console.error('Erro ao ler usuarios', error);
      displayMessage("Deu ruim ae paizão");
    })
    
}



function registerIncoming(user) {
  debugger;

  fetch(apiPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Erro ao inserir contato via API', error);

    })

  function updateIncoming(id, user) {
    fetch(`${apiPath}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success: ', data);
      })
      .catch(error => {
        console.error('Error:', error);
      })
  }




}





