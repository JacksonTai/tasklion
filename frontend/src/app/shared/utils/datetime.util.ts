export class DateTimeUtil {

  // Convert time string like "10:00 PM" to a Date object
  static toDateTime(time: string): Date {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    const date: Date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  static addDays(time: Date, value: number): Date {
    return new Date(time.getTime() + value * 24 * 60 * 60 * 1000);
  }

  static addHour(time: Date, value: number): Date {
    return new Date(time.getTime() + value * 60 * 60 * 1000);
  }

  static subtractHour(time: Date, value: number): Date {
    return new Date(time.getTime() - value * 60 * 60 * 1000);
  }

  static addMinutes(time: Date, value: number): Date {
    return new Date(time.getTime() + value * 60 * 1000);
  }

  static getHourDuration(startTimeStr: string, endTimeStr: string): number {
    // Parse the time strings into Date objects
    const [startHours, startMinutes, startSeconds] = startTimeStr.split(':').map(Number);
    const [endHours, endMinutes, endSeconds] = endTimeStr.split(':').map(Number);

    const startTime = new Date();
    startTime.setHours(startHours, startMinutes, startSeconds, 0);

    const endTime = new Date();
    endTime.setHours(endHours, endMinutes, endSeconds, 0);

    // If endTime is before startTime, add 24 hours to endTime
    if (endTime < startTime) {
      endTime.setDate(endTime.getDate() + 1);
    }

    // Calculate the difference in milliseconds
    const differenceInMillis = endTime.getTime() - startTime.getTime();

    // Convert milliseconds to hours
    return differenceInMillis / (1000 * 60 * 60);
  }

  // Convert a Date object to a time string like "10:00 PM"
  static toTimeString(time: Date): string {
    let hours: number = time.getHours();
    const minutes: string = String(time.getMinutes()).padStart(2, '0');

    let modifier: string = 'AM';
    if (hours >= 12) {
      modifier = 'PM';
      if (hours > 12) {
        hours -= 12;
      }
    }
    if (hours === 0) {
      hours = 12;
    }
    return `${String(hours).padStart(2, '0')}:${minutes} ${modifier}`;
  }

  static roundMinutes(date: Date, gap: number): Date {
    const minutes: number = date.getMinutes();
    const roundedMinutes: number = Math.ceil(minutes / gap) * gap;
    date.setMinutes(roundedMinutes, 0, 0);
    return date;
  }

  static to24HourFormat(time12h: string): string {
    const [timePart, modifier] = time12h.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  static to12HourFormat(time24h: string): string {
    let [hours, minutes] = time24h.split(':').map(Number);
    const modifier: string = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${modifier}`;
  }

}
