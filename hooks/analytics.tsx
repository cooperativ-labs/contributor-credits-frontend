import AnalyticsContext from '@context/analytics';
import TagManager from 'react-gtm-module';
import { DEFAULT_BLUR_ACTION, DEFAULT_CLICK_ACTION, DEFAULT_FOCUS_ACTION } from '@src/utils/analytics/config';
import { parseCustomDimensions, parseDataAttributes, parseOverwriteObject } from '@src/utils/analytics/helpers';
import { trackImpression, trackPageView } from '@src/utils/analytics';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
// @ts-ignore
import { trackInteraction } from '@src/utils/analytics/index.ts';

/**
 * Handles Generating Analytics Data from data-attributes and overwrites
 * @param {HTMLElement} element
 * @param {object} overwriteProps
 * @return {object} Contains core analytics {event, category, action, label, value} as well as custom dimensions {rest}
 */
function generateAnalyticsPayload(element, overwriteProps, dynamicDimensions) {
  const overwrite = overwriteProps ? parseOverwriteObject(overwriteProps) : { core: {}, rest: {} };
  const { core, rest } = parseDataAttributes(element.target);
  const parsedRest = parseCustomDimensions(rest);
  return {
    core: { ...core, ...overwrite.core },
    rest: { ...dynamicDimensions, ...parsedRest, ...overwrite.rest },
  };
}

/**
 * Handles Tracking User Interaction Events (Click, Focus, Blur)
 * @param {string} type
 * @param {HTMLElement} element
 * @param {object} overwriteProps
 */
function interactionHandler(type, element, overwriteProps, dynamicDimensions) {
  const { core, rest } = generateAnalyticsPayload(element, overwriteProps, dynamicDimensions);
  trackInteraction(type, core, rest);
}

export function useAnalytics() {
  const router = useRouter();
  const [dynamicDimensions, setDynamicDimensions] = useState(null);
  const [pageTracked, setPageTracked] = useState(false);
  const setCurrentDynamicDimensions = useCallback((currentDimensions) => {
    setDynamicDimensions({ ...currentDimensions, ...dynamicDimensions });
  }, []);

  const gtmProperties = {
    gtmId: 'GTM-TR24L6D',
    dataLayer: {
      projectTitle: 'Cooperativ',
    },
  };
  useEffect(() => {
    TagManager.initialize(gtmProperties);
    function demoServerDimensions() {
      try {
        setTimeout(() => {
          const data = { userId: 1234567890 };
          setDynamicDimensions(data);
          return data;
        }, 500);
      } catch (e) {
        setDynamicDimensions({});
      }
    }
    demoServerDimensions();
    // if(dynamicDimensions===null){
    //   setDynamicDimensions({}) // Dynamic dimensions must be set to not null for analytics hooks to work
    // }
  }, []);

  useEffect(() => {
    if (!pageTracked && dynamicDimensions) {
      trackPageView(document.title, window.location.pathname, dynamicDimensions);
      setPageTracked(true);
    }
    const handleRouteChange = (url) => {
      if (dynamicDimensions) {
        trackPageView(document.title, url, dynamicDimensions);
        setPageTracked(true);
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [dynamicDimensions, router.events]);

  return [dynamicDimensions, setCurrentDynamicDimensions];
}

/**
 * Returns Set Node Reference and Entry
 *
 * @param {object} IntersectionOptions
 * @param {object} OverwriteProps (Analytics Object) {event, category, action, label, value, customDimensions}
 * @return {hook} React Ref & Entry
 *
 * Analytics data will be automatically retrieved from data-analytics... attributes included on the HTMLElement (ref),
 * properties included in the 'OverwriteProps' will take priority over the data attributes.
 */
export function useAnalyticsImpression(
  { root = null, rootMargin = '0px', threshold = 0.5, once = true },
  overwriteProps = {}
) {
  const [entry, setEntry] = useState({});
  const [node, setNode] = useState(null);
  const [impressionFired, setImpressionFired] = useState(false);
  const { dynamicDimensions } = useContext(AnalyticsContext);
  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        if (entry.intersectionRatio >= threshold) {
          if (dynamicDimensions) {
            if (once && impressionFired) {
              return;
            }
            const { core, rest } = generateAnalyticsPayload(entry, overwriteProps, dynamicDimensions);
            trackImpression(core, rest);
            setImpressionFired(true);
          }
        }
      },
      { root, rootMargin, threshold }
    );
    const { current: currentObserver } = observer;

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, root, rootMargin, threshold, dynamicDimensions, once ? impressionFired : null]);

  return [setNode, entry];
}

/**
 * Returns Analytics Click Function Handler
 * @return {function} Track Click
 *
 * Analytics data will be automatically retrieved from data-analytics... attributes included on the HTMLElement (ref),
 * properties included in the 'OverwriteProps' supplied to handler alongside the event will take priority over the data
 * attributes.
 */
export function useAnalyticsClick() {
  const { dynamicDimensions } = useContext(AnalyticsContext);
  const handler = useCallback(
    (e, overwrite) => {
      if (dynamicDimensions) {
        interactionHandler(DEFAULT_CLICK_ACTION, e, overwrite, dynamicDimensions);
      }
    },
    [dynamicDimensions]
  );
  return handler;
}

/**
 * Returns Analytics Focus Function Handler
 * @return {function} Track Focus
 *
 * Analytics data will be automatically retrieved from data-analytics... attributes included on the HTMLElement (ref),
 * properties included in the 'OverwriteProps' supplied to handler alongside the event will take priority over the data
 * attributes.
 */
export function useAnalyticsFocus() {
  const { dynamicDimensions } = useContext(AnalyticsContext);
  const handler = useCallback(
    (e, overwrite) => {
      if (dynamicDimensions) {
        interactionHandler(DEFAULT_FOCUS_ACTION, e, overwrite, dynamicDimensions);
      }
    },
    [dynamicDimensions]
  );
  return handler;
}

/**
 * Returns Analytics Blur Function Handler
 * @return {function} Track Blur
 *
 * Analytics data will be automatically retrieved from data-analytics... attributes included on the HTMLElement (ref),
 * properties included in the 'OverwriteProps' supplied to handler alongside the event will take priority over the data
 * attributes.
 */
export function useAnalyticsBlur() {
  const { dynamicDimensions } = useContext(AnalyticsContext);
  const handler = useCallback(
    (e, overwrite) => {
      if (dynamicDimensions) {
        interactionHandler(DEFAULT_BLUR_ACTION, e, overwrite, dynamicDimensions);
      }
    },
    [dynamicDimensions]
  );
  return handler;
}
