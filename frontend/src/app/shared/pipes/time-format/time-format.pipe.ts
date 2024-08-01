import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    let [hours, minutes] = value.split(':');
    let suffix = +hours >= 12 ? 'PM' : 'AM';
    let hours12 = (+hours % 12) || 12; // Convert 0 to 12 for 12 AM/PM

    return `${this.pad(hours12)}:${this.pad(minutes)} ${suffix}`;
  }

  private pad(value: number | string): string {
    return value.toString().padStart(2, '0');
  }
}
