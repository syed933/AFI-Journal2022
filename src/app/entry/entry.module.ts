import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EntryPageRoutingModule } from './entry-routing.module';
import { EntryPage } from './entry.page';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryPageRoutingModule,
    QuillModule
  ],
  declarations: [EntryPage]
})
export class EntryPageModule {}
