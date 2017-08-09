import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {

  public items;
  public itemtype;
  public buttonName = 'Refresh';
  public errormsg ='';
  private cpf;

  constructor(public navCtrl: NavController, private http : Http, public navParams: NavParams) {
  	this.cpf = navParams.get('cpf');
  }

  ionViewDidLoad() {
    this.httpFetch('all');
  }

  getGroupMembers(selected : any){
  	this.httpFetch(selected);
  }

  goToDetails(selected) {
  	this.navCtrl.push('DetailsPage', { item : selected } );
  }

  httpFetch(getParam : String){
  	let url = "http://sreenathsdas.16mb.com/oagtv2/groups.php?g=" + getParam + "&cpf=" + this.cpf;
  	console.log(url);
    this.http.get(url).map(res => res.json()).subscribe(result => {
    	console.log(result);
    	this.items = result.data;
    	this.itemtype = result.type;
    }, err => {
    	this.errormsg = 'Internet connection needed for this feature';
    	alert('Internet connection needed for this feature');
    });
  }
  
  

}
