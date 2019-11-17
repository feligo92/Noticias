import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule} from '@angular/common/http';
import { DataService } from './services/data.service';
import { RouterModule, Routes } from '@angular/router';
import { ArticuloComponent } from './articulo/articulo.component';

const routerConfig: Routes = [
  { "path": "", "component": HomeComponent},
  {"path": "home", "component": HomeComponent},
  { "path": "articulo/:index", "component": ArticuloComponent },
  { "path": "**", "component": HomeComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticuloComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routerConfig, { useHash: true })
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
