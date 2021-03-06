const emaild = document.querySelector("#login");
const pwdd = document.querySelector("#password");
const ad = document.querySelector("form");
const val = document.querySelector("#INFO");

ad.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emaild.value;
  const pwd = pwdd.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    nickname: email,
    password: pwd,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("/users/login", requestOptions)
    .then((response) => response.text())
    .then((content) => {
      if (!content) return;
      window.location.assign("/me");
    })

    .catch((error) => console.log(error));
});
