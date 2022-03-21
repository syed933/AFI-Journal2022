import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from './models/entry';
import { Observable } from 'rxjs';
import { ulid } from 'ulid';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // Start with empty list, give it type of Entryp[] for our own sanity
  public appPages: Entry[] = [
    // { title: 'note 1', url: '/folder/120542j0128d', icon: 'mail' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  entries$: Observable<Entry[]>;
  // Firestore is injected using Angula's dependency injection
  constructor(private firestore: AngularFirestore, private router: Router) {
    const entriesCollection = firestore.collection<Entry>('journal_entries');

    this.entries$ = entriesCollection.valueChanges();
  }

  createNewEntry() {
    this.router.navigate(['/']);
  }

}
