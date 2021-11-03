async function weather() {
  const success = (position) => {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
      const key = "AIzaSyA6lWenvlOmeol218tH2_M6SzQgEqXDBXM";
      fetch(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=true&key=${key}`)
      .then(response => response.json())
      .then(data => console.log(data));
  };
  const error = (error) => {
    console.log(error);
  };
  navigator.geolocation.getCurrentPosition(success, error);
}

weather();
