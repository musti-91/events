export const validate = function(value, callback) {
  let msg = "";
  if (value.title === "") {
    msg = "You need to provide title first";
    return false;
  }
  if (value.fullAddress === "") {
    msg = "full address should be provided";
    return false;
  }
  callback(msg);
  return true;
};
