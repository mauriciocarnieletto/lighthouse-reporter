import { Parser } from "json2csv";
import { LighthousePageReporter } from "./LighthousePageReporter";
import { hosts } from "./config/hosts";
import { Page, pages } from "./config/pages";
import { reportFromLighthouse } from "./Report";
import { createFile, getOrCreateFolder } from "./helpers/file";

type OutputType = "html" | "json";
const outputs: OutputType[] = ["html"];
const outputDirectory = "./data/";

function cleanHostName(hostname: string) {
  return hostname.split("://")[1].replace(":", "-");
}

async function main() {
  const reports = [];
  const reportDirectory = await getOrCreateFolder(
    `${outputDirectory}${new Date().getTime().toString()}`
  );
  let reportParser;
  let csv;

  for (const envIndex in hosts) {
    const baseUrl = hosts[envIndex];
    const envName = cleanHostName(baseUrl);

    for (const outputTypeIndex in outputs) {
      for (const pageIndex in pages) {
        const page = pages[pageIndex];
        const outputType = outputs[outputTypeIndex];
        const envReportDirectory = await getOrCreateFolder(
          `${reportDirectory}/${envName}`
        );

        const reporter = new LighthousePageReporter({
          page,
          output: outputType,
        });
        page.url = `${baseUrl}${page.url}`;

        console.log(`Starting analysis for ${page.page} (${envName})`);

        const lighthouseReport = await reporter.getReport();

        if (!lighthouseReport) {
          reports.push({ ...page });
          continue;
        }

        const { report: html } = lighthouseReport;

        createFile(`${envReportDirectory}/${page.page}.html`, html);

        createFile(
          `${envReportDirectory}/${page.page}.json`,
          JSON.stringify(lighthouseReport)
        );

        reports.push(reportFromLighthouse(page, lighthouseReport));

        console.log(`Completed analysis for ${page.page} (${envName})`);
      }
    }
  }

  reportParser = new Parser({
    fields: Object.keys(reports[0]),
  });

  csv = reportParser.parse(reports);

  createFile(`${reportDirectory}/report.json`, JSON.stringify(reports));
  createFile(`${reportDirectory}/report.csv`, csv);
}

main();
