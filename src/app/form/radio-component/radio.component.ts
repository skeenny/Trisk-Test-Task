import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio.component.html',
  styleUrl: '../form-component/form.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioComponent,
      multi: true,
    },
  ],
})
export class RadioComponent implements OnChanges {
  @Input() control!: FormControl<string | null>;
  @Input() latestValue!: string;
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
