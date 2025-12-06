import { addHours, startOfHour } from 'date-fns';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { MY_LOCATION_NAME, MY_TIMEZONE, AVAILABLE_START_HOUR, AVAILABLE_END_HOUR } from './config';

interface TimeBlock {
  hour: number;
  displayTime: string;
  isAvailable: boolean;
  isHalfHour?: boolean;
}

/**
 * Checks if a given time is within the available calling hours in MY_TIMEZONE
 */
function isTimeAvailable(time: Date): boolean {
  const hourInMyTimezone = parseInt(formatInTimeZone(time, MY_TIMEZONE, 'H'));
  return hourInMyTimezone >= AVAILABLE_START_HOUR && hourInMyTimezone < AVAILABLE_END_HOUR;
}

/**
 * Generates 24 hours of time blocks starting from the current hour
 */
function generateTimeBlocks(timezone: string, now: Date): TimeBlock[] {
  const blocks: TimeBlock[] = [];
  const startHour = startOfHour(toZonedTime(now, timezone));

  for (let i = 0; i < 24; i++) {
    const time = addHours(startHour, i);
    const hour = parseInt(formatInTimeZone(time, timezone, 'H'));

    // Full hour block
    // Check availability based on what hour it is in MY_TIMEZONE, not the display timezone
    blocks.push({
      hour,
      displayTime: formatInTimeZone(time, timezone, 'HH:mm'),
      isAvailable: isTimeAvailable(time),
      isHalfHour: false
    });
  }

  return blocks;
}

/**
 * Renders a timeline into the specified container
 */
function renderTimeline(containerId: string, blocks: TimeBlock[]): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  blocks.forEach(block => {
    // Full hour block
    const hourBlock = document.createElement('div');
    hourBlock.className = `timeline-hour ${block.isAvailable ? 'available' : 'unavailable'}`;
    hourBlock.setAttribute('data-time', block.displayTime);

    const timeLabel = document.createElement('span');
    timeLabel.className = 'time-label';
    timeLabel.textContent = block.displayTime;

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

  // Generate and render timelines
  const myBlocks = generateTimeBlocks(MY_TIMEZONE, now);
  const yourBlocks = generateTimeBlocks(visitorTimezone, now);

  renderTimeline('my-timeline', myBlocks);
  renderTimeline('your-timeline', yourBlocks);
}

/**
 * Updates timelines periodically (every minute)
 */
export function startTimelineUpdates(): void {
  renderTimelines();
  // Update every minute to keep timelines current
  setInterval(renderTimelines, 60000);
}
