import { Component, ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AngularFireAuth} from "angularfire2/auth";
import { LoginPage } from '../pages/login/login';
//import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = LoginPage;

  constructor(
    public platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public auth: AngularFireAuth
    )
  {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    //Check if user is authenticated
    /* authState is a property that returns an observable.
     We'll subscribe to it so we are notified whenever the authState has changed.
     */

    const authObserver = auth.authState.subscribe((authState)=>{
      if (authState){
        console.log('Logged in user from app.component:', authState);




        this.nav.setRoot(TabsPage); //pass authState to homepage & nav there
        //authObserver.unsubscribe();
      }else{

        this.nav.setRoot(LoginPage);
        //authObserver.unsubscribe();
      }
    });

  }
}
