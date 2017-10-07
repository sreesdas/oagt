import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  title : string;
  body  : string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.title = this.navParams.get("title");
  	this.body  = this.navParams.get("body");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

}
