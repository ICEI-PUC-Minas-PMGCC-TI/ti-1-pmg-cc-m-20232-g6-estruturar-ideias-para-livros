const databaseLink = "https://json-server-luizfelipe-cadastrolocais.luizfelipe353.repl.co/locais";
let locaisParaExcluir = []; // Array para armazenar os locais marcados para exclusão

function carregarLocais() {
    fetch(databaseLink)
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

                // Adicione um evento de clique para marcar o local para exclusão
                localItem.addEventListener('click', () => toggleExcluirLocal(local));

                listaLocais.appendChild(localItem);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar locais:', error);
        });
}

// Função para salvar um novo local
function salvarLocal(novoLocal) {
    fetch(databaseLink, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoLocal),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Novo local criado:', data);
            carregarLocais(); // Atualize a lista de locais após criar um novo local
        })
        .catch(error => {
            console.error('Erro ao criar local:', error);
        });
}

// Evento de clique no botão "Salvar"
const botaoSalvar = document.querySelector('.btn-success');
botaoSalvar.addEventListener('click', () => {
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

    salvarLocal(novoLocal); // Chame a função salvarLocal ao salvar um novo local
});

// Função para marcar/desmarcar um local para exclusão
function toggleExcluirLocal(local) {
    const localIndex = locaisParaExcluir.findIndex(item => item.id === local.id);
    if (localIndex === -1) {
        locaisParaExcluir.push(local);
    } else {
        locaisParaExcluir.splice(localIndex, 1);
    }
}

// Função para excluir locais marcados para exclusão
function excluirLocaisMarcados() {
    locaisParaExcluir.forEach(local => {
        fetch(`${databaseLink}/${local.id}`, {
            method: 'DELETE',
        })
            .then(() => {
                console.log(`Local com ID ${local.id} excluído.`);
            })
            .catch(error => {
                console.error('Erro ao excluir local:', error);
            });
    });

    // Limpe a lista de locais marcados para exclusão
    locaisParaExcluir = [];

    // Atualize a lista de locais
    carregarLocais();
}

// Chame carregarLocais() para exibir os locais quando a página carregar
carregarLocais();
