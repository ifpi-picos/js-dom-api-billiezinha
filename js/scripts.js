function Tarefa(texto, data, etiquetas) {
    this.texto = texto;
    this.data = data;
    this.etiquetas = etiquetas;
}

function adicionarTarefa() {
    var input = document.getElementById("taskInput");
    var textoTarefa = input.value.trim();
    if (textoTarefa === "") return;

    var dateInput = document.getElementById("dateInput");
    var dataTarefa = dateInput.value;

    var etiquetasTarefa = [];

    var listaTarefas = document.getElementById("taskList");
    var itemTarefa = document.createElement("li");
    itemTarefa.textContent = textoTarefa + " - " + dataTarefa + " - " + etiquetasTarefa.join(", ");
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

    input.value = "";
    dateInput.value = "";
    salvarTarefas();
}

function concluirTarefa(tarefa) {
    tarefa.classList.toggle("concluida");
    salvarTarefas();
}

function removerTarefa(tarefa) {
    tarefa.parentNode.removeChild(tarefa);
    salvarTarefas();
}

function salvarTarefas() {
    var tarefas = [];
    var listaTarefas = document.getElementById("taskList").getElementsByTagName("li");
    for (var i = 0; i < listaTarefas.length; i++) {
        var tarefaTexto = listaTarefas[i].textContent;
        var partes = tarefaTexto.split(" - ");
        var texto = partes[0];
        var data = partes[1];
        var etiquetas = partes[2].split(", ");
        tarefas.push(new Tarefa(texto, data, etiquetas));
    }
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

window.onload = function() {
    var tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
        var tarefas = JSON.parse(tarefasSalvas);
        var listaTarefas = document.getElementById("taskList");
        tarefas.forEach(function(tarefa) {
            var itemTarefa = document.createElement("li");
            itemTarefa.textContent = tarefa.texto + " - " + tarefa.data + " - " + tarefa.etiquetas.join(", ");
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

document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});
