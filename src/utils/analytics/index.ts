import TagManager from 'react-gtm-module';
import { DEFAULT_CUSTOM_DIMENSIONS, EVENT_DEFAULTS, DEFAULT_IMPRESSION_ACTION } from '@src/utils/analytics/config';

function track(payload) {
  TagManager.dataLayer({
    dataLayer: { ...payload },
  });
}

function trackEvent(payload, customDimensions) {
  const analyticsEvent = {
    event: payload.event == null ? EVENT_DEFAULTS.event : payload.event,
    eventCategory: payload.category == null ? EVENT_DEFAULTS.category : payload.category,
    eventAction: payload.action,
    eventLabel: payload.label,
    eventValue: payload.value,
    ...DEFAULT_CUSTOM_DIMENSIONS,
    ...customDimensions,
  };
  track(analyticsEvent);
}

export function trackPageView(title, page, rest = {}) {
  track({ title, page, ...DEFAULT_CUSTOM_DIMENSIONS, ...rest, event: 'view' });
}

export function trackInteraction(type, payload, rest) {
  const _defaultRest = {
    eventNonInt: false,
  };
  payload.action = payload.action == null ? type : payload.action;
  const customDimensions = { ..._defaultRest, ...rest };
  trackEvent(payload, customDimensions);
}

export function trackImpression(payload, rest) {
  const _defaultRest = {
    eventNonInt: true,
  };
  payload.action = payload.action == null ? DEFAULT_IMPRESSION_ACTION : payload.action;
  const customDimensions = { ...rest, ..._defaultRest };
  trackEvent(payload, customDimensions);
}
