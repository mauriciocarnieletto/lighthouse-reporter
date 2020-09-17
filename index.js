const fs = require("fs");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const { Parser } = require("json2csv");
const pages = require("./pages");
const throttling = require("./constants.js").throttling;

const outputs = ["html"];

async function main() {
  const reportDirectory = getTodaysReportFolder();
  const reports = [];
  let reportParser;
  let csv;

  for (const output in outputs) {
    for (const page in pages) {
      console.log(`Starting analysis for ${page.page}`);
      let data = await getReport(outputs[output], pages[page], reportDirectory);
      reports.push(data);
      console.log(`Completed analysis for ${page.page}`);
    }
  }

  reportParser = new Parser({
    fields: Object.keys(reports[0]),
  });

  csv = reportParser.parse(reports);

  fs.writeFileSync(`${reportDirectory}/report.json`, JSON.stringify(reports));
  fs.writeFileSync(`${reportDirectory}/report.csv`, csv);
}

function getTodaysReportFolder() {
  const today = new Date();
  const fileName = `data/${today.getMonth() + 1}-${today.getDate()}`;
  if (!fs.existsSync(fileName)) {
    fs.mkdirSync(fileName);
  }

  return fileName;
}

async function getReport(output, page, directory) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    logLevel: "info",
    output: output,
    onlyCategories: ["performance"],
    port: chrome.port,
    emulatedFormFactor: page.device,
    throttling: throttling[page.network],
  };
  const runnerResult = await lighthouse(page.url, options);
  const reportHtml = runnerResult.report;

  fs.writeFileSync(`${directory}/${page.page}.${output}`, reportHtml);
  fs.writeFileSync(
    `${directory}/${page.page}.json`,
    JSON.stringify(runnerResult.lhr)
  );

  console.log("Report is done for", runnerResult.lhr.finalUrl);
  console.log(
    "Performance score was",
    runnerResult.lhr.categories.performance.score * 100
  );

  await chrome.kill();
  return {
    ...page,
    // seo: runnerResult.lhr.categories.seo.score * 100,
    // accessibility: runnerResult.lhr.categories.accessibility.score * 100,
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
    "cls / s": runnerResult.lhr.audits[
      "cumulative-layout-shift"
    ].numericValue.toFixed(1),
  };
}

main();
