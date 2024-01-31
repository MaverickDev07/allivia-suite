import { NgModule } from '@angular/core';
//primeNg
import {MenuModule} from 'primeng/menu';
import {ToolbarModule} from 'primeng/toolbar';
import {AvatarModule} from 'primeng/avatar';

import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';

import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {MenubarModule} from 'primeng/menubar';
import {CardModule} from 'primeng/card';

import {PanelModule} from 'primeng/panel';
import {SplitterModule} from 'primeng/splitter';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ImageModule} from 'primeng/image';
import {ListboxModule} from 'primeng/listbox';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    MenuModule,
    ToolbarModule,
    AvatarModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    CalendarModule,
    InputTextModule,
    FileUploadModule,
    MenubarModule,
    CardModule,
    DropdownModule,
    PanelModule,
    SplitterModule,
    ConfirmPopupModule,
    DynamicDialogModule,
    ImageModule,
    ListboxModule,
    ProgressSpinnerModule
  ]
})
export class PrimeNgModule { }
