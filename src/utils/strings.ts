const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const capitalizeAll = (str: string) => {
  return str.split(" ").map(capitalize).join(" ");
};

export { capitalize, capitalizeAll };
