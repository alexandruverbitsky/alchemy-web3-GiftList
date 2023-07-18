const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // create the merkle tree for the whole nice list
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot();

  // Find the name argument from the command line
  const nameFlag = "--name=";
  const nameArgument = process.argv.find((arg) => arg.startsWith(nameFlag));

  // Extract the name from the argument or use the default name
  const name = nameArgument
    ? nameArgument.slice(nameFlag.length)
    : "Norman Block";

  // find the proof that norman block is in the list
  const index = niceList.findIndex((n) => n === name);
  // console.log(index)
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof,
    name,
  });

  console.log(`${name} => ${ gift }`);
}

main();