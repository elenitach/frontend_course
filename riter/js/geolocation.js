let city = document.getElementsByClassName("topline__city")[0];
let phone = document.getElementsByClassName("topline__phone")[0];
city.textContent = "Москва";
phone.textContent = "8 800 2000 600";

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setCityInfo(lat, long);
    });
}

async function setCityInfo(lat, long) {
    const apiKey = "";
    let response = await fetch(
        `https://geocode-maps.yandex.ru/1.x?` + 
        `geocode=${lat},${long}` + 
        `&apikey=${apiKey}` + 
        `&sco=latlong` + 
        `&format=json`
    );
    if (response.ok) {
        let json = await response.json();
        city.textContent = json
                ["response"]
                ["GeoObjectCollection"]
                ["featureMember"][0]
                ["GeoObject"]
                ["metaDataProperty"]
                ["GeocoderMetaData"]
                ["Address"]
                ["Components"][4]
                ["name"];
        if (city.textContent != "Москва") {
            phone.textContent = "7 900 0000 777";
        }
    }
}