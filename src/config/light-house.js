"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonSimulatedPassConfigOverrides = exports.defaultPassConfig = exports.throttling = void 0;
var DEVTOOLS_RTT_ADJUSTMENT_FACTOR = 3.75;
var DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR = 0.9;
exports.throttling = {
    DEVTOOLS_RTT_ADJUSTMENT_FACTOR: DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
    DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR: DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
    // These values align with WebPageTest's definition of "Fast 3G"
    // But offer similar charateristics to roughly the 75th percentile of 4G connections.
    mobileSlow4G: {
        rttMs: 150,
        throughputKbps: 1.6 * 1024,
        requestLatencyMs: 150 * DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
        downloadThroughputKbps: 1.6 * 1024 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
        uploadThroughputKbps: 750 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
        cpuSlowdownMultiplier: 4,
    },
    // These values partially align with WebPageTest's definition of "Regular 3G".
    // These values are meant to roughly align with Chrome UX report's 3G definition which are based
    // on HTTP RTT of 300-1400ms and downlink throughput of <700kbps.
    mobileRegular3G: {
        rttMs: 300,
        throughputKbps: 700,
        requestLatencyMs: 300 * DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
        downloadThroughputKbps: 700 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
        uploadThroughputKbps: 700 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
        cpuSlowdownMultiplier: 4,
    },
    // Using a "broadband" connection type
    // Corresponds to "Dense 4G 25th percentile" in https://docs.google.com/document/d/1Ft1Bnq9-t4jK5egLSOc28IL4TvR-Tt0se_1faTA4KTY/edit#heading=h.bb7nfy2x9e5v
    desktopDense4G: {
        rttMs: 40,
        throughputKbps: 10 * 1024,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
    },
};
/** @type {LH.Config.Settings} */
var defaultSettings = {
    output: "json",
    maxWaitForFcp: 30 * 1000,
    maxWaitForLoad: 45 * 1000,
    throttlingMethod: "simulate",
    throttling: exports.throttling.mobileSlow4G,
    auditMode: false,
    gatherMode: false,
    disableStorageReset: false,
    emulatedFormFactor: "mobile",
    internalDisableDeviceScreenEmulation: false,
    channel: "node",
    // the following settings have no defaults but we still want ensure that `key in settings`
    // in config will work in a typechecked way
    budgets: null,
    locale: "pt-BR",
    blockedUrlPatterns: null,
    additionalTraceCategories: null,
    extraHeaders: null,
    precomputedLanternData: null,
    onlyAudits: null,
    onlyCategories: null,
    skipAudits: null,
};
/** @type {LH.Config.Pass} */
exports.defaultPassConfig = {
    passName: "defaultPass",
    loadFailureMode: "fatal",
    recordTrace: false,
    useThrottling: false,
    pauseAfterFcpMs: 0,
    pauseAfterLoadMs: 0,
    networkQuietThresholdMs: 0,
    cpuQuietThresholdMs: 0,
    blockedUrlPatterns: [],
    blankPage: "about:blank",
    gatherers: [],
};
exports.nonSimulatedPassConfigOverrides = {
    pauseAfterFcpMs: 5250,
    pauseAfterLoadMs: 5250,
    networkQuietThresholdMs: 5250,
    cpuQuietThresholdMs: 5250,
};
