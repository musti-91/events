export const validate = function(value) {
  if (!value.checked) {
    return false;
  } else {
    if (value.title === "") return "You need to provide title first";
    if (value.address === "") return "full address should be provided";
    if (value.date === "") return "date should be provided!";
  }
};
