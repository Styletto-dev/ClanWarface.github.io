// database.js
// Simulação de banco de dados
let recruitmentDB = JSON.parse(localStorage.getItem('clanWfRecruitment')) || [];

function saveRecruitment(data) {
    // Adiciona ID único
    data.id = Date.now();
    
    // Adiciona status
    data.status = 'pending';
    
    // Adiciona ao "banco de dados"
    recruitmentDB.push(data);
    
    // Atualiza localStorage
    localStorage.setItem('clanWfRecruitment', JSON.stringify(recruitmentDB));
    
    console.log('Nova inscrição:', data);
}

function loadRecruitmentData() {
    const savedData = localStorage.getItem('clanWfRecruitment');
    if (savedData) {
        recruitmentDB = JSON.parse(savedData);
        console.log('Dados carregados:', recruitmentDB.length, 'inscrições');
    }
}

// Inicializa carregando dados existentes
loadRecruitmentData();
