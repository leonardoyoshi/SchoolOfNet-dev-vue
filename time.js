export class Time {
  constructor(nome, escudo){
    this.nome = nome;
    this.escudo = escudo;

    this.pontos = 0;
    this.GP = 0;
    this.GC = 0;
  }

  updateInfo(pontos, golsPro, golsSofridos){
    this.pontos += pontos;
    this.GP += golsPro;
    this.GC += golsSofridos;
  }

  fimJogo(timeAdversario, gols, golsAdversario){
    if(gols == golsAdversario){               //empate
      this.updateInfo(1, gols, golsAdversario); //1 é a qntidade de pontos a serem somados
      timeAdversario.updateInfo(1,golsAdversario,gols);
    } else {
      if(gols > golsAdversario){  //time da casa venceu
        this.updateInfo(3, gols, golsAdversario); //3 é a qntidade de pontos a serem somados
        timeAdversario.updateInfo(0,golsAdversario,gols);
      } else {    //time visitante venceu
          this.updateInfo(0,gols,golsAdversario);
          timeAdversario.updateInfo(3, golsAdversario, gols);
      }
   }
  }
}