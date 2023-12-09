
<<<<<<< HEAD
async function readUsers() {

  await fetch(apiPath)
    .then(response => response.json())
=======
async function readIncoming() {

  await fetch(apiPath)
    .then(response => response.text())
>>>>>>> salvar-no-db
    .then(users => {
      console.log(users);
    })
    .catch(error => {
      console.error('Erro ao ler usuarios', error);
      displayMessage("Deu ruim ae paizão");
    })
<<<<<<< HEAD

=======
    
>>>>>>> salvar-no-db
}



<<<<<<< HEAD
function registerIncoming(obj) {
=======
function registerIncoming(user) {
  debugger;
>>>>>>> salvar-no-db

  fetch(apiPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
<<<<<<< HEAD
    body: JSON.stringify(jsonBody + obj)
  })

    .then(response => {
      response.json();
      console.log(response.json())
    })
    .then(data => {
      console.log('Success:');
      console.log(data);
=======
    body: JSON.stringify(user)
  })

    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
>>>>>>> salvar-no-db
    })
    .catch(error => {
      console.error('Erro ao inserir contato via API', error);

    })
<<<<<<< HEAD
}



=======

  }

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
>>>>>>> salvar-no-db










