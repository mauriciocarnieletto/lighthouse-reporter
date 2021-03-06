import { Throttling } from "./light-house";

export interface Page {
  report: string;
  page: string;
  url: string;
  device: "mobile" | "desktop";
  network: keyof Throttling;
}

export const pages: Page[] = [
  {
    report: "page-comparasion",
    page: "404 - Mobile",
    url: "/404",
    device: "mobile",
    network: "mobileSlow4G",
  },
  {
    report: "page-comparasion",
    page: "abrir-conta - Mobile",
    url: "/abrir-conta",
    device: "mobile",
    network: "mobileSlow4G",
  },
  {
    report: "page-comparasion",
    page: "abrirconta - Mobile",
    url: "/abrirconta",
    device: "mobile",
    network: "mobileSlow4G",
  },
  {
    report: "page-comparasion",
    page: "carreiras - Mobile",
    url: "/carreiras",
    device: "mobile",
    network: "mobileSlow4G",
  },
  // {
  //   report: "page-comparasion",
  //   page: "cartoes-next - Mobile",
  //   url: "/cartoes-next",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "conta-next - Mobile",
  //   url: "/conta-next",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "conta-universitarios - Mobile",
  //   url: "/conta-universitarios",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "contato - Mobile",
  //   url: "/contato",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "cotacao-dolar - Mobile",
  //   url: "/cotacao-dolar",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "diadosnamorados - Mobile",
  //   url: "/diadosnamorados",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "disneyplus - Mobile",
  //   url: "/disneyplus",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "documentos-importantes - Mobile",
  //   url: "/documentos-importantes",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "duvidas - Mobile",
  //   url: "/duvidas",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "emprestimos - Mobile",
  //   url: "/emprestimos",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "faq - Mobile",
  //   url: "/faq",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "flow - Mobile",
  //   url: "/flow",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "home - Mobile",
  //   url: "/home",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "indique-amigos - Mobile",
  //   url: "/indique-amigos",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "informacoes/caixas-eletronicos - Mobile",
  //   url: "/informacoes/caixas-eletronicos",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "informacoes/cotacao-dolar - Mobile",
  //   url: "/informacoes/cotacao-dolar",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "informacoes/diretivas-privacidade - Mobile",
  //   url: "/informacoes/diretivas-privacidade",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "informacoes/documentos-importantes - Mobile",
  //   url: "/informacoes/documentos-importantes",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "informacoes/lgpd - Mobile",
  //   url: "/informacoes/lgpd",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "investimentos - Mobile",
  //   url: "/investimentos",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "mgm - Mobile",
  //   url: "/mgm",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "mimos - Mobile",
  //   url: "/mimos",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "nextjoy - Mobile",
  //   url: "/nextjoy",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "objetivos - Mobile",
  //   url: "/objetivos",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "open-banking - Mobile",
  //   url: "/open-banking",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "openbanking - Mobile",
  //   url: "/openbanking",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "pix - Mobile",
  //   url: "/pix",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "politica-privacidade - Mobile",
  //   url: "/politica-privacidade",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "propostas - Mobile",
  //   url: "/propostas",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "protecao - Mobile",
  //   url: "/protecao",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "sms - Mobile",
  //   url: "/sms",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "sobre-nos - Mobile",
  //   url: "/sobre-nos",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "transferencias-no-whatsapp - Mobile",
  //   url: "/transferencias-no-whatsapp",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "trazer-meu-salario - Mobile",
  //   url: "/trazer-meu-salario",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "universitarios - Mobile",
  //   url: "/universitarios",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "vaquinha - Mobile",
  //   url: "/vaquinha",
  //   device: "mobile",
  //   network: "mobileSlow4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "404 - desktop",
  //   url: "/404",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "abrir-conta - desktop",
  //   url: "/abrir-conta",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "abrirconta - desktop",
  //   url: "/abrirconta",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "carreiras - desktop",
  //   url: "/carreiras",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "cartoes-next - desktop",
  //   url: "/cartoes-next",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "conta-next - desktop",
  //   url: "/conta-next",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "conta-universitarios - desktop",
  //   url: "/conta-universitarios",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "contato - desktop",
  //   url: "/contato",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "cotacao-dolar - desktop",
  //   url: "/cotacao-dolar",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "diadosnamorados - desktop",
  //   url: "/diadosnamorados",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "disneyplus - desktop",
  //   url: "/disneyplus",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "documentos-importantes - desktop",
  //   url: "/documentos-importantes",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "duvidas - desktop",
  //   url: "/duvidas",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "emprestimos - desktop",
  //   url: "/emprestimos",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "faq - desktop",
  //   url: "/faq",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "flow - desktop",
  //   url: "/flow",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "home - desktop",
  //   url: "/home",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "indique-amigos - desktop",
  //   url: "/indique-amigos",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "informacoes/caixas-eletronicos - desktop",
  //   url: "/informacoes/caixas-eletronicos",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "informacoes/cotacao-dolar - desktop",
  //   url: "/informacoes/cotacao-dolar",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "informacoes/diretivas-privacidade - desktop",
  //   url: "/informacoes/diretivas-privacidade",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "informacoes/documentos-importantes - desktop",
  //   url: "/informacoes/documentos-importantes",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "informacoes/lgpd - desktop",
  //   url: "/informacoes/lgpd",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "investimentos - desktop",
  //   url: "/investimentos",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "mgm - desktop",
  //   url: "/mgm",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "mimos - desktop",
  //   url: "/mimos",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "nextjoy - desktop",
  //   url: "/nextjoy",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "objetivos - desktop",
  //   url: "/objetivos",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "open-banking - desktop",
  //   url: "/open-banking",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "openbanking - desktop",
  //   url: "/openbanking",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "pix - desktop",
  //   url: "/pix",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "politica-privacidade - desktop",
  //   url: "/politica-privacidade",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "propostas - desktop",
  //   url: "/propostas",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "protecao - desktop",
  //   url: "/protecao",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "sms - desktop",
  //   url: "/sms",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "sobre-nos - desktop",
  //   url: "/sobre-nos",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "transferencias-no-whatsapp - desktop",
  //   url: "/transferencias-no-whatsapp",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "trazer-meu-salario - desktop",
  //   url: "/trazer-meu-salario",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "universitarios - desktop",
  //   url: "/universitarios",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
  // {
  //   report: "page-comparasion",
  //   page: "vaquinha - desktop",
  //   url: "/vaquinha",
  //   device: "desktop",
  //   network: "desktopDense4G",
  // },
];
