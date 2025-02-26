// Efeitos visuais para cards (opcional)
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

// Controle do Popup
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('closeBtn');  // Botão de fechar popup
    
    // Verificar cookie de 7 dias
    const popupCookie = document.cookie.split('; ').find(row => row.startsWith('popupClosed='));
    
    if (!popupCookie) {
        popup.style.display = 'flex';
    }

    // Fechar ao clicar fora
    window.onclick = (e) => {
        if (e.target === popup) popup.style.display = 'none';
    }

    // Fechar popup ao clicar no botão
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }
});

// Função para fechar popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Controle do Formulário
document.getElementById('popupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados mesmo que vazios
    const dados = {
        nome: document.getElementById('name').value.trim() || 'Não informado',
        email: document.getElementById('email').value.trim() || 'Não informado',
        telefone: document.getElementById('phone').value.trim() || 'Não informado'
    };

    // Salvar em localStorage
    const historico = JSON.parse(localStorage.getItem('cadastros')) || [];
    historico.push(dados);
    localStorage.setItem('cadastros', JSON.stringify(historico));

    // Gerar Excel
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(historico, {
        header: ["nome", "email", "telefone"],
        skipHeader: false
    });
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes");
    XLSX.writeFile(workbook, 'Clientes_MCM_Viagens.xlsx');

    // Fechar popup imediatamente
    closePopup();

    // Configurar cookie de 7 dias
    const date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = `popupClosed=true; expires=${date.toUTCString()}; path=/`;
});

// javascript.js
document.getElementById('offerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Acesso seguro aos elementos
    const formElements = {
        name: this.querySelector('[name="name"]'),
        email: this.querySelector('[name="email"]'),
        phone: this.querySelector('[name="phone"]'),
        travel_date: this.querySelector('[name="travel_date"]')
    };

    // Verificação de elementos
    if(!Object.values(formElements).every(element => element !== null)) {
        console.error('Elementos do formulário não encontrados!');
        return;
    }

    // Coletar dados
    const formData = {
        name: formElements.name.value,
        email: formElements.email.value,
        phone: formElements.phone.value,
        travel_date: formElements.travel_date.value,
        timestamp: new Date().toISOString()
    };

    // Resto do código permanece igual
    let submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    submissions.push(formData);
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));

    alert('Obrigado! Suas informações foram salvas com sucesso.');
    this.reset();
    document.querySelector('.popup').classList.remove('active');
});

document.addEventListener('DOMContentLoaded', function() {
    // Todo o código relacionado ao formulário aqui
});
