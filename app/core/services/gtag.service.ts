declare global {
  interface Window {
    gtag: (
      option: string,
      gaTrackingId: string,
      options: Record<string, unknown>,
    ) => void;
  }
}

export class GtagService {
  static pageView(url: string, trackingId: string) {
    if (!window.gtag) return;

    window.gtag('config', trackingId, {
      page_path: url,
    });
  }

  static event({ action, category, label, value }: Record<string, string>) {
    if (!window.gtag) return;

    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}
