import { Component, OnInit, OnDestroy } from '@angular/core';
//Ngrx Store y reducer
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
//Modelo del usuario
import { User } from '../../auth/user.model';
//Rxjs
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  public usuario: User = null;

  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
      .pipe(
        filter(auth => {
          return auth.user != null;
        })

      ).subscribe(auth => {
        this.usuario = auth.user;
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
