async function weather() {
  const success = (position) => {
    const long = position.coords.longitude;
    const lat = position.coords.latitude;
    const key = "de32868fbfca4aaaae9e9c93373ad3b6	";

    fetch(
      `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${key}&include=minutely`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // set location
        document.querySelector(".location").innerText = data.data[0].city_name;
        document.querySelector(
          ".location"
        ).href = `https://www.google.com/maps/place/${data.data[0].city_name}`;

        // set date
        const today = new Date();
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const date = today.getDate() + "/" + monthNames[today.getMonth()];
        document.querySelector(".date").innerText =
          date +
          " - " +
          (today.getHours() % 12) +
          ":" +
          today.getMinutes() +
          " " +
          getZone();

        function getZone() {
          if (today.getHours <= 12) return "am";
          else return "pm";
        }

        // set temp
        document.querySelector(".temp").innerText =
          parseInt(data.data[0].temp) + "॰";

        // set desc
        document.querySelector(".sky").innerText =
          data.data[0].weather.description;

        // set wind speed
        document.querySelector(".wind").innerText =
          Math.round(data.data[0].wind_spd * 100) / 100 + " m/s";

        // set humid
        document.querySelector(".humid").innerText =
          Math.round(data.data[0].rh * 100) / 100 + " %";

        // set logo
        document.querySelector(
          ".logo img"
        ).src = `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`;

        // setting bg
        document.documentElement.style.setProperty("--bg", getBg());

        // getBg
        function getBg() {
          if (today.getHours() < 14 && today.getHours() > 5) {
            return "var(--morning)";
          } else if (today.getHours() < 18 && today.getHours() >= 14) {
            return "var(--evening)";
          } else {
            return "var(--night)";
          }
        }
      })
      .then(() => {
        //appear everything
        document.querySelector(".bg-img").style.display = "none";
      });
  };
  const error = (error) => {
    console.log(error);
  };
  navigator.geolocation.getCurrentPosition(success, error);
}

weather();
