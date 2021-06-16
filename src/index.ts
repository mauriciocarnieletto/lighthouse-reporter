import { Parser } from "json2csv";
import { LighthousePageReporter } from "./LighthousePageReporter";
import { hosts } from "./config/hosts";
import { Page, pages } from "./config/pages";
import { reportFromLighthouse } from "./Report";
import { writeFile, getOrCreateFolder, readOrCreateFile } from "./helpers/file";

type OutputType = "html" | "json";
const outputs: OutputType[] = ["html"];
const outputDirectory = "./data/";

function cleanHostName(hostname: string) {
  return hostname.split("://")[1].replace(":", "-");
}

async function main() {
  const reports = [];
  const reportId = new Date().getTime().toString();
  const reportOutputDirectory = await getOrCreateFolder(
    `${outputDirectory}${reportId}`
  );
  let globalReport = JSON.parse(
    await readOrCreateFile(`${outputDirectory}/report.json`, JSON.stringify([]))
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
          `${reportOutputDirectory}/${envName}`
        );

        const reporter = new LighthousePageReporter({
          page,
          output: outputType,
        });
        page.url = `${baseUrl}${page.url}`;

        console.log(`Starting analysis for ${page.page} (${envName})`);

        const lighthouseReport = await reporter.getReport();

        if (!lighthouseReport) {
          reports.push({ id: reportId, ...page });
          continue;
        }

        const { report: html } = lighthouseReport;

        writeFile(`${envReportDirectory}/${page.page}.html`, html);

        writeFile(
          `${envReportDirectory}/${page.page}.json`,
          JSON.stringify(lighthouseReport)
        );

        reports.push(reportFromLighthouse(reportId, page, lighthouseReport));

        console.log(`Completed analysis for ${page.page} (${envName})`);
      }
    }
  }

  reportParser = new Parser({
    fields: Object.keys(reports[0]),
  });

  const reportCsv = reportParser.parse(reports);

  writeFile(`${reportOutputDirectory}/report.json`, JSON.stringify(reports));
  writeFile(`${reportOutputDirectory}/report.csv`, reportCsv);

  reports.forEach((report) => globalReport.push(report));
  writeFile(`${outputDirectory}/report.json`, JSON.stringify(globalReport));

  csv = reportParser.parse(globalReport);
  writeFile(`${outputDirectory}/report.csv`, csv);
}

main();
