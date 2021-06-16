"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportFromLighthouse = void 0;
function categoriesReport(categories) {
    if (!categories)
        return { performance: undefined };
    return {
        performance: categories.performance.score && categories.performance.score * 100,
    };
}
function auditsReport(audits) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (!audits)
        return {};
    return {
        "fcp / s": ((_a = audits["first-contentful-paint"]) === null || _a === void 0 ? void 0 : _a.numericValue) &&
            (((_b = audits["first-contentful-paint"]) === null || _b === void 0 ? void 0 : _b.numericValue) / 1000).toFixed(1),
        "fmp / s": ((_c = audits["first-meaningful-paint"]) === null || _c === void 0 ? void 0 : _c.numericValue) &&
            (audits["first-meaningful-paint"].numericValue / 1000).toFixed(1),
        "lcp / s": ((_d = audits["largest-contentful-paint"]) === null || _d === void 0 ? void 0 : _d.numericValue) &&
            (((_e = audits["largest-contentful-paint"]) === null || _e === void 0 ? void 0 : _e.numericValue) / 1000).toFixed(1),
        "tti / s": ((_f = audits["interactive"]) === null || _f === void 0 ? void 0 : _f.numericValue) &&
            (((_g = audits["interactive"]) === null || _g === void 0 ? void 0 : _g.numericValue) / 1000).toFixed(1),
        "tbt / ms": ((_h = audits["total-blocking-time"]) === null || _h === void 0 ? void 0 : _h.numericValue) &&
            Math.round(audits["total-blocking-time"].numericValue),
        "cls / s": ((_j = audits["cumulative-layout-shift"]) === null || _j === void 0 ? void 0 : _j.numericValue) &&
            ((_k = audits["cumulative-layout-shift"]) === null || _k === void 0 ? void 0 : _k.numericValue.toFixed(1)),
    };
}
function reportFromLighthouse(page, lighthouseReport) {
    var lhr = lighthouseReport.lhr;
    if (!lhr)
        return __assign({}, page);
    var audits = lhr.audits, categories = lhr.categories;
    return __assign(__assign(__assign({}, page), categoriesReport(categories)), auditsReport(audits));
}
exports.reportFromLighthouse = reportFromLighthouse;
