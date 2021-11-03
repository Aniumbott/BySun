async function weather() {
  const success = (position) => {
    const long = position.coords.longitude;
    const lat = position.coords.latitude;
    // const ckey = "ccabc05dcf4fe1564f2aeb09ff253ba1";
    const wkey = "e7d6c7eac5711442a2c962247f1b162a";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${wkey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        // set location
        document.querySelector(".location").innerText = data.name;
        document.querySelector(
          ".location"
        ).href = `https://www.google.com/maps/place/${data.name}`;

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
          date + " - " + today.getHours() + ":" + today.getMinutes();

        // set temp
        document.querySelector(".temp").innerText =
          parseInt(data.main.temp) + "॰";

        // set desc
        document.querySelector(".sky").innerText = data.weather[0].description;

        // set humid
        document.querySelector(".wind").innerText += data.main.humidity;

        // set logo
        document.querySelector(
          ".logo img"
        ).src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

        // setting bg
        document.documentElement.style.setProperty("--bg", getBg());

        // getBg
        function getBg() {
          if (today.getHours() < 14 && today.getHours() > 5) {
            return "var(--morning)";
          } else if (today.getHours() < 18 && today.getHours() > 14) {
            return "var(--evening)";
          } else {
            return "var(--night)";
          }
        }
      });

    //appear everything
    document.querySelector("body").style.opacity = "1";
  };
  const error = (error) => {
    console.log(error);
  };
  navigator.geolocation.getCurrentPosition(success, error);
}

weather();
