import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { MY_LOCATION_NAME, MY_TIMEZONE } from './config';

/**
 * Updates the current time displays for both Matthew's timezone and the visitor's timezone
 */
export function updateCurrentTimes(): void {
  const now = new Date();

  // Get visitor's timezone
  const visitorTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Update my location and time
  const myLocationEl = document.getElementById('my-location');
  const myTimeEl = document.getElementById('my-time');

  if (myLocationEl && myTimeEl) {
    myLocationEl.textContent = `${MY_LOCATION_NAME} (${MY_TIMEZONE})`;
    myTimeEl.textContent = formatInTimeZone(now, MY_TIMEZONE, 'EEEE, MMMM d, yyyy h:mm:ss a zzz');
  }

  // Update visitor's location and time
  const yourLocationEl = document.getElementById('your-location');
  const yourTimeEl = document.getElementById('your-time');

  if (yourLocationEl && yourTimeEl) {
    yourLocationEl.textContent = visitorTimezone;
    yourTimeEl.textContent = format(now, 'EEEE, MMMM d, yyyy h:mm:ss a zzz');
  }
}

/**
 * Starts updating the current time displays every second
 */
export function startTimeUpdates(): void {
  updateCurrentTimes();
  setInterval(updateCurrentTimes, 1000);
}
