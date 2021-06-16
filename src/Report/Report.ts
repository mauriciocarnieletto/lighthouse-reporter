import { Page } from "../config/pages";

function categoriesReport(categories: Record<string, LH.Result.Category>) {
  if (!categories) return { performance: undefined };

  return {
    performance:
      categories.performance.score && categories.performance.score * 100,
  };
}

function auditsReport(audits: Record<string, LH.Audit.Result>) {
  if (!audits) return {};

  return {
    "fcp / s":
      audits["first-contentful-paint"]?.numericValue &&
      (audits["first-contentful-paint"]?.numericValue / 1000).toFixed(1),
    "fmp / s":
      audits["first-meaningful-paint"]?.numericValue &&
      (audits["first-meaningful-paint"].numericValue / 1000).toFixed(1),
    "lcp / s":
      audits["largest-contentful-paint"]?.numericValue &&
      (audits["largest-contentful-paint"]?.numericValue / 1000).toFixed(1),
    "tti / s":
      audits["interactive"]?.numericValue &&
      (audits["interactive"]?.numericValue / 1000).toFixed(1),
    "tbt / ms":
      audits["total-blocking-time"]?.numericValue &&
      Math.round(audits["total-blocking-time"].numericValue),
    "cls / s":
      audits["cumulative-layout-shift"]?.numericValue &&
      audits["cumulative-layout-shift"]?.numericValue.toFixed(1),
  };
}

export function reportFromLighthouse(
  id: string,
  page: Page,
  lighthouseReport: LH.RunnerResult
) {
  const { lhr } = lighthouseReport;

  if (!lhr) return { ...page };

  const { audits, categories } = lhr;

  return {
    id,
    ...page,
    ...categoriesReport(categories),
    ...auditsReport(audits),
  };
}
