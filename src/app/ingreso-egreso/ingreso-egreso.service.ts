import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { filter, map, subscribeOn } from 'rxjs/operators';

//Modelos
import { IngresoEgreso } from './ingreso-egreso.model';
import { User } from '../auth/user.model';

//Usuario Servicio
import { AuthService } from '../auth/auth.service';

//Ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
//Acciones
import { SetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  private ingresoEgresoListener_Subscription: Subscription = new Subscription();
  private ingresoEgresoItems_Subscription: Subscription = new Subscription();

  constructor(
    private afDB: AngularFirestore,
    public authS: AuthService,
    private store: Store<AppState>

  ) { }

  /**
   * crearIngresoEgreso
   */
  public crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {

    let user: User = this.authS.getUsuario();

    return this.afDB.doc(user.uid + '/ingreso-egresos').collection('items').add({ ...ingresoEgreso });
  }

  /**
   * borrarIngresoEgreso
   */
  public borrarIngresoEgreso(uid: string) {
    let user: User = this.authS.getUsuario();

    return this.afDB.doc(`${user.uid}/ingreso-egresos/items/${uid}`).delete();

  }

  /**
   * initIngresoEgresoListener
   */
  public initIngresoEgresoListener() {
    let user: User = this.authS.getUsuario();

    this.ingresoEgresoListener_Subscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(auth => {
        this.ingresoEgresoItems(auth.user.uid);
      })

  }

  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItems_Subscription = this.afDB
      .collection(uid + '/ingreso-egresos/items')
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            }
          })
        })
      )
      .subscribe((items: any) => {
        this.store.dispatch(new SetItemsAction(items));
      });

  }
  /**
   * caneclarSubscription
   */
  public caneclarSubscription() {
    this.ingresoEgresoItems_Subscription.unsubscribe();
    this.ingresoEgresoListener_Subscription.unsubscribe();
  }
}


