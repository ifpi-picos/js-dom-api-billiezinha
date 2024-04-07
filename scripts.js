async function loadRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`)
        const repos = await response.json();
        console.log(repos)
        const repoSelect = document.getElementById('repoSelect');
        repoSelect.innerHTML = '';
        repos.forEach(repo => {
            const option = document.createElement('option');
            option.value = repo.name;
            option.textContent = repo.name;
            repoSelect.appendChild(option);
        });
        document.getElementById('userInfo').textContent = `Usuário do GitHub: ${username}`;
        localStorage.setItem('githubUsername', username);
    } catch (error) {
        console.error('Erro ao carregar repositórios:', error);
    }
}

window.onload = function() {
    const savedUsername = localStorage.getItem('githubUsername');
    if (savedUsername) {
        document.getElementById('githubUserInput').value = savedUsername;
        loadRepos(savedUsername);
    }
};

function adicionarTarefa() {
    var input = document.getElementById("taskInput");
    var textoTarefa = input.value.trim();
    if (textoTarefa === "") return;

    var dateInput = document.getElementById("dateInput");
    var dataTarefa = dateInput.value;

    var githubUserInput = document.getElementById("githubUserInput");
    var username = githubUserInput.value.trim();

    var listaTarefas = document.getElementById("taskList");
    var itemTarefa = document.createElement("li");
    itemTarefa.textContent = textoTarefa + " - " + dataTarefa;
    itemTarefa.onclick = function() {
        concluirTarefa(this);
    };

    var removerBotao = document.createElement("button");
    removerBotao.innerHTML = '<i class="fas fa-trash"></i>';
    removerBotao.onclick = function(event) {
        event.stopPropagation();
        removerTarefa(this.parentNode);
    };

    itemTarefa.appendChild(removerBotao);
    listaTarefas.appendChild(itemTarefa);

    var tarefa = {
        texto: textoTarefa,
        data: dataTarefa
    };
    var tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefasSalvas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));

    input.value = "";
    dateInput.value = "";
}

window.onload = function() {
    const savedUsername = localStorage.getItem('githubUsername');
    if (savedUsername) {
        document.getElementById('githubUserInput').value = savedUsername;
        loadRepos(savedUsername);
    }

    const savedTasks = JSON.parse(localStorage.getItem('tarefas'));
    if (savedTasks) {
        const listaTarefas = document.getElementById("taskList");
        savedTasks.forEach(function(tarefa) {
            var itemTarefa = document.createElement("li");
            itemTarefa.textContent = tarefa.texto + " - " + tarefa.data;
            itemTarefa.onclick = function() {
                concluirTarefa(this);
            };

            var removerBotao = document.createElement("button");
            removerBotao.innerHTML = '<i class="fas fa-trash"></i>';
            removerBotao.onclick = function(event) {
                event.stopPropagation();
                removerTarefa(this.parentNode);
            };

            itemTarefa.appendChild(removerBotao);
            listaTarefas.appendChild(itemTarefa);
        });
    }
};

repoSelect.addEventListener('change', function() {
    const selectedRepo = this.value;
    document.getElementById('repoInfo').textContent = `Repositório selecionado: ${selectedRepo}`;
});


document.getElementById("githubUserInput").addEventListener("change", function() {
    var username = this.value.trim();
    loadRepos(username);
});

function removerTarefa(tarefaElement) {
    tarefaElement.remove();

    var tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
    var textoTarefaRemovida = tarefaElement.textContent.split(" - ")[0]; // Extrair o texto da tarefa removida
    tarefasSalvas = tarefasSalvas.filter(function(tarefa) {
        return tarefa.texto !== textoTarefaRemovida; // Filtrar todas as tarefas, exceto a removida
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));
}

window.onload = function() {
    const savedUsername = localStorage.getItem('githubUsername');
    if (savedUsername) {
        document.getElementById('githubUserInput').value = savedUsername;
        loadRepos(savedUsername);
    }

    const savedTasks = JSON.parse(localStorage.getItem('tarefas'));
    if (savedTasks) {
        const listaTarefas = document.getElementById("taskList");
        savedTasks.forEach(function(tarefa) {
            var itemTarefa = document.createElement("li");
            itemTarefa.textContent = tarefa.texto + " - " + tarefa.data;
            itemTarefa.onclick = function() {
                concluirTarefa(this);
            };

            var removerBotao = document.createElement("button");
            removerBotao.innerHTML = '<i class="fas fa-trash"></i>';
            removerBotao.onclick = function(event) {
                event.stopPropagation();
                removerTarefa(itemTarefa);
            };

            itemTarefa.appendChild(removerBotao);
            listaTarefas.appendChild(itemTarefa);
        });
    }
};
