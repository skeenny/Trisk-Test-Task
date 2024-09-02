import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormComponent } from './form-component/form.component';
import { CheckboxComponent } from './checkbox-component/checkbox.component';
import { RadioComponent } from './radio-component/radio.component';
import { TextComponent } from './text-component/text.component';
import { FormService } from '../services/form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRoutingModule } from './form-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    CheckboxComponent,
    RadioComponent,
    TextComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormRoutingModule,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
  ],
  providers: [FormService],
})
export class FormModule {}
