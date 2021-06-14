const fs = require("fs");

const { Parser } = require("json2csv");

const { LighthouseReporter } = require("./src/LighthouseReporter");
const { hosts } = require("./config/hosts");
const { pages } = require("./config/pages");
const { throttling } = require("./config/light-house");

const outputs = ["html"];

async function getOrCreateFolder(fileName) {
  if (!(await fs.existsSync(fileName))) {
    await fs.mkdirSync(fileName);
  }

  return fileName;
}

async function main() {
  const reportDirectory = await getOrCreateFolder(
    `data/${new Date().toISOString() + 1}`
  );
  const reporter = new LighthouseReporter();
  const reports = [];
  let reportParser;
  let csv;

  for (const envIndex in hosts) {
    const baseUrl = hosts[envIndex];
    const envName = baseUrl.split("://")[1];
    for (const outputType in outputs) {
      for (const pageIndex in pages) {
        const page = pages[pageIndex];
        const output = await getOrCreateFolder(`${reportDirectory}/${envName}`);
        page.url = `${baseUrl}${page.url}`;

        console.log(`Starting analysis for ${page.page} (${envName})`);

        const { report } = await reporter.getReport(outputs[outputType], page);

        const reportHtml = report.report;

        fs.writeFileSync(
          `${output}/${page.page}.${outputs[outputType]}`,
          reportHtml
        );
        fs.writeFileSync(`${output}/${page.page}.json`, JSON.stringify(report));

        console.log("Report is done for", report.lhr.finalUrl);
        console.log(
          "Performance score was",
          report.lhr.categories.performance.score * 100
        );

        reports.push({
          performance: report.lhr.categories.performance.score * 100,
          "fcp / s": (
            report.lhr.audits["first-contentful-paint"].numericValue / 1000
          ).toFixed(1),
          "fmp / s": (
            report.lhr.audits["first-meaningful-paint"].numericValue / 1000
          ).toFixed(1),
          "lcp / s": (
            report.lhr.audits["largest-contentful-paint"].numericValue / 1000
          ).toFixed(1),
          "tti / s": (
            report.lhr.audits["interactive"].numericValue / 1000
          ).toFixed(1),
          "tbt / ms": Math.round(
            report.lhr.audits["total-blocking-time"].numericValue
          ),
          "cls / s":
            report.lhr.audits["cumulative-layout-shift"].numericValue.toFixed(
              1
            ),
        });
        console.log(`Completed analysis for ${page.page} (${envName})`);
      }
    }
  }

  reportParser = new Parser({
    fields: Object.keys(reports[0]),
  });

  csv = reportParser.parse(reports);

  fs.writeFileSync(`${reportDirectory}/report.json`, JSON.stringify(reports));
  fs.writeFileSync(`${reportDirectory}/report.csv`, csv);
}

main();
