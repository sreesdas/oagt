import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  cpf : string;
  constructor(public navCtrl: NavController,public viewCtrl: ViewController,
              public storage: NativeStorage , public navParams: NavParams) {
    this.storage.getItem('savedItem')
      .then(
        (data) => {
                  console.log("Logged In with " + data.cpf);
                  this.cpf = data.cpf;
                  }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  goto(pageName){
    console.log(">>" + this.navParams.get('cpf'));
    this.navCtrl.push(pageName, { cpf : this.cpf });

  }
}
