import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { AuthenticationService } from '../../../shared/user/authentication.service';

@IonicPage()
@Component({
  selector: 'create',
  templateUrl: 'create.html'
})
export class CreatePage {
  private user : FormGroup;
  constructor(
    public navCtrl: NavController,
    private AuthenticationService: AuthenticationService,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder) {
      this.user = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
  }

  createAccount() {
    this.AuthenticationService
      .createAccount(this.user.value.email, this.user.value.password)
      .catch(error => {
        this.presentToast(`Sorry, we couldn't create an account. ${error.message}`, 5000);
      });
  }


  private presentToast(message: string, duration: number) {
      let toast = this.toastCtrl.create({
          message,
          duration
      });
      toast.present();
  }
}
