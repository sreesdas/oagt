import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  title : string;
  content : string;
  buttonEnable : boolean;

  constructor(public navCtrl: NavController, public http : Http, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  sendFeedback(){
    console.log(this.title + " : " + this.content);

    let url = 'http://sreenathsdas.16mb.com/oagtv2/feedback.php?title=' + this.title + "&content=" + this.content + "&cpf=" + this.navParams.get('cpf');
    console.log(url);
    this.http.get(url).map(res => res.json()).subscribe( data => {
      console.log(data);
      alert('Thank you for your feedback');
      this.navCtrl.pop();
    })
  }
}
