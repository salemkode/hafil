export default {
  fetch() {
    return new Response("This website is no longer available.", {
      status: 410,
      headers: {
        "content-type": "text/plain; charset=UTF-8",
        "cache-control": "no-store"
      }
    });
  }
};
