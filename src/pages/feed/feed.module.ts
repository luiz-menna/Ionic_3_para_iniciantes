import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedPage } from './feed';

@NgModule({
  declarations: [ //declara a pagina que não foi declarada na .module da app e sera aberta com esta, precisa ser importada na .module da app
    FeedPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedPage),
  ],
})
export class FeedPageModule {}
