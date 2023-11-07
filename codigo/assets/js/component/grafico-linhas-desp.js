document.addEventListener("DOMContentLoaded", function() {
    fetch('https://jsonserver-proknow.joopaulopaulo33.repl.co/usuarios')
        .then(response => response.json())
        .then(data => {
            const relevantUsers = data.filter(entry => entry.incomings || entry.expenses);
            const monthLabels = Array.from({ length: 12 }, (_, i) => {
                const date = new Date(2023, i, 1);
                return date.toLocaleString('default', { month: 'long' });
            });

            const ctx = document.getElementById('myChart').getContext('2d');

            relevantUsers.forEach(user => {
                if (user.id === 27) {
                    if (user.incomings) {
                        if (user.incomings && user.expenses) {
                            const salario = user.incomings.salario ? parseFloat(user.incomings.salario.replace(',', '')) : 0;
                            const bonus = user.incomings.bonus ? parseFloat(user.incomings.bonus.replace(',', '')) : 0;
                            const ativos = user.incomings.hasInvestments && user.incomings.ativos ? parseFloat(user.incomings.ativos.replace(',', '')) : 0;
                        
                            const receitas = salario + bonus + ativos;

                        
                    
                        }
                        

                        else if (user.expenses) {
                            const despesasFixas = user.expenses.despesas ? parseFloat(user.expenses.despesas.replace('R$', '').replace(',', '')) : 0;
                            const despesasMes = user.expenses.despesasMes ? parseFloat(user.expenses.despesasMes.replace('R$', '').replace(',', '')) : 0;
                            const despesasLazer = user.expenses.lazer ? parseFloat(user.expenses.lazer.replace('R$', '').replace(',', '')) : 0;
                        
                            const despesas = despesasFixas + despesasMes + despesasLazer;
                        
                            const userChart = document.createElement('canvas');
                            userChart.id = `chart_${user.id}`;
                            document.body.appendChild(userChart);
                        
                            new Chart(userChart, {
                                type: 'line',
                                data: {
                                    labels: ['Despesas Fixas', 'Despesas Mensais', 'Despesas com Lazer'],
                                    datasets: [{
                                        label: `Gráfico de Despesas de ${user.nome}`,
                                        data: [despesasFixas, despesasMes, despesasLazer],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(255, 159, 64, 1)',
                                            'rgba(153, 102, 255, 1)'
                                        ],
                                        borderWidth: 1,
                                        fill: false
                                    }]
                                },
                                options: {
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: {
                                            beginAtZero: true
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
            });

            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: monthLabels,
                    datasets: [
                        {
                            label: 'Receitas',
                            data: Array(12).fill(0),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: 'Despesas',
                            data: Array(12).fill(0),
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                            fill: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
});
