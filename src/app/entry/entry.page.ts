import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Entry } from '../models/entry';
import { ActivatedRoute, Router } from '@angular/router';
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

  isEditMode = false;

  // Firestore is injected using Angula's dependency injection
  constructor(private firestore: AngularFirestore, private activatedRoute: ActivatedRoute, private router: Router) {
    const entryId = this.activatedRoute.snapshot.paramMap.get('entryId');

    // Bail early if there is no entry in route
    if (!entryId) return;

    // const entriesCollection = firestore.collection<Entry>('journal_entries', ref => ref.where('id', '==', entryId). limit(1));
    this.entry$ = this.firestore.doc<Entry>(`journal_entries/${entryId}`).valueChanges();

    this.entry$.subscribe(entry => {
      this.entry = entry;
    });
  }

  ngOnInit() {
  }

  onEditClick() {
    this.isEditMode = true;
  }


  onDeleteClick() {
    console.log('Delete');
    this.firestore.doc(`journal_entries/${this.entry.id}`).delete();

    // How to send browser to another locaiton
    this.router.navigate([''])
  }

  onSaveClick() {
    this.firestore.doc<Entry>(`journal_entries/${this.entry.id}`).update(this.entry);
    this.router.navigate(['/']);
  }
}
