import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { PwaLauncherComponent } from './components/pwa-launcher';
import { AppsApi } from './services/appsapi';
import { AddAppComponent } from './components/addapp';
import { AppService } from './services/app.service';
import { EditDialogComponent } from './components/editdialog';
import { CloudComponent } from './components/cloud';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipComponent } from './components/tooltip/tooltip';
import { TooltipDirective } from './components/tooltip/tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    PwaLauncherComponent,
    AddAppComponent,
    EditDialogComponent,
    CloudComponent,
    TooltipComponent,
    TooltipDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    // Material
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDividerModule,
    MatTableModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTabsModule,
    FontAwesomeModule
  ],
  providers: [
    AppService,
    AppsApi
  ],
  bootstrap: [AppComponent],
  entryComponents: [ TooltipComponent ]
})
export class AppModule { }
