
const databaseLink = 'https://jsonserver-sprint-3-pagina-de-escrita.luizfelipe353.repl.co/historias';

document.addEventListener('DOMContentLoaded', function () {
    const salvarBtn = document.getElementById('btnSalvar');

    salvarBtn.addEventListener('click', function () {
        const nomeHistoria = document.getElementById('inputNomedahistoria').value;
        const descricao = document.getElementById('inputSinopse').value;

        
        const dadosHistoria = {
            nome: nomeHistoria,
            descricao: descricao
        };

       
        fetch(databaseLink, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosHistoria)
        })
        .then(response => response.json())
        .then(data => {
            console.log('História salva com sucesso:', data);
            alert('História salva com sucesso!');
            document.getElementById('inputNomedahistoria').value = '';
            document.getElementById('inputSinopse').value = '';
        })
        .catch(error => {
            console.error('Erro ao salvar a história:', error);
            alert('Erro ao salvar a história. Por favor, tente novamente.');
        });
        
    });
    
});
document.addEventListener('DOMContentLoaded', function () {
    const popupLinks = document.querySelectorAll('.popup-link');

    popupLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); 

            const url = this.getAttribute('href');
            const popupWindow = window.open(url, 'popupWindow', 'width=800,height=600'); 
            if (popupWindow) {
                popupWindow.focus(); 
            } else {
                alert('O navegador bloqueou a abertura da janela popup. Verifique as configurações do seu navegador.'); 
            }
        });
    });
});
