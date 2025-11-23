/**
 * Analytics tracking utilities
 * This provides a structure for adding analytics services like Google Analytics, Mixpanel, etc.
 */

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

class Analytics {
  private enabled: boolean;

  constructor() {
    // Enable analytics in production only
    this.enabled = import.meta.env.PROD && import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
  }

  /**
   * Track page view
   */
  pageView(path: string): void {
    if (!this.enabled) return;

    try {
      // Example: Google Analytics 4
      // gtag('config', 'GA_MEASUREMENT_ID', {
      //   page_path: path,
      // });

      console.log('[Analytics] Page view:', path);
    } catch (error) {
      console.error('[Analytics] Error tracking page view:', error);
    }
  }

  /**
   * Track custom event
   */
  trackEvent(event: AnalyticsEvent): void {
    if (!this.enabled) return;

    try {
      // Example: Google Analytics 4
      // gtag('event', event.action, {
      //   event_category: event.category,
      //   event_label: event.label,
      //   value: event.value,
      // });

      console.log('[Analytics] Event:', event);
    } catch (error) {
      console.error('[Analytics] Error tracking event:', error);
    }
  }

  /**
   * Track timer completion
   */
  trackTimerComplete(mode: string, duration: number): void {
    this.trackEvent({
      category: 'Timer',
      action: 'Complete',
      label: mode,
      value: duration,
    });
  }

  /**
   * Track settings change
   */
  trackSettingsChange(setting: string, value: string | number): void {
    this.trackEvent({
      category: 'Settings',
      action: 'Change',
      label: `${setting}: ${value}`,
    });
  }

  /**
   * Track theme change
   */
  trackThemeChange(themeId: string): void {
    this.trackEvent({
      category: 'Customization',
      action: 'Theme Change',
      label: themeId,
    });
  }

  /**
   * Track background change
   */
  trackBackgroundChange(backgroundId: string): void {
    this.trackEvent({
      category: 'Customization',
      action: 'Background Change',
      label: backgroundId,
    });
  }

  /**
   * Track error
   */
  trackError(error: Error, context?: string): void {
    if (!this.enabled) return;

    try {
      // Example: Sentry
      // Sentry.captureException(error, {
      //   tags: { context },
      // });

      console.error('[Analytics] Error:', error, context);
    } catch (err) {
      console.error('[Analytics] Error tracking error:', err);
    }
  }
}

export const analytics = new Analytics();
