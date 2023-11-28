document.addEventListener("DOMContentLoaded", function() {
    // Conhecendo teoricamente o ID do usuário após o login
    const userId = "1"; // Substitua pelo ID do usuário que você conhece

    // Obter dados do servidor JSON
    fetch("https://jsonserver-proknow.joopaulopaulo33.repl.co/usuarios")
        .then(response => response.json())
        .then(data => {
            // Encontrar o usuário desejado pelo ID
            const user = data.find(user => user.id == userId);

            if (user) {
                // Utilizar o usuário encontrado para criar gráficos
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const expensesData = getExpensesData(user);
                const incomingsData = getIncomingsData(user);

                // Criar gráfico de despesas e receitas para o usuário específico
                var ctxExpensesIncomings = document.getElementById("expensesIncomingsChart");
                if (ctxExpensesIncomings) {
                    var expensesIncomingsChart = new Chart(ctxExpensesIncomings, {
                        type: 'line',
                        data: {
                            labels: months,
                            datasets: [{
                                label: 'Despesas',
                                data: expensesData,
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 2,
                                fill: false
                            }, {
                                label: 'Receitas',
                                data: incomingsData,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 2,
                                fill: false
                            }]
                        },
                        options: {
                            responsive: true,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        callback: function(value, index, values) {
                                            return 'R$ ' + value;
                                        }
                                    }
                                }
                            }
                        }
                    });
                } else {
                    console.error("Elemento canvas não encontrado.");
                }
            } else {
                console.error("Usuário não encontrado com o ID fornecido.");
            }
        })
        .catch(error => {
            console.error("Erro ao obter os dados JSON:", error);
        });

    // Função auxiliar para obter dados de despesas
    function getExpensesData(user) {
        if (user.expenses) {
            return [
                parseFloat(user.expenses.aluguel.replace(',', '.')),
                parseFloat(user.expenses.alimentacao.replace(',', '.')),
                parseFloat(user.expenses.lazer.replace(',', '.'))
            ];
        } else {
            console.error("Usuário não possui dados de despesas.");
            return [0, 0, 0];
        }
    }

    // Função auxiliar para obter dados de receitas
    function getIncomingsData(user) {
        if (user.incomings) {
            return [
                parseFloat(user.incomings.salario),
                parseFloat(user.incomings.bonus),
                parseFloat(user.incomings.ativos)
            ];
        } else {
            console.error("Usuário não possui dados de receitas.");
            return [0, 0, 0];
        }
    }
});