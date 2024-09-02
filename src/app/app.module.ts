import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormModule } from './form-module/form.module';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormModule, AppRoutingModule],
  providers: [provideHttpClient(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
