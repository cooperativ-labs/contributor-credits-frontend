import TagManager from 'react-gtm-module';

const _defaults = {
  root: null,
  rootMargin: '0%',
  threshold: 0.5,
  once: false,
  callback: () => {},
};
export class ViewportObserver {
  options;
  observer;
  constructor(options = {}) {
    this.options = { ..._defaults, ...options };
    this.observer = new IntersectionObserver(this.handler.bind(this), this.options);
  }
  handler(entries, observer) {
    const visibleEntries = [];

    for (const i in entries) {
      const entry = entries[i];

      if (entry.intersectionRatio >= this.options.threshold) {
        visibleEntries.push(entry);
        if (this.options.once) {
          observer.unobserve(entry.target);
        }
      }
    }

    const els = visibleEntries.map((entry) => {
      return entry.target;
    });
    this.options.callback(els);
  }
  observe(el) {
    this.observer.observe(el);
  }
  unobserveAll() {
    this.observer.disconnect();
  }
}

function trackEvent(event, category, action, label, value, rest = {}) {
  TagManager.dataLayer({ dataLayer: { event, category, action, label, value, ...rest } });
}

export function trackPageView(title, url, rest = {}) {
  trackEvent('Pageview', 'pages', 'pageview', title, url, rest);
}

export function trackClick(label, value, rest = {}) {
  trackEvent('Event', 'interaction', 'click', label, value, rest);
}

export function trackFocus(label, value, rest = {}) {
  trackEvent('Event', 'interaction', 'focus', label, value, rest);
}

export function trackBlur(label, value, rest = {}) {
  trackEvent('Event', 'interaction', 'blur', label, value, rest);
}

export function trackExternalLink(label, value, rest = {}) {
  trackEvent('ExternalLink', 'interaction', 'Externallink', label, value, rest);
}

export function trackImpression(label, value, rest = {}) {
  trackEvent('Event', 'impression', 'impression', label, value, rest);
}
