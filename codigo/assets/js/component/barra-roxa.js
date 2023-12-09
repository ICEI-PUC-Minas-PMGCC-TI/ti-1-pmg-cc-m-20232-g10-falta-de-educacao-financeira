document.addEventListener("DOMContentLoaded", async function () {
  try {
      const apiPath = 'https://jsonserver-proknow.joopaulopaulo33.repl.co/usuarios';

      async function fetchData() {
          // Supondo que você tenha uma maneira de obter o nome de usuário (substitua 'username' pelo valor real)
          const username = 'username';

          try {
              const usuario = await getData(username);

              if (usuario) {
                  // Restante do código para processar os dados do usuário
                  const despesas = parseFloat((usuario.expenses?.despesas || 'R$ 0,00').replace('R$ ', '').replace(',', '.')) || 0;
                  const despesasMes = parseFloat((usuario.expenses?.despesasMes || 'R$ 0,00').replace('R$ ', '').replace(',', '.')) || 0;
                  const lazer = parseFloat((usuario.expenses?.lazer || 'R$ 0,00').replace('R$ ', '').replace(',', '.')) || 0;

                  const totalDespesas = despesas + despesasMes + lazer;

                  const alturaMaxima = 80;

                  const porcentagensSemanais = {
                      domingo: 5,
                      segunda: 10,
                      terca: 15,
                      quarta: 20,
                      quinta: 15,
                      sexta: 10,
                      sabado: 25,
                  };

                  for (const dia in porcentagensSemanais) {
                      const porcentagem = porcentagensSemanais[dia];
                      const alturaBarra = (totalDespesas * porcentagem / 100) * (alturaMaxima / totalDespesas);
                      const barraRoxa = document.getElementById(dia);
                      barraRoxa.style.height = `${alturaBarra}px`;
                  }

                  document.getElementById("valor").textContent = `R$ ${(totalDespesas / 4).toFixed(2)}`;
              } else {
                  console.error("Usuário não encontrado.");
              }
          } catch (error) {
              console.error("Erro ao processar os dados do usuário: ", error);
          }
      }

      async function getData(username) {
          const response = await fetch(`${apiPath}?login=${username}`);

          if (!response.ok) {
              throw new Error("Não foi possível encontrar o usuário!");
          }

          return await response.json();
      }

      // Chame a função para buscar os dados da API e calcular as despesas do usuário
      fetchData();
  } catch (error) {
      console.error("Ocorreu um erro: ", error);
  }
});





































/*document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://jsonserver-proknow.joopaulopaulo33.repl.co/usuarios";

  // Função para buscar os dados da API e atualizar as barras no HTML
  async function fetchData() {
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const usuarios = await response.json();

        // Calcular a soma total de totalIncomings a partir de salario, bonus e ativos
        const totalIncomings = usuarios.reduce((total, usuario) => {
          const salario = parseFloat((usuario.incomings.salario || 'R$ 0.00').replace('R$ ', '').replace(',', '.')) || 0;
          const bonus = parseFloat((usuario.incomings.bonus || 'R$ 0.00').replace('R$ ', '').replace(',', '.')) || 0;
          const ativos = parseFloat((usuario.incomings.ativos || 'R$ 0.00').replace('R$ ', '').replace(',', '.')) || 0;

          return total + salario + bonus + ativos;
        }, 0);

        // Definir as porcentagens para cada dia da semana com base no totalIncomings
        const porcentagensPorDia = {
          domingo: (totalIncomings / 4) / 7 * 0.01,  // Ajuste o número de semanas do mês conforme necessário
          segunda: (totalIncomings / 4) / 7 * 0.01,
          terca: (totalIncomings / 4) / 7 * 0.01,
          quarta: (totalIncomings / 4) / 7 * 0.01,
          quinta: (totalIncomings / 4) / 7 * 0.01,
          sexta: (totalIncomings / 4) / 7 * 0.9,
          sabado: (totalIncomings / 4) / 7 * 0.01
        };

        // Atualizar as alturas das barras com as porcentagens calculadas
        const diasDaSemana = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
        diasDaSemana.forEach(dia => {
          const barra = document.getElementById(dia);
          barra.style.height = `${porcentagensPorDia[dia]}px`;
        });
      } else {
        console.error("Erro ao buscar os dados da API.");
      }
    } catch (error) {
      console.error("Ocorreu um erro: ", error);
    }
  }

  // Chame a função para buscar os dados da API e atualizar o HTML
  fetchData();
});


*/