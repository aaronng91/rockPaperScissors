import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { AppService } from './app.service';
import { TwoPlayerComponent } from './two-player/two-player.component';
import { OnePlayerComponent } from './one-player/one-player.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    TwoPlayerComponent,
    OnePlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
