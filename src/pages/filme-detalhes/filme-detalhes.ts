import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoviesProvider } from '../../providers/movies/movies';

/**
 * Generated class for the FilmeDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
  providers: [MoviesProvider]
})
export class FilmeDetalhesPage {
  
  public filme;
  public filmeId;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public movieProvider: MoviesProvider
    ) {
  }

  ionViewDidEnter() {
    this.filmeId = this.navParams.get("id"); //função que retorna o objeto passado pelo navCrtl
    //console.log(this.filmeId);
    this.movieProvider.getMovieDetails(this.filmeId).subscribe(
      data=>{
        this.filme = (data as any);
        console.log(this.filme);
      },
      error=>{
        console.log(error);
      }
    )
    /*
    this.movieProvider.getMovieDetails(this.filmeId).subscribe(
      data=>{
        let retorno = (data as any);
        this.filme = JSON.parse(retorno);
      },
      error=>{
        console.log(error);
      }
    )*/
    

  }

}
