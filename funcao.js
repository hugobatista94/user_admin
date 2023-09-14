function retornar(){
    window.location="index.html";
}

function checarAcesso(){
    var login = document.getElementById("login").value;
	var senha = document.getElementById("senha").value;
    if(login=="admin" && senha=="admin"){
        alert("Seja Bem Vindo ao Sistema");
        window.location="admin.html";
    }
    else{
        alert("Login e/ou Senha não Conferem");
        window.location="index.html";
    }
}

// Criando a lista de compras
var servico = [];

// Salvando os Dados em Json
function saveListStorage(servico){
	var jsonStr = JSON.stringify(servico);
	localStorage.setItem("servico",jsonStr);
}

// Identifica o Registro Salvo
function initListStorage(){
	var testList = localStorage.getItem("servico");
	if(testList){
		servico = JSON.parse(testList);
	}
	setList(servico);
}
initListStorage();

//Criando a Tabela no Front-End
function setList(servico){
	var table = '<thead class="table-dark"><tr><td></td><td>Nome</td><td>Email</td><td>Telefone</td><td>Serviço</td><td>Agendamento</td><td>Apagar</td></tr></thead><tbody>';
	for(var key in servico){
		table += '<tr><td></td><td>'+ formatNome(servico[key].nome) +'</td><td>'+ formatEmail(servico[key].email) +'</td><td>'+ formatTelefone(servico[key].telefone) +'</td><td>'+ formatOpcao(servico[key].opcao) +'</td><td>'+ servico[key].hoje +'</td><td><img src="img/trash.png" width="25px" onclick="deleteData('+key+');"></td></tr>';
	}
	table += '</tbody>';
	document.getElementById('listTable').innerHTML = table;
	saveListStorage(servico);
}

function formatNome(nome){
	var str = nome.toUpperCase();
	return str;
}

function formatEmail(email){
	var str = email.toLowerCase();
	return str;
}

function formatTelefone(telefone){
	var str = telefone;
	return str;
}

function formatOpcao(opcao){
	var str = opcao.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}

function addData(){
    var data = new Date();
	var nome = document.getElementById("nome").value;
	var email = document.getElementById("email").value;
    var telefone = document.getElementById("telefone").value;
	var opcao = document.getElementById("opcao").value;
    var hoje = data.toLocaleDateString();
	servico.unshift({"nome":nome, "email":email, "telefone":telefone, "opcao":opcao, "hoje":hoje});
	setList(servico);
	resetForm();
}

function resetForm(){
	document.getElementById("nome").value="";
	document.getElementById("email").value="";
	document.getElementById("telefone").value="";
	document.getElementById("opcao").value="";
}

function deleteData(id){
	if(confirm("Confirma Exclusão(S/N)?")){
		if(id == servico.length - 1){
			servico.pop();
		}
		else if(id == 0){
			servico.shift();
		}
		else{
			var arrAuxIni = servico.slice(0,id);
			var arrAuxEnd = servico.slice(id + 1);
			servico = arrAuxIni.concat(arrAuxEnd);
		}
		setList(servico);
	}
}
