import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, ToastController } from '@ionic/angular';

import { AuthenticationService } from '../../../shared/user/authentication.service';

@IonicPage()
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private login : FormGroup;
  constructor(
    public navCtrl: NavController,
    private AuthenticationService: AuthenticationService,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder) {
      this.login = this.formBuilder.group({
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        password: ['', [
          Validators.required,
          Validators.minLength(8)
        ]],
      });
  }

  loginEmail() {
    console.log(this.login);
    this.AuthenticationService
      .loginEmail(this.login.value.email, this.login.value.password)
      .catch(error => {
        this.presentToast(`Sorry, we couldn't log you in. ${error.message}`, 5000);
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
