import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormService } from '../../services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { IFormData } from '../../models/form.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit, AfterViewInit, OnDestroy {
  formGroup = new FormGroup({
    text: new FormControl(''),
    radio: new FormControl('Option 1'),
    checkbox: new FormControl(false),
  });
  backendData!: IFormData;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private formService: FormService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cdr.detach();
    this.formService.getIFormData().subscribe((formData: IFormData) => {
      this.manuallyUpdateForm(formData);
    });
  }

  ngAfterViewInit(): void {
    this.listenFormChanges();
  }

  listenFormChanges(): void {
    this.formGroup.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        const data = this.formGroup.value as IFormData;
        this.updateForm(data);
      });
  }

  updateForm(data: IFormData): void {
    this.formService.updateIFormData(data).subscribe((formData: IFormData) => {
      this.manuallyUpdateForm(formData);
    });
  }

  manuallyUpdateForm(formData: IFormData): void {
    this.backendData = formData;
    this.formGroup.controls.checkbox.setValue(formData.checkbox, {
      onlySelf: true,
      emitEvent: false,
    });
    this.formGroup.controls.radio.setValue(formData.radio, {
      onlySelf: true,
      emitEvent: false,
    });
    this.formGroup.controls.text.setValue(formData.text, {
      onlySelf: true,
      emitEvent: false,
    });
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
