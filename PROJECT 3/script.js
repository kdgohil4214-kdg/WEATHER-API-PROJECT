document.getElementById("form").addEventListener("submit", async (e) => {

    e.preventDefault();

    const input = document.getElementById("input").value;
    const temprature = document.getElementById("temperature");
    const city = document.getElementById("city");
    const img = document.getElementById("img");
    const notfound = document.getElementById("not-found");

    const humidity = document.getElementById("humidity");
    const humidityName = document.getElementById("humidity-name");
    const humidityImg = document.getElementById("humidity-img");

    const speed = document.getElementById("speed");
    const speedName = document.getElementById("speed-name");
    const speedImg = document.getElementById("speed-img");

    try {

        const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=741c8e2867412a6d048b623e3dbfc3c6&units=metric`);
        const data = await weather.json();

        if (data.cod === "404") {

            notfound.textContent = "No city found";
            temprature.textContent = "";
            city.textContent = "";
            img.style.display = "none";

            humidity.textContent = "";
            speed.textContent = "";

        } else {

            temprature.textContent = `${data.main.temp} °C`;
            city.textContent = data.name;
            notfound.textContent = "";

            const condition = data.weather[0].main.toLowerCase();

            /* Weather icons (online) */
            if (condition.includes("cloud")) {
                img.src = "https://cdn-icons-png.flaticon.com/512/1163/1163661.png";
            } else if (condition.includes("rain")) {
                img.src = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
            } else if (condition.includes("clear")) {
                img.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
            } else {
                img.src = "https://cdn-icons-png.flaticon.com/512/1163/1163661.png";
            }

            img.style.display = "block";

            /* Humidity */
            humidity.textContent = `${data.main.humidity}%`;
            humidityName.textContent = "Humidity";
            humidityImg.src = "https://cdn-icons-png.flaticon.com/512/728/728093.png";

            /* Wind */
            speed.textContent = `${data.wind.speed} km/h`;
            speedName.textContent = "Wind Speed";
            speedImg.src = "https://cdn-icons-png.flaticon.com/512/1116/1116453.png";
        }

    } catch (error) {
        console.log(error);
        notfound.textContent = "Something went wrong";
    }

});