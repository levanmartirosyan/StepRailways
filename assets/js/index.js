function deleteData() {
  const storageData = sessionStorage.removeItem("trainData");
}
deleteData();

document.addEventListener("DOMContentLoaded", () => {
  let dropDownMenuFrom = document.getElementById("dropDownMenuFrom");
  let dropDownOneFrom = document.getElementById("dropDownOneFrom");
  let dropDownOneTextFrom = document.getElementById("dropDownOneTextFrom");
  let chevronIconFrom = document.getElementById("chevronIconFrom");
  let dropContentOne = document.getElementById("dropContentOne");

  let dropDownMenuTo = document.getElementById("dropDownMenuTo");
  let dropDownOneTo = document.getElementById("dropDownOneTo");
  let dropDownOneTextTo = document.getElementById("dropDownOneTextTo");
  let chevronIconTo = document.getElementById("chevronIconTo");
  let dropContentTwo = document.getElementById("dropContentTwo");

  let loader = document.getElementById("loader");
  let loaderOverlay = document.getElementById("loaderOverlay");

  let departuresFrom;
  let departuresTo;

  function getStations() {
    loader.classList.add("active");
    loaderOverlay.classList.add("active");

    fetch("https://railway.stepprojects.ge/api/stations")
      .then((res) => res.json())
      .then((data) => {
        dropContentOne.innerHTML = "";
        dropContentTwo.innerHTML = "";

        data.forEach((item) => {
          let stationItemFrom = document.createElement("span");
          stationItemFrom.classList.add("dropListItem");
          stationItemFrom.textContent = item.name;
          stationItemFrom.addEventListener("click", (e) => {
            e.stopPropagation();
            dropDownOneTextFrom.innerText = item.name;
            dropDownMenuFrom.classList.remove("active");
            chevronIconFrom.classList.remove("active");
            departuresFrom = item.name;
          });
          dropContentOne.appendChild(stationItemFrom);

          let stationItemTo = document.createElement("span");
          stationItemTo.classList.add("dropListItem");
          stationItemTo.textContent = item.name;
          stationItemTo.addEventListener("click", (e) => {
            e.stopPropagation();
            dropDownOneTextTo.innerText = item.name;
            dropDownMenuTo.classList.remove("active");
            chevronIconTo.classList.remove("active");
            departuresTo = item.name;
          });
          dropContentTwo.appendChild(stationItemTo);
        });
        loader.classList.remove("active");
        loaderOverlay.classList.remove("active");
      })
      .catch((error) => {
        loader.classList.remove("active");
        loaderOverlay.classList.remove("active");
      });
  }

  getStations();

  dropDownOneFrom.addEventListener("click", () => {
    dropDownMenuFrom.classList.toggle("active");
    chevronIconFrom.classList.toggle("active");

    dropDownMenuTo.classList.remove("active");
    chevronIconTo.classList.remove("active");
  });

  dropDownOneTo.addEventListener("click", () => {
    dropDownMenuTo.classList.toggle("active");
    chevronIconTo.classList.toggle("active");

    dropDownMenuFrom.classList.remove("active");
    chevronIconFrom.classList.remove("active");
  });

  let date = document.getElementById("date");
  let passangerAmount = document.getElementById("passangerAmount");

  function getAllDepartures(e) {
    e.preventDefault();
    if (departuresFrom && departuresTo && date.value && passangerAmount.value) {
      const body = {
        from: departuresFrom,
        to: departuresTo,
        date: date.value,
        passanger: passangerAmount.value,
      };
      sessionStorage.setItem("trainData", JSON.stringify(body));
      window.location.href = "trainList.html";
    } else {
      alert("Please fill in all fields.");
    }
  }

  let formBtn = document.getElementById("formBtn");
  formBtn.addEventListener("click", getAllDepartures);
});
