import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable() //njeção de dependencia, deve ser usada dentro de outra classe, deve ser injetada em outra dentro da @components({})
export class MoviesProvider {
  private key = "d5351b5157ec75bf3e3047acc36ded6b";

  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
  }

  getLatestMovies(page = 1){ //declara uma variavel com valor padrão 
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${this.key}`); //metodo que faz requisição http, entre crase faz a concatenação de string com variavel
  }

  getMovieDetails(filmeId){
    return this.http.get(`https://api.themoviedb.org/3/movie/${filmeId}?api_key=${this.key}`); //metodo que faz requisição http
  }
}
