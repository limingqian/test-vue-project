function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [100, 20, 30, 40, 50, 60];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
