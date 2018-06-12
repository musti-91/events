import _ from "lodash";
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

let getMinOrMax = (markersObj, minOrMax, latOrLng) => {
  if (minOrMax === "max") {
    return _.maxBy(markersObj, function(value) {
      return value[latOrLng];
    })[latOrLng];
  } else {
    return _.minBy(markersObj, function(value) {
      return value[latOrLng];
    })[latOrLng];
  }
};

export let getBounds = markersObj => {
  var maxLat = getMinOrMax(markersObj, "max", "lat");
  var minLat = getMinOrMax(markersObj, "min", "lat");
  var maxLng = getMinOrMax(markersObj, "max", "lng");
  var minLng = getMinOrMax(markersObj, "min", "lng");

  var southWest = [minLng, minLat];
  var northEast = [maxLng, maxLat];
  return [southWest, northEast];
};
