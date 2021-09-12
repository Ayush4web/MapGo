//Date
const date = document.querySelector(".date");
const year = new Date();
date.innerHTML = year.getFullYear();


// for loading 


navigator.geolocation.getCurrentPosition(
  (position) => {
    let lng = position.coords.longitude;
    let lat = position.coords.latitude;
    const Coords = [lat, lng];

    let map = L.map("map").setView(Coords, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(Coords).addTo(map).bindPopup("You Are Here!").openPopup();
     
    map.on('click', function(mapevent){
      // document.querySelector('.anim').classList.add('hidden')
      // document.querySelector('.fetching').classList.remove('hidden')
      fetchData();
      
        const {lat , lng} = mapevent.latlng
         
        
        let latlng1 = L.latLng(lat, lng);
        let latlng2 = L.latLng(...Coords);
    
        let dist = map.distance(latlng1,latlng2)/1000;
        let time = dist/25*60
        document.querySelector('.dist').innerHTML = dist.toFixed(2);
        document.querySelector('.tim').innerHTML = time.toFixed(1)
        
            
        L.marker([lat,lng]).addTo(map).bindPopup("Destination").openPopup();

        // document.querySelector('.anim').style.opacity = 1;

    })
   
    
   
  },
  function () {
    alert("Could not get your location!");
  }
);

/------------------------------------------------------------------------------/;

function fetchData() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let lng = position.coords.longitude;
      let lat = position.coords.latitude;

      (async function () {
        const res = await fetch(
          `https://geocode.xyz/${lat},${lng}?json=1&auth=[851337967485696198431x121829]`
        );

        const data = await res.json();

        const wetRes = await fetch(
          `https://goweather.herokuapp.com/weather/${data.city}`
        );
        const wetData = await wetRes.json();
        console.log(wetData);
        document.querySelector(".temp").innerHTML = wetData.temperature;

        // weather & rain check
     

        if (wetData.description.includes("rain")) {

          document.querySelector(".rain").style.display = "block";

        } else if (Number.parseFloat(wetData.temperature) < 25) {

          document.querySelector(".cold").style.display = "block";

        } else if (Number.parseFloat(wetData.temperature) >= 25) {

          document.querySelector(".hot").style.display = "block";
        }
        // document.querySelector('.fetching').classList.add('hidden')
        document.querySelector('.anim').style.opacity = 1;
      
      })();
    },
    function () {
      alert("Could not get your location!");
    }
  );

  // distance And time
}
 
