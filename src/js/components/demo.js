const demo = function() {
  <Map
    zoom={[0]}
    style={style}
    // fitBounds={props.getFitBounds()}
    containerStyle={{
      height: "300px",
      width: "100%"
    }}
  >
    {props.events.map((event, index) => {
      return (
        <Marker key={index}>
          coordinates={[event.location.lat, event.location.lng]}
          anchor= "bottom">
          <Icon name="marker" color="red" size="big" />
        </Marker>
      );
    })}
  </Map>;
};
