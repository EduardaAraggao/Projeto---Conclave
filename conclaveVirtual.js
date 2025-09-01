// CONCLAVE VIRTUAL - ELEIÇÃO DO PAPA
// Esse programa simula a votação para escolher o Papa
// Ele usa cadastro de cardeais, votação secreta e conta os votos

const prompt = require("prompt-sync")({ sigint: false });

// Função para cadastrar os cardeais (5 pessoas que podem ser escolhidas)
function cadastrarCardeais() {
  let cardeais = []; // lista vazia

  // Vamos repetir 5 vezes para cadastrar 5 cardeais
  for (let i = 0; i < 5; i++) {
    let nome = prompt(`Digite o nome do Cardeal ${i + 1}: `);
    // cada cardeal tem um número (id) e um nome
    cardeais.push({ id: i + 1, nome: nome });
  }

  return cardeais; // devolvemos a lista de cardeais
}

// Função para mostrar o menu com os nomes digitados
function exibirMenu(cardeais) {
  console.log("\n=== MENU DE VOTAÇÃO PERSONALIZADO ===");
  console.log("Escolha entre os cardeais cadastrados:");

  // Aqui mostramos exatamente os nomes que o usuário digitou
  cardeais.forEach((c) => {
    console.log(`${c.id} - ${c.nome}`);
  });
}

// Função que faz a votação secreta
function realizarVotacao(cardeais) {
  let votos = new Array(cardeais.length).fill(0); // zera os votos
  let qtdVotantes = cardeais.length; // todos os cardeais votam

  for (let i = 0; i < qtdVotantes; i++) {
    exibirMenu(cardeais); // mostramos os nomes digitados
    let voto = parseInt(
      prompt(`Eleitor ${i + 1}, digite o número do cardeal escolhido: `)
    );

    // se o número do voto for válido, contamos
    if (voto >= 1 && voto <= cardeais.length) {
      votos[voto - 1]++; // soma 1 voto para o escolhido
    } else {
      console.log(" Voto inválido! Será desconsiderado.");
    }
  }

  return votos; // devolvemos os votos contados
}

// Função que verifica se alguém ganhou com 2/3 dos votos
function verificarResultado(cardeais, votos) {
  let totalVotos = votos.reduce((a, b) => a + b, 0); // soma todos os votos
  let necessario = Math.floor((2 * totalVotos) / 3) + 1; // calcula 2/3 arredondado pra cima
  let eleito = null;

  console.log("\n=== RESULTADO DA VOTAÇÃO ===");
  for (let i = 0; i < cardeais.length; i++) {
    console.log(`${cardeais[i].nome}: ${votos[i]} votos`);
    if (votos[i] >= necessario) {
      eleito = cardeais[i]; // guarda quem atingiu os votos
    }
  }

  if (eleito) {
    console.log(
      `\n O novo Papa eleito é: ${eleito.nome} com ${
        votos[eleito.id - 1]
      } votos!`
    );
    return true;
  } else {
    console.log(
      "\n Nenhum cardeal alcançou 2/3 dos votos. Haverá uma nova votação!"
    );
    return false;
  }
}

// Função principal do programa
function conclaveVirtual() {
  console.log("==== CONCLAVE VIRTUAL - ELEIÇÃO DO PAPA ====");

  // Primeiro cadastramos os cardeais
  let cardeais = cadastrarCardeais();

  let eleito = false; // começa sem vencedor
  while (!eleito) {
    // Fazemos uma votação
    let votos = realizarVotacao(cardeais);

    // Vemos se alguém ganhou
    eleito = verificarResultado(cardeais, votos);

    // Se ninguém ganhou, perguntamos se o usuário quer continuar
    if (!eleito) {
      let escolha = prompt(
        "\nDeseja continuar a votação? (S/N): "
      ).toUpperCase();
      if (escolha !== "S") {
        console.log(" Conclave encerrado sem eleição de Papa.");
        break;
      }
    }
  }
}

// Aqui chamamos a função principal para rodar o programa
conclaveVirtual();
