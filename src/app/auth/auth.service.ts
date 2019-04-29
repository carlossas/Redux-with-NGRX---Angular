import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//Firebase
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
//Rxjs
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

//Plugin alertas
import Swal from 'sweetalert2';
//Modelos
import { User } from './user.model';
//Store de la app
import { Store } from '@ngrx/store';
//Reduces
import { AppState } from '../app.reducer';
//Acciones
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user_subscription: Subscription = new Subscription();
  private usuario: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>,
  ) { }


  public initAuthListener() {

    this.afAuth.authState.subscribe((user: firebase.User) => {

      console.log("FirebaseUser -->", user);

      if (user) {
        this.user_subscription = this.afDB.doc(user.uid + '/usuario').valueChanges().subscribe((usuario: User) => {

          const newUser = new User(usuario);
          this.store.dispatch(new SetUserAction(newUser));
          this.usuario = newUser;
          console.log("Usuario Doc -->", this.usuario);
        });
      } else {
        this.usuario = null;
        this.user_subscription.unsubscribe();
      }

    });

  }

  public getUsuario() {
    return ({ ...this.usuario });
  }


  public crearUsuario(nombre: string, email: string, password: string) {

    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {

        // console.log(resp);
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        };

        this.afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.store.dispatch(new DesactivarLoadingAction());
            this.router.navigate(['/']);

          });


      })
      .catch(error => {
        console.error(error);
        this.store.dispatch(new DesactivarLoadingAction());
        Swal('Error en el login', error.message, 'error');
      });


  }


  public login(email: string, password: string) {

    this.store.dispatch(new ActivarLoadingAction());


    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        // console.log(resp);
        this.store.dispatch(new DesactivarLoadingAction());
        this.router.navigate(['/']);

      })
      .catch(error => {
        console.error(error);
        this.store.dispatch(new DesactivarLoadingAction());

        Swal('Error en el login', error.message, 'error');
      });

  }

  public logout() {
    this.afAuth.auth.signOut();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 100);
  }


  public isAuth() {
    return this.afAuth.authState
      .pipe(
        map(fbUser => {

          if (fbUser == null) {
            this.router.navigate(['/login']);
          }

          return fbUser != null;
        })
      );
  }

}
