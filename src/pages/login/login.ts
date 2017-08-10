import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DbProvider } from '../../providers/db/db';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private username : String;
  private password : String;

  private failed : Boolean = false ;

  constructor(public navCtrl: NavController, private http : Http, private dbo : DbProvider,
              private loadingCtrl : LoadingController,
              public navParams: NavParams, private storage : NativeStorage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login(){
    let loading = this.loadingCtrl.create({
      content: 'Updating contacts, please wait..'
    });
    loading.present();

    let url = 'http://sreenathsdas.16mb.com/oagtv2/login.php?cpf=' + this.username + '&password=' + this.password;
    this.http.get(url).map(res => res.json()).subscribe(result => {
      if(result.status == "success"){
        this.failed = false;
        this.dbo.updateCheck(this.username).then((dbstatus)=>{
          loading.dismiss();
          if(dbstatus == "success"){
            let ackUrl = 'http://sreenathsdas.16mb.com/oagtv2/ack.php?cpf=' + this.username;
            this.http.get(ackUrl).map(res => res.json()).subscribe(result => {
              console.log(">> ACK " + result);
              this.storage.setItem('savedItem', { cpf : this.username })
              .then(
                () => { this.navCtrl.setRoot(HomePage) },
                error => console.error('Error storing item', error)
              );
            });

          }
          else if(dbstatus == "noUpdate") {
            alert("Error fetching data. Please contact admin!");
          }
        }, (error)=>{
          alert('Error in registration. Please reopen the App!');
        })
      }
      else{
        loading.dismiss();
        this.failed = true;
      }
    }, err => {
        loading.dismiss();
        alert("Internet Connection needed for Initial Login");
    });
  }

}
