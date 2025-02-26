// Efeitos visuais para cards (opcional - pode remover se quiser)
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = "translateY(-5px)";
        card.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
    });
});

// Controle do Popup e Formulário (versão simplificada)
document.addEventListener('DOMContentLoaded', () => {
    // Elementos essenciais
    const popup = document.querySelector('.popup');
    const offerForm = document.getElementById('offerForm');
    
    // Mostrar popup ao carregar
    popup.style.display = 'flex';

    // Fechar ao clicar fora
    popup.addEventListener('click', (e) => {
        if(e.target === popup) popup.style.display = 'none';
    });

    // Envio do formulário
    if(offerForm) {
        offerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Coleta simplificada de dados
            const formData = {
                name: offerForm.name.value,
                email: offerForm.email.value,
                phone: offerForm.phone.value,
                travel_date: offerForm.travel_date.value,
                timestamp: new Date().toISOString()
            };

            // Salvar no localStorage
            const submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
            submissions.push(formData);
            localStorage.setItem('formSubmissions', JSON.stringify(submissions));

            // Feedback e reset
            alert('Dados salvos com sucesso!');
            offerForm.reset();
            popup.style.display = 'none';
        });
    }
});
