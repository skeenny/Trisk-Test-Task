import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox.component.html',
  styleUrl: '../form-component/form.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxComponent,
      multi: true,
    },
  ],
})
export class CheckboxComponent implements OnChanges {
  @Input() control!: FormControl<boolean | null>;
  @Input() latestValue!: boolean;
  showLatestValue = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges({ latestValue }: SimpleChanges): void {
    if (
      !latestValue.firstChange &&
      latestValue.currentValue !== latestValue.previousValue
    ) {
      this.showLatestValue = true;
      setTimeout(() => {
        this.showLatestValue = false;
        this.cdr.detectChanges();
      }, 3000);
    }
  }
}
