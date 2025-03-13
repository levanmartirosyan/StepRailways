function checkData() {
  const storageData = sessionStorage.getItem("trainData");
  if (!storageData) {
    window.location.href = "index.html";
  }
}
checkData();

document.addEventListener("DOMContentLoaded", () => {
  let trainList = document.getElementById("trainList");

  let loader = document.getElementById("loader");
  let loaderOverlay = document.getElementById("loaderOverlay");

  function getAllDepartures() {
    loader.classList.add("active");
    loaderOverlay.classList.add("active");

    const storageData = JSON.parse(sessionStorage.getItem("trainData"));
    if (storageData) {
      fetch(
        `https://railway.stepprojects.ge/api/getdeparture?from=${storageData.from}&to=${storageData.to}&date=${storageData.date}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          trainList.innerHTML = "";
          data[0].trains.forEach((item) => {
            trainList.innerHTML += `
                          <tr>
                <th>
                  <p>#${item.number}</p>
                  <p>${item.name} Express</p>
                </th>
                <th>
                  <p>${item.departure}</p>
                  <p>${item.from}</p>
                </th>
                <th>
                  <p>${item.arrive}</p>
                  <p>${item.to}</p>
                </th>
                <th><button onclick='goToDetails(${JSON.stringify(
                  item
                )})'>დაჯავშნა</button></th>
              </tr>
            `;
          });

          loader.classList.remove("active");
          loaderOverlay.classList.remove("active");
        })
        .catch((error) => {
          loader.classList.remove("active");
          loaderOverlay.classList.remove("active");
        });
    }
  }
  getAllDepartures();
});

function goToDetails(data) {
  sessionStorage.setItem("trainInfo", JSON.stringify(data));
  window.location.href = "buyTickets.html";
  console.log(data);
}
