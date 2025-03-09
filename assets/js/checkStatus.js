document.addEventListener("DOMContentLoaded", () => {
  let loader = document.getElementById("loader");
  let loaderOverlay = document.getElementById("loaderOverlay");

  let idInput = document.getElementById("idInput");

  let ticketData = document.getElementById("ticketData");

  function checkStatus(e) {
    e.preventDefault();

    loader.classList.add("active");
    loaderOverlay.classList.add("active");

    const id = idInput.value;
    const now = `${
      new Date().getMonth() + 1
    }/${new Date().getDate()}/${new Date().getFullYear()}`;

    fetch(`https://railway.stepprojects.ge/api/tickets/checkstatus/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        ticketData.classList.add("active");

        ticketData.innerHTML = `
            <div class="top">
              <div class="checkMark" style="background-color:  ${
                data.persons.some((item) => item.payoutCompleted)
                  ? "#06bd3d"
                  : "red"
              };">
                <i class="${
                  data.persons.some((item) => item.payoutCompleted)
                    ? "fas fa-check"
                    : "fa-solid fa-xmark"
                }"></i>
              </div>
              <p> ${
                data.persons.some((item) => item.payoutCompleted)
                  ? "ბილეთის საფასური გადახდილია, იხილეთ ბილეთი:"
                  : "ბილეთის საფასური არ არის გადახდილი, იხილეთ ბილეთი:"
              }</p>
            </div>
            <div class="mainContent">
              <div class="head">
                <p>Step Railway</p>
                <img src="./assets/images/stepLogo.jpg" alt="Step Logo" />
              </div>
              <div class="body">
                <div class="ticketIds">
                  <p>ბილეთის ნომერი: <span>${data.id}</span></p>
                  <p>გაცემის თარიღი: <span>${now}</span></p>
                </div>
                <div class="tripInfo">
                  <p>გამგზავრება: <span>${data.train.from} ${
          data.train.departure
        }-ზე</span></p>
                  <p>ჩასვლა: <span>${data.train.to} ${
          data.train.arrive
        }-ზე</span></p>
                  <p>გასვლის თარიღი: <span>${data.train.date}, ${
          data.date
        }</span></p>
                </div>
                <div class="contactInfo">
                  <h4>საკონტაქტო ინფორმაცია:</h4>
                  <div>
                    <p>ელ.ფოსტა: <span>${data.email}</span></p>
                    <p>ტელ. ნომერი: <span>${data.phone}</span></p>
                  </div>
                </div>
                <div class="persons" id="personsList">
                  <h4>მგზავრები:</h4>

                </div>
                <div class="sum">
                  <div class="sumPrice">
                    <p>სულ: <span>${data.ticketPrice}</span>₾</p>
                  </div>
                </div>
                <div class="warnings">
                  <p>
                    <i
                      >ინვოისი იქმნება კომპიუტერის მიერ და ვალიდურია ბეჭედის და
                      ხელმოწერის გარეშე
                    </i>
                  </p>
                  <p>
                    <i
                      >გადმოწერეთ ბილეთი ან შეინახეთ ბილეთის ნომერი ადგილზე
                      წარსადგენად.
                    </i>
                  </p>
                </div>
                <div class="btn">
                  <button id="deleteBtn">ბილეთის გაუქმება</button>
                </div>
              </div>
            </div>
            `;

        let personsList = document.getElementById("personsList");

        personsList.innerHTML = "";

        data.persons.forEach((item) => {
          personsList.innerHTML += `
               <div>
            <p>სახელი: <span>${item.name}</span></p>
            <p>გვარი: <span>${item.surname}</span></p>
            <p>პირადი ნომერი: <span>${item.idNumber}</span></p>
            <p>ადგილი: <span>${item.seat.number}</span></p>
          </div>
                `;
        });

        let deleteBtn = document.getElementById("deleteBtn");

        deleteBtn.addEventListener("click", () => {
          deleteTicket(data.id);
        });

        loader.classList.remove("active");
        loaderOverlay.classList.remove("active");
      })
      .catch((error) => {
        alert("ბილეთი არ არსებობს ან არასწორი ბილეთის ნომერი!");
        loader.classList.remove("active");
        loaderOverlay.classList.remove("active");
        ticketData.classList.remove("active");
      });
  }

  function deleteTicket(id) {
    loader.classList.add("active");
    loaderOverlay.classList.add("active");
    fetch(`https://railway.stepprojects.ge/api/tickets/cancel/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert(data);
        loader.classList.remove("active");
        loaderOverlay.classList.remove("active");
        ticketData.classList.remove("active");
      })
      .catch((error) => {
        alert(error);
        loader.classList.remove("active");
        loaderOverlay.classList.remove("active");
        ticketData.classList.remove("active");
      });
  }

  let formBtn = document.getElementById("formBtn");
  formBtn.addEventListener("click", checkStatus);
});
