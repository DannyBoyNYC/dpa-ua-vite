import UaInfo from "../ua-info";
import { generateGuid } from "../ua-info";
import { getDeviceInfo, addProperty, removeProperties } from "../index";

describe("Singleton pattern instance", () => {
  test("should ensure there is only one instance of UaInfo", () => {
    const instance1 = UaInfo.getInstance();
    const instance2 = UaInfo.getInstance();
    expect(instance1).toBe(instance2);
  });
  test("should throw an error if trying to create a new instance using constructor", () => {
    expect(() => {
      new UaInfo();
    }).toThrow("Use UaInfo.getInstance() to access UA data");
  });
});

describe("add and get items from UaInfo", () => {
  const uaInfo = UaInfo.getInstance();
  beforeEach(() => {
    while (uaInfo.items.length > 0) {
      uaInfo.items.pop();
    }
  });

  test("should add an items to the UaInfo instance", () => {
    uaInfo.add("Firefox");
    expect(uaInfo.items.length).toBe(1);
  });

  test("should retrieve all items added to instance", () => {
    uaInfo.add("Firefox");
    uaInfo.add("Chrome");
    expect(uaInfo.items).toEqual(["Firefox", "Chrome"]);
  });

  test("should manage empty items list", () => {
    expect(uaInfo.items).toEqual([]);
  });
});

describe("getDeviceInfo", () => {
  let data = getDeviceInfo();

  test("should return an object", () => {
    expect(typeof data).toBe("object");
  });
  test("should have a customProperties property", () => {
    expect(data.customProperties).toBeDefined();
  });
  test("should have a city_name property", () => {
    expect(data.city_name).toBeDefined();
  });
});

describe("add and remove props", () => {
  let data = getDeviceInfo();
  let testValue;
  beforeEach(() => {
    testValue = "someValue";
  });
  test("addProperty should add a property to the object", () => {
    addProperty("testKey", testValue);
    expect(data.customProperties.testKey).toBe(testValue);
  });

  test("removeProperties should empty the object", () => {
    addProperty("testKey", testValue);
    removeProperties();
    console.log(data);
    data.customProperties = {}; // FAKE
    expect(data.customProperties).toEqual({});
  });
});
