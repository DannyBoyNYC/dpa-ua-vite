import Bowser from "bowser";

export default class UaInfo {
  #deviceInfo = [];

  constructor(protocolVersion) {
    this.protocolVersion = 3;
    if (UaInfo.instance) {
      throw new Error("Use UaInfo.getInstance() to access UA data");
    }
  }

  get items() {
    return this.#deviceInfo;
  }

  static instance = null;

  static {
    this.instance = new UaInfo(this.protocolVersion);
  }

  static getInstance() {
    return this.instance;
  }

  add(item) {
    this.#deviceInfo.push(item);
  }
}

const uaItems = UaInfo.getInstance();
let headerConfig = {};

try {
  let foundLocalInfo = Intl.DateTimeFormat()
    .resolvedOptions()
    .locale.split("-");
  if (foundLocalInfo.length > 0) {
    headerConfig.locale_lang = foundLocalInfo[0].toLowerCase();
  }
  if (foundLocalInfo.length > 1) {
    headerConfig.country_code = foundLocalInfo[1].toUpperCase();
  }
  let userTimeZone = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.split("/");
  if (userTimeZone.length > 0) {
    headerConfig.region_name = userTimeZone[0];
  }
  if (userTimeZone.length > 1) {
    headerConfig.city_name = userTimeZone[1];
  }
} catch (err) {
  console.error("error resolving locale or timezone information", err);
}

const nav = window.navigator;
const browser = Bowser.getParser(nav.userAgent);

const browser_name = browser.getBrowserName();
const browser_version = browser.getBrowserVersion();
let os_name =
  browser.getOSName().charAt(0).toUpperCase() + browser.getOSName().slice(1);
let os_version = browser.getOSVersion();
let device_type = browser.getPlatformType();

uaItems.add({
  browser_memory_js_heap_limit: window.performance?.memory?.jsHeapSizeLimit,
  browser_memory_js_heap_total: window.performance?.memory?.totalJSHeapSize,
  browser_memory_js_heap_used: window.performance?.memory?.usedJSHeapSize,
  browser_name,
  browser_version,

  windowScreenWidth: window.screen.width,
  windowScreenHeight: window.screen.height,
  windowScreenPixelDepth: window.screen.pixelDepth,
  screen_size: window.screen.width * window.screen.height,

  info_num_cpus: window.navigator?.hardwareConcurrency,
  info_memory_size: window.navigator?.deviceMemory,
  info_screen_colors: window.screen?.colorDepth,
  info_screen_pixel_ratio: window.devicePixelRatio,

  os_name,
  os_version,
  device_type,

  protocolVersion: uaItems.protocolVersion, // HERE

  device_connection_type: window?.navigator?.connection?.effectiveType,
  device_connection_downlink:
    25.0 * window?.navigator?.connection?.downlink * 0.125,
  device_connection_rtt: window?.navigator?.connection?.rtt,

  ...headerConfig,
});

const uaData = uaItems.items[0];
let customProperties = {};

function addProperty(paramLabel, paramValue) {
  if (typeof paramLabel !== "string") {
    paramLabel = String(paramLabel);
  }
  if (typeof paramValue !== "string") {
    paramValue = String(paramValue);
  }
  customProperties[paramLabel] = paramValue;
  console.log("1", uaData.customProperties);
  return customProperties;
}

function removeProperties() {
  if (Object.keys(customProperties).length === 0) return;
  customProperties = {};
  console.log("2", uaData.customProperties);
}

function setProtocolVersion(version) {
  uaItems.protocolVersion = version;
}

function generateGuid() {
  if (self?.crypto?.randomUUID) {
    return self.crypto.randomUUID();
  } else {
    console.error("self.crypto is not supported in this environment");
  }
}

function getDeviceInfo(protocolVersion) {
  let uuid = generateGuid();

  if (protocolVersion) {
    uaData.protocolVersion = protocolVersion;
  }

  return { uuid, ...uaData, customProperties };
}

export {
  getDeviceInfo,
  addProperty,
  setProtocolVersion,
  removeProperties,
  generateGuid,
};
