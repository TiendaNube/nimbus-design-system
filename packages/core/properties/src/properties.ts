const removeStylesProperties = (obj: any) => {
  Reflect.deleteProperty(obj, "style");
  Reflect.deleteProperty(obj, "className");
};

export { removeStylesProperties };
