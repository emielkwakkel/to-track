import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, ToastController, ModalController } from '@ionic/angular';

import { AuthenticationService } from '../../../shared/user/authentication.service';
import { PolicyPrivacyPage } from '../../policy/privacy/privacy';
import { PolicyTOCPage } from '../../policy/toc/toc';

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class CreatePage {
  private user : FormGroup;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private AuthenticationService: AuthenticationService,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder) {
      // At least one uppercase English letter, (?=.*?[A-Z])
      // At least one lowercase English letter, (?=.*?[a-z])
      // At least one digit, (?=.*?[0-9])
      // At least one special character, (?=.*?[#?!@$%^&*-])
      // Minimum eight in length .{8,} (with the anchors)
      const passwordRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

      this.user = this.formBuilder.group({
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        password: ['', [
          Validators.required,
          Validators.pattern(passwordRegex)
        ]],
        terms: [false, [
          Validators.requiredTrue
        ]]
      });
  }

  public gotoPolicyPrivacy() {
    return this.modalCtrl
      .create(PolicyPrivacyPage)
      .present();
  }

  public gotoPolicyTOC() {
    return this.modalCtrl
      .create(PolicyTOCPage)
      .present();
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
