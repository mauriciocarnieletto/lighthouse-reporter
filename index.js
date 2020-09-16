const fs = require("fs");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const { Parser } = require("json2csv");
const pages = require("./pages");

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
    // throttlingMethod: page.network,
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
    report: page.report,
    page: page.page,
    url: page.url,
    // seo: runnerResult.lhr.categories.seo.score * 100,
    // accessibility: runnerResult.lhr.categories.accessibility.score * 100,
    performance: runnerResult.lhr.categories.performance.score * 100,
    fcp: runnerResult.lhr.audits["first-contentful-paint"].displayValue,
    fmp: runnerResult.lhr.audits["first-meaningful-paint"].displayValue,
    lcp: runnerResult.lhr.audits["largest-contentful-paint"].displayValue,
    tti: runnerResult.lhr.audits["interactive"].displayValue,
    tbt: runnerResult.lhr.audits["total-blocking-time"].displayValue,
    cls: runnerResult.lhr.audits["cumulative-layout-shift"].displayValue,
  };
}

main();
