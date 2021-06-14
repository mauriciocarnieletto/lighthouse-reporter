const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const { throttling } = require("../../config/light-house");

class LighthouseReporter {
  async getReport(output, page) {
    const chrome = await chromeLauncher.launch({
      chromeFlags: ["--headless", "--ignore-certificate-errors"],
    });

    const options = {
      logLevel: "info",
      output: output,
      onlyCategories: ["performance"],
      port: chrome.port,
      emulatedFormFactor: page.device,
      throttling: throttling[page.network],
    };

    const runnerResult = await lighthouse(page.url, options);
    await chrome.kill();

    return {
      ...page,

      report: runnerResult,

      performance: runnerResult.lhr.categories.performance.score * 100,
      "fcp / s": (
        runnerResult.lhr.audits["first-contentful-paint"].numericValue / 1000
      ).toFixed(1),
      "fmp / s": (
        runnerResult.lhr.audits["first-meaningful-paint"].numericValue / 1000
      ).toFixed(1),
      "lcp / s": (
        runnerResult.lhr.audits["largest-contentful-paint"].numericValue / 1000
      ).toFixed(1),
      "tti / s": (
        runnerResult.lhr.audits["interactive"].numericValue / 1000
      ).toFixed(1),
      "tbt / ms": Math.round(
        runnerResult.lhr.audits["total-blocking-time"].numericValue
      ),
      "cls / s":
        runnerResult.lhr.audits["cumulative-layout-shift"].numericValue.toFixed(
          1
        ),
    };
  }
}

module.exports = { LighthouseReporter };
