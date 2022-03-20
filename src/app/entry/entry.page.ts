import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Entry } from '../models/entry';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
})
export class EntryPage implements OnInit {

  entry$: Observable<Entry> = new Observable();

  entry: Entry = { id: '', title: '', updated_at: new Date(), created_at: new Date(), body: '' };

  // Firestore is injected using Angula's dependency injection
  constructor(firestore: AngularFirestore, private activatedRoute: ActivatedRoute) {
    const entryId = this.activatedRoute.snapshot.paramMap.get('entryId');
    const entriesCollection = firestore.collection<Entry>('journal_entries', ref => ref.where('id', '==', entryId). limit(1));

    this.entry$ = entriesCollection.valueChanges().pipe(map(arrOfEntries => arrOfEntries[0]));

    this.entry$.subscribe(entry => {
      this.entry = entry;
    });
  }

  ngOnInit() {
  }

}
