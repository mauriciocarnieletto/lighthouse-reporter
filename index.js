const fs = require("fs");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const { Parser } = require("json2csv");

const parser = new Parser({
  fields: ["page", "url", "seo", "accessibility", "performance"],
});
const outputs = ["html"];
const pages = [
  { report: "competition", page: "nubank", url: "https://nubank.com.br" },
  { report: "competition", page: "neon", url: "https://neon.com.br" },
  {
    report: "competition",
    page: "bancointer",
    url: "https://www.bancointer.com.br/",
  },
  { report: "competition", page: "c6bank", url: "https://www.c6bank.com.br" },
  {
    report: "competition",
    page: "original",
    url: "https://www.original.com.br/",
  },
  { report: "competition", page: "itau", url: "https://www.itau.com.br/" },
  {
    report: "competition",
    page: "bradesco",
    url: "https://www.bradesco.com.br/",
  },
  { report: "competition", page: "next", url: "https://next.me" },

  { report: "page-comparasion", page: "next_home", url: "https://next.me" },
  {
    report: "page-comparasion",
    page: "next_propostas",
    url: "https://next.me/propostas",
  },
  {
    report: "page-comparasion",
    page: "next_mimos",
    url: "https://next.me/mimos",
  },
  {
    report: "page-comparasion",
    page: "next_flow",
    url: "https://next.me/flow",
  },
  {
    report: "page-comparasion",
    page: "next_objetivos",
    url: "https://next.me/objetivos",
  },
  {
    report: "page-comparasion",
    page: "next_investimentos",
    url: "https://next.me/investimentos",
  },
  {
    report: "page-comparasion",
    page: "next_vaquinha",
    url: "https://next.me/vaquinha",
  },
  {
    report: "page-comparasion",
    page: "next_protecao",
    url: "https://next.me/protecao",
  },
  {
    report: "page-comparasion",
    page: "next_universitarios",
    url: "https://next.me/universitarios",
  },
  {
    report: "page-comparasion",
    page: "next_trazer-meu-salario",
    url: "https://next.me/trazer-meu-salario",
  },
  { report: "page-comparasion", page: "next_faq", url: "https://next.me/faq" },
  {
    report: "page-comparasion",
    page: "next_contato",
    url: "https://next.me/contato",
  },
  {
    report: "page-comparasion",
    page: "next_pr-kit",
    url: "https://next.me/pr-kit",
  },
  {
    report: "page-comparasion",
    page: "next_politica-privacidade",
    url: "https://next.me/politica-privacidade",
  },
  {
    report: "page-comparasion",
    page: "next_documentos-importantes",
    url: "https://next.me/documentos-importantes",
  },
  {
    report: "page-comparasion",
    page: "next_cotacao-dolar",
    url: "https://next.me/cotacao-dolar",
  },
];

async function main() {
  const reportDirectory = getTodaysReportFolder();
  const reports = [];
  for (const output in outputs) {
    for (const page in pages) {
      console.log(`Starting analysis for ${page.page}`);
      let data = await getReport(outputs[output], pages[page], reportDirectory);
      reports.push(data);
      console.log(`Completed analysis for ${page.page}`);
    }
  }

  const csv = parser.parse(reports);
  fs.writeFileSync(`${reportDirectory}/report.json`, JSON.stringify(reports));
  fs.writeFileSync(`${reportDirectory}/report.csv`, JSON.stringify(csv));
}

function getTodaysReportFolder() {
  const today = new Date();
  const fileName = `data/${today.getMonth()}-${today.getDay()}`;
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
    onlyCategories: ["performance", "seo", "accessibility"],
    port: chrome.port,
  };
  const runnerResult = await lighthouse(page.url, options);

  const reportHtml = runnerResult.report;
  fs.writeFileSync(`${directory}/${page.page}.${output}`, reportHtml);

  console.log("Report is done for", runnerResult.lhr.finalUrl);
  console.log(
    "Performance score was",
    runnerResult.lhr.categories.performance.score * 100
  );

  await chrome.kill();
  return {
    page: page.page,
    url: page.url,
    seo: runnerResult.lhr.categories.seo.score * 100,
    performance: runnerResult.lhr.categories.performance.score * 100,
    accessibility: runnerResult.lhr.categories.accessibility.score * 100,
  };
}

main();
