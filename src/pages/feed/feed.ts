import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoviesProvider } from '../../providers/movies/movies';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ 
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [MoviesProvider]//declara providers para dependencia a ser utilizada nesta pagina, declarados aqui não precisa ser declarado na .module da app, ver app.module, precisa importar a classe
})
export class FeedPage { // classe que determina o escopo da pagina

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private moviesProvider: MoviesProvider, //estancia o provider injetado
    public loadingCtrl: LoadingController, //estancia a menssagem de loading
    ) {
  }

  public nomeUsuario:string = "Charles frança"; //declaração de variavel, não exige o tipo, tipo any aceita qualquer tipo, sem public sera public
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public listaFilmes = new Array<any>(); //declara objeto de qualquer tipo "any"
  public page = 1;
  public infiniteScroll;

  public somaDoisNumeros(num1:number, num2:number): void{ //declaração de função, o tipo não precisa ser declarado, se declarado precisa retronar algo, se vois não pode retornar.
    alert(num1+num2);
  }

  public contaLikes(num1:number, num2:number): number{ //declaração de função, o tipo não precisa ser declarado, se declarado precisa retronar algo, se vois não pode retornar.
    return num1+num2;
  }

  public objeto_feed = {
    titulo: 'charles',
    data: 'novembro 5, 1995',
    descricao: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore',
    qntd_likes: 12,
    qntd_comments: 4,
    time_comments: "11h ago"
  }

  abreLoading() { //função que exibe a menssagem de loading
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes...",
    });
    this.loader.present(); //exibe a menssagem de loading
  }

  fechaLoading() { //função que fecha a menssagem de loading
    this.loader.dismiss() //fecha a menssagem de loading
  }

  /*doRefresh(refresher) { //função que faz o refresh quando arrasta pra baixo
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }*/

  doRefresh(refresher) { //função que faz o refresh quando volta pro inicio da pagina, arrasta para baixo
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  abrirDetalhes(filme){
    //console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, {id: filme.id}); //função que abre outra pagina passando o objeto pra ela
  }

  doInfinite(infiniteScroll) {//função de evento ao chegar no fim da pagina 
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  carregarFilmes(newPage: boolean = false){
    //this.somaDoisNumeros(10,2);
    this.abreLoading();
    this.moviesProvider.getLatestMovies(this.page).subscribe( //metodos que espera resposta de API, subscribe() força aguardar retorno
      data=>{
        const response = (data as any) //cast, transforma em outro tipo "any"
        //const objeto_retorno = JSON.parse(response._body) //trasnforma tesxto em JSON
        //console.log(response);
        //console.log(data);
        
        if(newPage){// carega mais paginas ao chegar no fim, evita repetir no doRefresh() 
          this.listaFilmes = this.listaFilmes.concat(response.results);
          this.infiniteScroll.complete();// fecha o sinal de carregando do infinitScroll
        }else{
          this.listaFilmes = response.results;
        }

        console.log("LISTA FILMES "+this.page);console.log(this.listaFilmes);

        this.fechaLoading();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, // declara função de forma reduzida parametro=>{escopo da função}
      error=>{
        console.log(error);
        this.fechaLoading();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
    //console.log('ionViewDidLoad FeedPage');
  }

  //ionViewDidLoad() { //ciclo de vida da pagina, carrega quando entra a primeira vez
  ionViewDidEnter() { //cliclo de vida da pagina, carrega sempre que entrar
    this.carregarFilmes();
  }

}
