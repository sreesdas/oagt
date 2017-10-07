import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PopoverPage } from '../pages/popover/popover';
import { NotificationPage } from '../pages/notification/notification';

import { SQLite } from '@ionic-native/sqlite';
import { DbProvider } from '../providers/db/db';

import { HttpModule } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { FirstLetterPipe } from '../pipes/first-letter/first-letter';
import { CallNumber } from '@ionic-native/call-number';
import { Contacts } from '@ionic-native/contacts';
import { OneSignal } from '@ionic-native/onesignal';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PopoverPage,
    NotificationPage,
    FirstLetterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PopoverPage,
    NotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    DbProvider,
    NativeStorage,
    CallNumber,
    Contacts,
    OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
