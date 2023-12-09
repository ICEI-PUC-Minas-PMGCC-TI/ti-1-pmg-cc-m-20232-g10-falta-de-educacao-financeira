const hasInvestments = document.getElementById('ativos');




function registerIncoming(obj) {

  fetch(apiPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonBody + obj)
  })

    .then(response => {
      response.json();
      console.log(response.json())
    })
    .then(data => {
      console.log('Success:');
      console.log(data);
    })
    .catch(error => {
      console.error('Erro ao inserir contato via API', error);

    })
}


hasInvestments.addEventListener('change', function () {
  if (hasInvestments.value == 'Sim') {
    campoAdicional.style.display = 'block';
  } else {
    campoAdicional.style.display = 'none';
  }
})

const currency = document.querySelector("#currency");

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
});

function formatarMoeda(input) {
  let valor = input.value.replace(/\D/g, '');

  input.value = formatter.format(valor / 100);
}

function init() {
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {

    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()

      }


      form.classList.add('was-validated')

      const salario = document.getElementById('currency').value; // Valor do campo "salario"
      const bonus = document.getElementById('bonus').value;
      const invest = document.getElementById('ativos').value // Valor do campo "bonus"
      const ativos = document.getElementById('ganhos').value;
      console.log(salario)
      console.log(bonus)
      console.log(invest)
      console.log(ativos)

      let jsonBody = data.map(function (user) {

      })
      let objIncoming = {
        incomings: {
          salarios: salario,
          bonus: bonus,
          hasInvestments: invest === 'Sim' ? true : false,
          ativos: invest === 'Sim' ? ativos : " "
        }
      }

      registerIncoming(objIncoming);
    }, false)
  })

}
async function assignIncoming() {
  try {
    const response = await fetch(apiPath);
    const users = await response.json();

    for (const user of users) {
      if (!user.incomings) {
        user.incoming = {
          salarios: salario,
          bonus: bonus,
          hasInvestments: invest === 'Sim' ? true : false,
          ativos: invest === 'Sim' ? ativos : " "
        }

        await updateUser(user);
        console.log('Atribuido incoming ao usuario: ', user);
        break;
      }
    }
  } catch (error) {
    console.error('Erro ao atribuir incoming ao usuario: ', error);
  }
}













