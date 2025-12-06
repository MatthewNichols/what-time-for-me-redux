import { startTimeUpdates } from './current-time';
import { startTimelineUpdates } from './timeline';

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  startTimeUpdates();
  startTimelineUpdates();
});