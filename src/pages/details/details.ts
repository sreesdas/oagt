import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { AlertController, ToastController } from 'ionic-angular';

import { DbProvider } from '../../providers/db/db';
import { CallNumber } from '@ionic-native/call-number';
import { DomSanitizer } from '@angular/platform-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

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
              private alertCtrl : AlertController, private toastCtrl : ToastController,
               public dbo : DbProvider, public navParams: NavParams, private contacts: Contacts) {

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
      this.emp.starred =  1;
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
	
  saveContact() {
	  
    let alert = this.alertCtrl.create({
    title: 'Save Contact',
    message: 'Do you want to save this contact to your phone?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: () => {
          this.saveThisContact();
        }
      }
    ]
  });
  alert.present();

  }

  saveThisContact() {
    let contact: Contact = this.contacts.create();

    contact.name = new ContactName(null, this.emp.name, '');
    contact.phoneNumbers = [new ContactField('mobile', this.emp.mobile)];
    contact.save().then(
      () => { this.showToast();
            },
      (error: any) => console.error('Error saving contact.', error)
    );
  }

  showToast(){
    
    let toast = this.toastCtrl.create({
      message: 'Contact saved successfully',
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
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
    console.log("calling " + number);
    this.caller.callNumber(number, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));


  }

}
