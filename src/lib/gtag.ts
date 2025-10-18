export const GA_TRACKING_ID = 'G-FKBN78M76V'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const eventConfig: Record<string, string | number | boolean> = {
      event_category: category,
    }
    
    if (label) {
      eventConfig.event_label = label
    }
    
    if (value !== undefined) {
      eventConfig.value = value
    }
    
    window.gtag('event', action, eventConfig)
  }
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, string | number | boolean>
    ) => void
  }
}
