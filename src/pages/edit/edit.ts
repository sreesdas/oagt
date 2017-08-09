import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  contact : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http : Http) {
  	this.contact = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  confirmEdit(){
    let url = "http://sreenathsdas.16mb.com/oagtv2/request.php?cpf=" + this.contact.cpf + "&mobile=" + this.contact.mobile +
      "&epabx_office=" + this.contact.epabx_office + "&epabx_home=" + this.contact.epabx_home;
    this.http.get(url).map(res => res.json()).subscribe( data => {
      console.log(data);
    });

  }

}
