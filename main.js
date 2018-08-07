import Vue from 'vue'
import {Time} from './time';
import _ from 'lodash';

//require pode ser entendido como "puxar"
//tive um erro colocando 'style-loader!css' ou 'css-loader', resolvi retirando qlqr um dos 2 do require;
require('style-loader!bootstrap/dist/css/bootstrap.min.css');
require('bootstrap');

let meuVue = new Vue({
  el: '#app',
    data: {
    order: {
      keys: ['pontos', 'GP', 'GC'], //graças a biblioteca Loadash pra manipular Arrays, String
      sort: ['desc','desc','asc'] //tipos de ordenação pra cada key
    },
      filter: '',
      colunas: ['nome', 'pontos', 'GP', 'GC', 'saldo'],
      times: [
        new Time("Corinthians", require('./assets/corinthians_60x60.png')),
        new Time("Cruzeiro", require('./assets/cruzeiro_60x60.png')),
        new Time("Grêmio", require('./assets/gremio_60x60.png')),
        new Time("Palmeiras", require('./assets/palmeiras_60x60.png')),
        new Time("Flamengo", require('./assets/flamengo_60x60.png')),
        new Time("Chapecoense", require('./assets/chapecoense_60x60.png')),
        new Time("Santos", require('./assets/santos_60x60.png')),
        new Time("Atlético PR", require('./assets/atletico-pr_60x60.png'))
      ],
      novoJogo:{
          casa: {
              time: null,
              gols: 0
          },
          fora: {
              time:null,
              gols: 0
          }
      },
      view: 'tabela'
    },
    methods:{
      fimJogo(){
        let timeAdversario = this.novoJogo.fora.time;
        let gols = +this.novoJogo.casa.gols; //colocando o '+' ele converte pra inteiro
        let golsAdversario = +this.novoJogo.fora.gols; //colocando o '+' ele converte pra inteiro

        this.novoJogo.casa.time.fimJogo(timeAdversario, gols, golsAdversario);
        this.showView('tabela');
      },
      novoJogo(){
        let indexCasa = Math.floor(Math.random()*8),
            indexFora = Math.floor(Math.random()*8);

        this.novoJogo.casa.time = this.times[indexCasa];
        this.novoJogo.casa.gols = 0;
        this.novoJogo.fora.time = this.times[indexFora];
        this.novoJogo.fora.gols = 0;
        this.showView('novoJogo');
      },
      showView(view){
        this.view = view;
      },
      sortBy(coluna){
        this.order.keys = coluna;
        this.order.sort = this.order.sort == 'desc' ? 'asc': 'desc';//operação de verificação mesmo
      }
    },
    computed: {
    timesFiltered(){
      let colecao = _.orderBy(this.times, this.order.keys, this.order.sort);

      return _.filter(colecao , item => {
        return item.nome.indexOf(this.filter) >= 0;
      })
    }
  },
    filters:{
      saldo(time){
        return time.GP - time.GC;
      },
      ucwords(value){
        return value.charAt(0).toUpperCase() + value.slice(1)//pega a primeira letra e deixa em maiúscula, depois concatena
      }
    }
});
