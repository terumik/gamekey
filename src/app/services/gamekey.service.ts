import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { GameKey } from '../models/Gamekey.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamekeyService {

  constructor(
    public firestore: AngularFirestore
  ) { }

  loadGameKeys$(): Observable<GameKey[]> {

    const collection = this.firestore.collection('gamekeys', ref => ref.orderBy('timestamp', 'desc'));
    return collection.snapshotChanges()
      .pipe(
        map(snaps => snaps.map<GameKey>((snap: any) => {
          return { id: snap.payload.doc.id, ...snap.payload.doc.data() };
        })),
      );
  }

  saveGameKey$(obj: GameKey): Observable<DocumentReference> {
    return from(this.firestore.collection('gamekeys').add({ ...obj }));
  }

  updateGameKey$(newObj: GameKey) {
    return from(this.firestore.collection('gamekeys').doc(`/${newObj.id}`).update({...newObj}));
  }

  deleteGameKey$(id: string) {
    return from(this.firestore.collection('gamekeys').doc(`/${id}`).delete());
  }

}
