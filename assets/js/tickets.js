function checkData() {
  const storageData = sessionStorage.getItem("trainInfo");
  if (!storageData) {
    window.location.href = "index.html";
  }
}
checkData();

document.addEventListener("DOMContentLoaded", () => {
  let trainInfoId = document.getElementById("trainInfoId");
  let trainInfodep = document.getElementById("trainInfodep");
  let trainInfoarr = document.getElementById("trainInfoarr");

  let passengerInfo = document.getElementById("passengerInfo");
  let closeMenu = document.getElementById("closeMenu");
  let seatsMenu = document.getElementById("seatsMenu");
  let overlay = document.getElementById("overlay");

  let vagonsData;

  function getDataFromStorage() {
    const storageData = sessionStorage.getItem("trainInfo");
    if (storageData) {
      const data = JSON.parse(storageData);
      vagonsData = data;
      console.log(data);

      trainInfoId.innerHTML = "";
      trainInfoId.innerHTML = `
          <p>#${data.number}</p>
          <p>${data.name} Express</p>
          `;

      trainInfodep.innerHTML = "";
      trainInfodep.innerHTML = `
          <p>${data.departure}</p>
          <p>${data.from}</p>
          `;

      trainInfoarr.innerHTML = "";
      trainInfoarr.innerHTML = `
          <p>${data.arrive}</p>
          <p>${data.to}</p>
          `;
    }
  }
  getDataFromStorage();

  function getTrainFromStorage() {
    const storageData = sessionStorage.getItem("trainData");
    if (storageData) {
      const data = JSON.parse(storageData);
      console.log(data);
      passengerInfo.innerHTML = "";

      for (let i = 1; i <= data.passanger; i++) {
        passengerInfo.innerHTML += `
          <div class="passenger">
            <h4>მგზავრი <span>${i}</span></h4>
            <div class="fields">
              <div class="seat">
                <p>ადგილი: <span class="seatNumber">0</span></p>
              </div>
              <form>
                <input type="text" required placeholder="სახელი" />
                <input type="text" required placeholder="გვარი" />
                <input type="number" required placeholder="პირადი ნომერი" />
              </form>
              <button class="openSeatsMenu" data-index="${
                i - 1
              }">ადგილის არჩევა</button>
            </div>
          </div>
        `;
      }

      document.querySelectorAll(".openSeatsMenu").forEach((btn) => {
        btn.addEventListener("click", (event) => {
          seatsMenu.classList.add("active");
          overlay.classList.add("active");

          selectedPassengerIndex = event.target.getAttribute("data-index");
        });
      });
    }
  }

  getTrainFromStorage();

  let firstClass = document.getElementById("firstClass");
  let secondClass = document.getElementById("secondClass");
  let businessClass = document.getElementById("businessClass");

  let chooseVagon = document.getElementById("chooseVagon");

  let seats = document.querySelector(".seats");

  closeMenu.addEventListener("click", () => {
    seatsMenu.classList.remove("active");
    overlay.classList.remove("active");
    chooseVagon.innerText = "აირჩიეთ ვაგონი";
    seats.style.display = "none";
  });

  overlay.addEventListener("click", () => {
    seatsMenu.classList.remove("active");
    overlay.classList.remove("active");
    chooseVagon.innerText = "აირჩიეთ ვაგონი";
    seats.style.display = "none";
  });

  firstClass.addEventListener("click", () => {
    firstClass.classList.add("active");

    secondClass.classList.remove("active");
    businessClass.classList.remove("active");
    chooseVagon.innerText = "ვაგონის ნომერი: 1";
    seats.style.display = "grid";

    const sortedSeats = vagonsData.vagons[1].seats.sort((a, b) => {
      let numA = parseInt(a.number);
      let numB = parseInt(b.number);
      let letterA = a.number.replace(numA, "");
      let letterB = b.number.replace(numB, "");

      if (numA === numB) {
        return letterA.localeCompare(letterB);
      }
      return numA - numB;
    });

    const seatsNumbers = sortedSeats
      .map(
        (seat) =>
          `<button class="seat-option" style="background-color: ${
            seat.isOccupied ? "rgb(224, 3, 3)" : "rgb(2, 180, 2)"
          }">${seat.number}</button>`
      )
      .join("");

    seats.innerHTML = "";
    seats.innerHTML += seatsNumbers;

    document.querySelectorAll(".seat-option").forEach((btn, index) => {
      if (vagonsData.vagons[1].seats[index].isOccupied) {
        btn.disabled = true;
      }
    });

    addSeatSelectionListeners();
  });

  secondClass.addEventListener("click", () => {
    secondClass.classList.add("active");

    firstClass.classList.remove("active");
    businessClass.classList.remove("active");
    chooseVagon.innerText = "ვაგონის ნომერი: 2";
    seats.style.display = "grid";

    const sortedSeats = vagonsData.vagons[0].seats.sort((a, b) => {
      let numA = parseInt(a.number);
      let numB = parseInt(b.number);
      let letterA = a.number.replace(numA, "");
      let letterB = b.number.replace(numB, "");

      if (numA === numB) {
        return letterA.localeCompare(letterB);
      }
      return numA - numB;
    });

    const seatsNumbers = sortedSeats
      .map(
        (seat) =>
          `<button class="seat-option" style="background-color: ${
            seat.isOccupied ? "rgb(224, 3, 3)" : "rgb(2, 180, 2)"
          }">${seat.number}</button>`
      )
      .join("");

    seats.innerHTML = "";
    seats.innerHTML += seatsNumbers;

    document.querySelectorAll(".seat-option").forEach((btn, index) => {
      if (vagonsData.vagons[0].seats[index].isOccupied) {
        btn.disabled = true;
      }
    });

    addSeatSelectionListeners();
  });

  businessClass.addEventListener("click", () => {
    businessClass.classList.add("active");

    firstClass.classList.remove("active");
    secondClass.classList.remove("active");
    chooseVagon.innerText = "ვაგონის ნომერი: 3";
    seats.style.display = "grid";

    const sortedSeats = vagonsData.vagons[2].seats.sort((a, b) => {
      let numA = parseInt(a.number);
      let numB = parseInt(b.number);
      let letterA = a.number.replace(numA, "");
      let letterB = b.number.replace(numB, "");

      if (numA === numB) {
        return letterA.localeCompare(letterB);
      }
      return numA - numB;
    });

    const seatsNumbers = sortedSeats
      .map(
        (seat) =>
          `<button class="seat-option" style="background-color: ${
            seat.isOccupied ? "rgb(224, 3, 3)" : "rgb(2, 180, 2)"
          }">${seat.number}</button>`
      )
      .join("");

    seats.innerHTML = "";
    seats.innerHTML += seatsNumbers;

    document.querySelectorAll(".seat-option").forEach((btn, index) => {
      if (vagonsData.vagons[2].seats[index].isOccupied) {
        btn.disabled = true;
      }
    });

    addSeatSelectionListeners();
  });
});

let selectedPassengerIndex = null;

function addSeatSelectionListeners() {
  document.querySelectorAll(".seat-option").forEach((item) => {
    item.addEventListener("click", () => {
      const selectedSeatNumber = item.innerText;
      if (selectedPassengerIndex !== null) {
        document.querySelectorAll(".seatNumber")[
          selectedPassengerIndex
        ].innerText = selectedSeatNumber;
        item.classList.toggle("active");
      }
    });
  });
}
