// Configuration for timezone display
// Later these will be moved to CloudFlare KV

declare global {
	interface Window {
    /**
     * Configuration variables injected at build time in a script block in base-layout.webc
     */
		CLIENTSIDE_CONFIG_VARS?: Record<string, any>;
	}
}

const values = window.CLIENTSIDE_CONFIG_VARS || {};


export const MY_LOCATION_NAME =   values.MY_LOCATION_NAME || "Denver area, CO, USA";
export const MY_TIMEZONE = values.MY_TIMEZONE || "America/Denver"; // Uses IANA timezone identifier, DST-aware

// Available hours for calls (24-hour format)
export const AVAILABLE_START_HOUR = values.AVAILABLE_START_HOUR || 9; // 9 AM
export const AVAILABLE_END_HOUR = values.AVAILABLE_END_HOUR || 17; // 5 PM (17:00)
