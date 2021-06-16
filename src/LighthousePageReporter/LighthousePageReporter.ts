import lighthouse from "lighthouse/lighthouse-core";
import * as chromeLauncher from "chrome-launcher";
import { Page } from "../config/pages";
import { throttling } from "../config/light-house";

export class LighthousePageReporter {
  page: Page;
  output: "html" | "json";

  constructor({ page, output }: { page: Page; output: "html" | "json" }) {
    this.page = page;
    this.output = output;
  }

  async getReport() {
    const chrome = await chromeLauncher.launch({
      chromeFlags: ["--headless", "--ignore-certificate-errors"],
    });

    const { device, network, url } = this.page;

    const runnerResult = await lighthouse(url, {
      logLevel: "info",
      output: this.output,
      onlyCategories: ["performance"],
      port: chrome.port,
      preset: device,
      throttling: throttling[network],
    });

    await chrome.kill();

    return runnerResult;
  }
}
