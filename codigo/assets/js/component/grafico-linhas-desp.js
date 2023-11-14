   // Função para obter um usuário específico pelo ID
   async function fetchUserById(userId) {
    debugger
    const apiUrl = "https://jsonserver-proknow.joopaulopaulo33.repl.co/usuarios";
    const response = await fetch(apiUrl);
    const data = await response.json();
    const user = data.find(u => u.id === userId);
    return user;
}

// Função para criar e renderizar o gráfico
async function createChart(userId) {
    const user = await fetchUserById(userId);

    if (!user) {
        console.error("Usuário não encontrado.");
        return;
    }

    // Organizar os dados para o gráfico
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const receitasData = user.incomings ? parseFloat(user.incomings.salario.replace(",", "")) + parseFloat(user.incomings.bonus.replace(",", "")) : 0;

    // Verificar se o usuário possui despesas
    const despesasData = user.expenses ? parseFloat(user.expenses.despesas.replace(",", "")) : 0;

    // Criar o gráfico
    const ctx = document.getElementById('myLineChart').getContext('2d');
    const myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Receitas',
                    data: Array(12).fill(receitasData),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Despesas',
                    data: Array(12).fill(despesasData),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5000,
                    stepSize: 500
                }
            }
        }
    });
}

// Chamar a função para criar o gráfico com o ID do usuário desejado (substituir pelo ID real)
createChart(24); // Exemplo: ID 24