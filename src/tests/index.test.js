import { getDeviceInfo, addProperty, removeProperties } from "../index";

describe("UaInfo Module", () => {
  test("getDeviceInfo should return device info", () => {
    const deviceInfo = getDeviceInfo();
    expect(deviceInfo).toHaveProperty("browser");
    expect(deviceInfo).toHaveProperty("os");
  });

  test("addProperty should add a property to the object", () => {
    const obj = {};
    addProperty(obj, "newProp", "value");
    expect(obj).toHaveProperty("newProp", "value");
  });

  test("removeProperties should remove a property from the object", () => {
    const obj = { propToRemove: "value" };
    removeProperties(obj, "propToRemove");
    expect(obj).not.toHaveProperty("propToRemove");
  });
});
