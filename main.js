"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var node_tradfri_client_1 = require("node-tradfri-client");
var node_tradfri_client_2 = require("node-tradfri-client");
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function connect() {
    return __awaiter(this, void 0, void 0, function () {
        var gateway, tradfri;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_tradfri_client_1.discoverGateway()];
                case 1:
                    gateway = _a.sent();
                    tradfri = new node_tradfri_client_2.TradfriClient(gateway.name);
                    // const { identity, psk } = await tradfri.authenticate('dfYSOrhQpnLIOSEz');
                    // console.log({ identity, psk });
                    return [4 /*yield*/, tradfri.connect('tradfri_1582987903724', 'Quj777Nmn9ar0Ivc')];
                case 2:
                    // const { identity, psk } = await tradfri.authenticate('dfYSOrhQpnLIOSEz');
                    // console.log({ identity, psk });
                    _a.sent();
                    return [2 /*return*/, tradfri];
            }
        });
    });
}
function findDevices(tradfri) {
    return __awaiter(this, void 0, void 0, function () {
        var devices, deviceId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tradfri.observeDevices();
                    return [4 /*yield*/, delay(1000)];
                case 1:
                    _a.sent();
                    devices = [];
                    for (deviceId in tradfri.devices) {
                        devices.push(tradfri.devices[deviceId]);
                    }
                    return [2 /*return*/, devices];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var tradfri, devices;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connect()];
                case 1:
                    tradfri = _a.sent();
                    return [4 /*yield*/, findDevices(tradfri)];
                case 2:
                    devices = _a.sent();
                    devices.forEach(function (device) {
                        if (device.type === 2) {
                            var light = device.lightList[0];
                            light['client'] = tradfri;
                            light.toggle();
                        }
                    });
                    return [4 /*yield*/, delay(1000)];
                case 3:
                    _a.sent();
                    tradfri.destroy();
                    return [2 /*return*/];
            }
        });
    });
}
main().then(function () { return process.exit(0); });
