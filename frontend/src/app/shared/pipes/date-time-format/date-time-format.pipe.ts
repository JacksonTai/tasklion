import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {

  transform(value: string, timezone: string = 'UTC', timeFormat: '12-hour' | '24-hour' = '24-hour'): string {
    if (!value) return value;

    // Parse the input date string
    const date = new Date(value);

    // Convert the date to the specified timezone
    const timezoneOffset = new Date().getTimezoneOffset();
    const targetOffset = this.getTimezoneOffset(timezone);
    const utcTime = date.getTime() + (timezoneOffset * 60000);
    const localTime = new Date(utcTime + (targetOffset * 60000));

    // Format the date and time
    const day = ('0' + localTime.getDate()).slice(-2);
    const month = ('0' + (localTime.getMonth() + 1)).slice(-2);
    const year = localTime.getFullYear();
    const hours = timeFormat === '12-hour' ? this.format12Hour(localTime.getHours()) : this.format24Hour(localTime.getHours());
    const minutes = ('0' + localTime.getMinutes()).slice(-2);
    const seconds = ('0' + localTime.getSeconds()).slice(-2);
    const ampm = timeFormat === '12-hour' ? this.getAmpm(localTime.getHours()) : '';

    return `${hours}:${minutes}:${seconds} ${ampm}, ${day}-${month}-${year}`.trim();
  }

  private getTimezoneOffset(timezone: string): number {
    // This should be replaced with a more sophisticated timezone conversion logic or library if needed
    // Example offset for demonstration purposes, adjust as needed
    const timezoneOffsets: { [key: string]: number } = {
      'UTC': 0,
      'Asia/Kuala_Lumpur': 480, // Malaysia (UTC+8)
    };
    return timezoneOffsets[timezone] || 0;
  }

  private format12Hour(hours: number): string {
    const h = hours % 12 || 12; // Convert 24-hour to 12-hour format
    return ('0' + h).slice(-2);
  }

  private format24Hour(hours: number): string {
    return ('0' + hours).slice(-2);
  }

  private getAmpm(hours: number): string {
    return hours >= 12 ? 'PM' : 'AM';
  }

}
