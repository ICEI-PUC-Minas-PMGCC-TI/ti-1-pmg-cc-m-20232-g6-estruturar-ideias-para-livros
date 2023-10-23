const databaseLink = "https://json-server-luizfelipe-cadastrolocais.luizfelipe353.repl.co/locais";
    function carregarLocais() {
        fetch('https://json-server-luizfelipe-cadastrolocais.luizfelipe353.repl.co/locais')
            .then(response => response.json())
            .then(data => {
                const listaLocais = document.querySelector('.list-group'); // Selecione a lista de locais

                // Limpe a lista atual
                listaLocais.innerHTML = '';

                // Adicione os locais do servidor à lista
                data.forEach(local => {
                    const localItem = document.createElement('a');
                    localItem.className = 'list-group-item list-group-item-action';
                    localItem.textContent = local.nome;
                    listaLocais.appendChild(localItem);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar locais:', error);
            });
    }

    // Função para salvar um novo local
    function salvarLocal() {
        const nome = document.getElementById('inputNomedoLocal').value;
        const arquitetura = document.getElementById('inputArquiteturadoLocal').value;
        const geografia = document.getElementById('inputGeografiadoLocal').value;
        const historia = document.getElementById('inputHistoriadoLocal').value;

        const novoLocal = {
            nome,
            'arquitetura do local': arquitetura,
            'geografia do local': geografia,
            'história do local': historia
        };

        fetch('https://json-server-luizfelipe-cadastrolocais.luizfelipe353.repl.co/locais', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoLocal),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Local criado:', data);
                carregarLocais(); // Atualize a lista de locais após criar um novo local
            })
            .catch(error => {
                console.error('Erro ao criar local:', error);
            });
    }

    // Função para excluir um local
    function excluirLocal() {
        // Aqui você pode implementar a lógica para excluir um local
        // Certifique-se de chamar carregarLocais() após a exclusão para atualizar a lista
    }

    // Chame carregarLocais() para exibir os locais quando a página carregar
    carregarLocais();