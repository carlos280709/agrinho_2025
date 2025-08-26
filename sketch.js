let campo = [];
let sementes = 10;
let agua = 10; // Água não vai diminuir
let tipoPlanta = "milho"; // Tipo de planta inicial
let tipoAnimal = null; // Nenhum animal no início
let dinheiro = 0;

function setup() {
  createCanvas(600, 400);
  noStroke();

  // Inicializa o campo com células vazias
  for (let i = 0; i < 10; i++) {
    campo[i] = [];
    for (let j = 0; j < 7; j++) {
      campo[i][j] = { planta: null, animal: null, ciclo: 0 }; // ciclo para controlar o crescimento
    }
  }
}

function draw() {
  background(200, 255, 200);
  
  // Exibe o campo
  for (let i = 0; i < campo.length; i++) {
    for (let j = 0; j < campo[i].length; j++) {
      let x = i * 60 + 40;
      let y = j * 60 + 40;
      fill(139, 69, 19); // Cor do solo
      rect(x, y, 50, 50);

      // Exibe a planta, se houver
      if (campo[i][j].planta !== null) {
        // A planta muda de cor e tamanho dependendo do estágio de crescimento
        let plant = campo[i][j].planta;
        let ciclo = campo[i][j].ciclo;

        if (plant === "milho") {
          fill(255, 255, 0); // Cor do milho
        } else if (plant === "tomate") {
          fill(255, 0, 0); // Cor do tomate
        } else if (plant === "soja") {
          fill(0, 255, 0); // Cor da soja
        } else if (plant === "trigo") {
          fill(255, 215, 0); // Cor do trigo
        }

        // Exibição do crescimento
        let tamanho = map(ciclo, 0, 100, 10, 40); // O tamanho da planta cresce com o ciclo
        ellipse(x + 25, y + 25, tamanho, tamanho); // Representação simples da planta
      }

      // Exibe o animal, se houver
      if (campo[i][j].animal !== null) {
        fill(150);
        ellipse(x + 25, y + 25, 30, 30); // Representação simples do animal
      }
    }
  }

  // Atualiza o ciclo de crescimento das plantas
  for (let i = 0; i < campo.length; i++) {
    for (let j = 0; j < campo[i].length; j++) {
      let plant = campo[i][j].planta;

      // Se a célula tiver uma planta e o ciclo não tiver atingido 100
      if (plant !== null && campo[i][j].ciclo < 100) {
        campo[i][j].ciclo++;
      }
    }
  }

  // Mostrar o texto do HUD
  fill(0);
  textSize(16);
  text("Sementes: " + sementes, 20, height - 100);
  text("Água: " + agua, 20, height - 80); // A água não diminui mais
  text("Dinheiro: $" + dinheiro, 20, height - 60);
  text("Plante/Animais: " + tipoPlanta, 20, height - 40);
  text("Animal: " + (tipoAnimal ? tipoAnimal : "Nenhum"), 20, height - 20);
}

function mousePressed() {
  let col = floor((mouseX - 40) / 60);
  let row = floor((mouseY - 40) / 60);

  if (col >= 0 && col < 10 && row >= 0 && row < 7) {
    if (campo[col][row].planta === null && sementes > 0 && tipoAnimal === null) {
      // Planta uma nova planta
      campo[col][row].planta = tipoPlanta;
      campo[col][row].ciclo = 0; // Começa o ciclo de crescimento
      sementes--;
    } else if (campo[col][row].animal === null && tipoAnimal !== null) {
      // Adiciona um animal na célula
      campo[col][row].animal = tipoAnimal;
      tipoAnimal = null;
    } else if (campo[col][row].planta !== null && campo[col][row].ciclo === 100) {
      // Colhe a planta quando ela está madura (ciclo 100)
      let plantaColhida = campo[col][row].planta;
      campo[col][row].planta = null;
      campo[col][row].ciclo = 0;

      // Ganho de dinheiro e sementes ao colher
      if (plantaColhida === "milho") {
        dinheiro += 10;
        sementes += 3; // Ganho de 3 sementes
      } else if (plantaColhida === "tomate") {
        dinheiro += 15;
        sementes += 4; // Ganho de 4 sementes
      } else if (plantaColhida === "soja") {
        dinheiro += 20;
        sementes += 5; // Ganho de 5 sementes
      } else if (plantaColhida === "trigo") {
        dinheiro += 25;
        sementes += 6; // Ganho de 6 sementes
      }
    } else if (campo[col][row].animal !== null) {
      // Coleta recurso do animal
      let animal = campo[col][row].animal;
      campo[col][row].animal = null;
      if (animal === "vaca") {
        dinheiro += 30; // Ganha dinheiro com o leite da vaca
      } else if (animal === "porco") {
        dinheiro += 50; // Ganha dinheiro com carne do porco
      }
    }
  }
}

// Alternar entre tipos de plantas e animais com as teclas pressionadas
function keyPressed() {
  if (key === 'm' || key === 'M') {
    tipoPlanta = "milho";
  } else if (key === 't' || key === 'T') {
    tipoPlanta = "tomate";
  } else if (key === 's' || key === 'S') {
    tipoPlanta = "soja";
  } else if (key === 'w' || key === 'W') {
    tipoPlanta = "trigo";
  } else if (key === 'v' || key === 'V') {
    tipoAnimal = "vaca";
  } else if (key === 'p' || key === 'P') {
    tipoAnimal = "porco";
  }
}
