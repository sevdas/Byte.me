const input = document.getElementById("url-input"),
  button = document.getElementById("shorten-button"),
  out = document.getElementById("out");

input.focus();

async function shortenUrl(href) {
  const shortUrl = (
    await (
      await fetch("/api/shortened", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ href }),
      })
    ).json()
  ).shortUrl;

  return shortUrl;
}

button.addEventListener("click", async (event) => {
  event.preventDefault();
  const link = `${location.origin}/${await shortenUrl(input.value)}`;
  out.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
});
