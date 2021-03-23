const buttonkkl = document.querySelector("#confirminput");
const kminput = document.querySelector("#distanceinput");
const confirm = document.querySelector("#conf");

buttonkkl.addEventListener("click", async (e) => {
  e.preventDefault();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const dis = parseInt(kminput.value);

  var raw = JSON.stringify({
    distance: dis,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("/runs", requestOptions)
    .then((result) => {
      if (result.status != 200)
        return (confirm.textContent =
          "Das hinzufügen des Laufes ist fehlgeschlagen ");
      kminput.value = 0;
      return (confirm.textContent = "Du hast einen Lauf hinzugefügt");
    })
    .catch(
      (error) =>
        (confirm.textContent = "Das hinzufügen des Laufes ist fehlgeschlagen ")
    );
});

//TODO: Rechtschreibfehler
