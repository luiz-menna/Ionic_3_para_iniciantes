import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FeedPageModule } from '../pages/feed/feed.module';
import { IntroPageModule } from '../pages/intro/intro.module';
//import { HttpModule } from '@angular/Http';
import { HttpClientModule } from '@angular/common/http';
import { MoviesProvider } from '../providers/movies/movies'; //importa modulo http para API
import { ConfiguracoesPageModule } from '../pages/configuracoes/configuracoes.module';
import { PerfilPageModule } from '../pages/perfil/perfil.module';
import { SobrePageModule } from '../pages/sobre/sobre.module';
import { FilmeDetalhesPageModule } from '../pages/filme-detalhes/filme-detalhes.module';


@NgModule({
  declarations: [ //declara as paginas que abrirão junto com a principal, o modulo não pode ser importado, todas precisam ser declaradas no .module da app ou da própria pagina, ver feed.module, precisa importar a classe
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [ //importa o .module das paginas que não abrirão junto com a princiapl, que não foram declaradas, ver feed.module, precisa importar a classe
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FeedPageModule, //importa o modulo da pagina para o modulo da aplicação, precisa importar o conteudo da pagina ".ts"
    IntroPageModule,
    //HttpModule, //importa modulo http para API não funciona, usar abaixo
    HttpClientModule, //importa modulo http para API, precisa importar a classe.
    ConfiguracoesPageModule,
    PerfilPageModule,
    SobrePageModule,
    FilmeDetalhesPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [ // todas as declaradas no .module da app devem estar no entryComponents
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [ //declara providers para dependencias a serem utilizadas em todas as paginas, declarados aqui não precisa ser declarado na .ts da pagina, ver feed.ts, precisa importar a classe
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //MoviesProvider,
    //MovieProvider,
  ]
})
export class AppModule {}
