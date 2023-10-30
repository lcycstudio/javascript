Promise.resolve("done")
  .then((val) => {
    throw new Error("fail");
  })
  .then((val) => console.log(val))
  .catch((err) => console.error(err))
  .finally((_) => console.log("Cleaning Up"));
