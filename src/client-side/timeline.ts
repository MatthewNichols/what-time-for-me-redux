import { TZDate } from '@date-fns/tz';
import { addHours, startOfHour, format } from 'date-fns';
import { MY_LOCATION_NAME, MY_TIMEZONE, AVAILABLE_START_HOUR, AVAILABLE_END_HOUR } from './config';

interface TimeBlock {
  hour: number;
  utcTime: TZDate;
  isAvailable: boolean;
}

/**
 * Converts available hours from MY_TIMEZONE to UTC hours
 */
function getAvailableHourUTC(startOrEndHour: any): number {
  const startOrEndHourCleaned = parseInt(startOrEndHour);
  const nowInTZ = new TZDate(Date.now(), MY_TIMEZONE);
  nowInTZ.setHours(startOrEndHourCleaned, 0, 0, 0);
  
  // Convert that time to UTC
  const utcDate = new TZDate(nowInTZ.toString(), 'UTC');
  return utcDate.getHours();
}

// Precalculate available hours in UTC as working in UTC whenever possible
// avoids repeated timezone conversions during timeline generation and I find 
// easier to reason about.
const AVAILABLE_START_HOUR_UTC = getAvailableHourUTC(AVAILABLE_START_HOUR);
const AVAILABLE_END_HOUR_UTC = getAvailableHourUTC(AVAILABLE_END_HOUR);
console.log(`Available hours in UTC: ${AVAILABLE_START_HOUR_UTC} - ${AVAILABLE_END_HOUR_UTC}`);

/**
 * Checks if a given time is within the available calling hours in MY_TIMEZONE,
 * by checking compared to precalculated UTC hours.
 */
function isTimeAvailable(time: TZDate): boolean {
  const hourInUTC = time.withTimeZone('UTC').getHours();
  if (AVAILABLE_START_HOUR_UTC < AVAILABLE_END_HOUR_UTC) {
    // Normal case, e.g., 9 to 17
    return hourInUTC >= AVAILABLE_START_HOUR_UTC && hourInUTC < AVAILABLE_END_HOUR_UTC;
  } else {
    // Overnight case, e.g., 22 to 6
    return hourInUTC >= AVAILABLE_START_HOUR_UTC || hourInUTC < AVAILABLE_END_HOUR_UTC;
  }
}

/**
 * Generates 24 hours of time blocks in UTC starting from the current hour
 * that will be used to render all timelines in different timezones.
 */
function generateTimeBlocks(): TimeBlock[] {
  const nowInTimezone = (new TZDate());
  const blocks: TimeBlock[] = [];
  const startHour = startOfHour(nowInTimezone);
  
  console.log(`Start hour`, startHour.toString());  
  for (let i = 0; i < 24; i++) {
    const utcTime = addHours(startHour, i);
    const hour = utcTime.getHours();

    // Full hour block
    // Check availability based on what hour it is in MY_TIMEZONE, not the display timezone
    blocks.push({
      utcTime,
      hour,
      isAvailable: isTimeAvailable(utcTime),
    });
  }

  return blocks;
}

/**
 * Renders a timeline into the specified container
 */
function renderTimeline(containerId: string, blocks: TimeBlock[], timezone: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  blocks.forEach(block => {
    const displayTime = format(block.utcTime.withTimeZone(timezone), 'HH:mm');
    // Full hour block
    const hourBlock = document.createElement('div');
    hourBlock.className = `timeline-hour ${block.isAvailable ? 'available' : 'unavailable'}`;
    hourBlock.setAttribute('data-time', displayTime);

    const timeLabel = document.createElement('span');
    timeLabel.className = 'time-label';
    timeLabel.textContent = displayTime;

    hourBlock.appendChild(timeLabel);
    container.appendChild(hourBlock);
  });
}

/**
 * Initializes and renders both timelines
 */
export function renderTimelines(): void {
  const now = new Date();
  const visitorTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Update headers
  const myHeader = document.getElementById('my-timeline-header');
  const yourHeader = document.getElementById('your-timeline-header');

  if (myHeader) {
    myHeader.textContent = `My Time (${MY_LOCATION_NAME})`;
  }
  if (yourHeader) {
    yourHeader.textContent = `Your Time (${visitorTimezone})`;
  }

  const timeBlocks = generateTimeBlocks();
  renderTimeline('my-timeline', timeBlocks, MY_TIMEZONE);
  renderTimeline('your-timeline', timeBlocks, visitorTimezone);
}

/**
 * Updates timelines periodically (every minute)
 */
export function startTimelineUpdates(): void {
  renderTimelines();
  // Update every minute to keep timelines current
  setInterval(renderTimelines, 60000);
}
