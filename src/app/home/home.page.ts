import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Entry } from '../models/entry';
import { ulid } from 'ulid';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public newEntryTitle = '';
  public newEntryContent = '';

  constructor(private firestore: AngularFirestore) {
  }

  ngOnInit() {
  }

  async saveNewEntry() {
    const id = ulid();

    const newEntry: Entry = {
      id,
      title: this.newEntryTitle,
      body: this.newEntryContent,
      created_at: new Date(),
      updated_at: new Date()
    };

    this.firestore.collection<Entry>('journal_entries').doc(id).set(newEntry);
  }
}
