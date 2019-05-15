const fs = require(`fs-extra`);

const oldBuildLocation = `${__dirname}/web/build`;
const newBuildLocation = `${__dirname}/server/build`;

async function move() {
  await fs.move(oldBuildLocation, newBuildLocation);
}

async function remove() {
  await fs.remove(newBuildLocation);
}

async function main() {
  await remove();
  await move();
  console.log(`Server is ready to be uploaded!`);
}

main();
