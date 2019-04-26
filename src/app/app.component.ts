import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
//Loading
import { NgxSpinnerService } from 'ngx-spinner';
//Rxjs
import { Subscription } from 'rxjs';
//Ngrx
import { AppState } from './app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  //Subscripcion
  public ui_subscription: Subscription

  constructor(
    public authService: AuthService,
    public store: Store<AppState>,
    private spinner: NgxSpinnerService

  ) { }


  ngOnInit() {
    this.authService.initAuthListener();

    this.ui_subscription = this.store.select('ui').subscribe(ui => {
      if (ui.isLoading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.ui_subscription.unsubscribe();
  }

}
