import { NgModule } from '@angular/core';
import { CreatePage } from './create';
import { IonicPageModule } from '@ionic/angular';

@NgModule({
  declarations: [CreatePage],
  imports: [RouterModule.forChild(CreatePage)],
  entryComponents: [CreatePage]
})
export class CreatePageModule {}
