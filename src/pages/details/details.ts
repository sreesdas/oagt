import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { CallNumber } from '@ionic-native/call-number';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  private emp : any;
  public starTheme : String;
  private themes = ["green","pink","purple","teal","cyan","lime","grey","red","darkblue","orange","amber"]

  constructor(public navCtrl: NavController, public caller : CallNumber, private sanitizer:DomSanitizer,
               public dbo : DbProvider, public navParams: NavParams) {

    this.emp = navParams.get("item");
    console.log(this.emp.cpf);
    this.dbo.readDetails(this.emp.cpf).then((result)=>{
      this.emp = result[0];
      this.emp.letter = this.emp.name.charAt(0);
      this.emp.theme = this.themes[this.emp.cpf % 10];
      this.emp.firstname = this.emp.name.split(" ")[0];
      this.starTheme = this.emp.starred == 1 ? 'amber' : 'light';

    },(error)=>{
      console.log("Error while accessing details");
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  sanitize(url:string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  setStar() {
    
    if(this.emp.starred == 0){
      this.dbo.setStar(1,this.emp.cpf);  
      this.starTheme = 'amber';
      this.emp.starred = 1;
    }
    else{
      this.dbo.setStar(0,this.emp.cpf); 
      this.starTheme = 'light'; 
      this.emp.starred = 0;
    }
    
  }

  editDetails(){
    this.navCtrl.push('EditPage', {item : this.emp});
  }

  call(number){

    let len = number.length;
    if(len == 4){
      number = '0381236' + number;
    }
    else if(len == 7){
      number = '0381' + number;
    }
    else if(len == 10){
      number = '0' + number;
    }
    console.log(number);
    this.caller.callNumber(number, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  
    
  }

}
