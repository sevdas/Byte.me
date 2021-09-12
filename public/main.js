const input = document.getElementById("url-input"),
  button = document.getElementById("shorten-button"),
  out = document.getElementById("out");

input.focus();

console.log("TEST");

async function shortenUrl(href) {
  const shortid = (
    await (
      await fetch("/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ href }),
      })
    ).json()
  ).shortid;

  return shortid;
}

button.addEventListener("click", async () => {
  const link = `${location.origin}/l/${await shortenUrl(input.value)}`;
  out.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
});
