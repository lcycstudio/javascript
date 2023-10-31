const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const fileIterator = (files) => ({
  [Symbol.asyncIterator]: () => ({
    x: 0,
    next() {
      if (this.x > 2) {
        return Promise.resolve({
          done: true,
          value: this.x,
        });
      }

      return readFile(files[this.x], "utf8").then((value) => {
        return {
          done: false,
          value: value,
        };
      });
    },
  }),
});

(async () => {
  for await (let x of fileIterator([
    "./demofile.txt",
    "./demofile.other.txt",
  ])) {
    console.log(x);
  }
})();