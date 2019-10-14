console.log(self);
self.addEventListener("message", event => {
  console.log(event);
  console.log(event.data);
});
