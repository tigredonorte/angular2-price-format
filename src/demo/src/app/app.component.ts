import { Component } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  value = '';
  form = this.fb.group({
    'price': this.fb.control({ value: '' }, [])
  });
  options = {
    minValue: '',
    maxValue: '',
    prefix: 'R$ ',
    suffix: '',
    centsSeparator: '.',
    thousandsSeparator: ',',
    limit: false,
    centsLimit: 2,
    clearPrefix: true,
    clearSuffix: true,
    allowNegative: false,
    insertPlusSign: false,
    cssclass: '',
    placeholder: ''
  };

  constructor(protected fb: FormBuilder) {
    this.form.get('price').valueChanges.subscribe(data => {
      this.value = data;
    });
  }
}
