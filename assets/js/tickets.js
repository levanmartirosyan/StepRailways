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

  function getDataFromStorage() {
    const storageData = sessionStorage.getItem("trainInfo");
    if (storageData) {
      const data = JSON.parse(storageData);
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
});
