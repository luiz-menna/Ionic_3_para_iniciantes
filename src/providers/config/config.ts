import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false,
    name: "",
    userName: ""
    
  }

  constructor() {
  
    

  }

  // recupera os dados do localstorage
  getConfigData(): any {

    return localStorage.getItem("config"); // localStorage.getItem(nome) - função que retorna do localstorage (nome)

  }

  // grava os dados do localstorage
  setConfigData(showSlide?: boolean, name?: string, userName?: string) { // ? defini como opicional, não obrigatório
    let config = { //defini um objeto
      showSlide: false,
      name: "",
      userName: ""
    };

    if (showSlide){
      config.showSlide = showSlide;
    }

    if (name){
      config.name = name;
    }

    if (userName){
      config.userName = userName;
    }

    localStorage.setItem("config", JSON.stringify(config)); //localStorage.setItem - função que grava no localstorage (nome,dados), JSON.stringify() converte objeto em texto json

  }

}
