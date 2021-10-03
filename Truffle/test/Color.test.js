const Color = artifacts.require("Color");
const assert = require("assert");
const truffleAssertions = require("truffle-assertions");
contract("Color", (accounts) => {
  before(async () => {
    this.color = await Color.deployed();
  });

  //*Check contract successFully deployed
  it("deployed", async () => {
    const address = this.color.address;
    assert.notStrictEqual(
      address,
      "0x0000000000000000000000000000000000000000",
      `contract address is ${address}`
    );
    assert.notStrictEqual(address, undefined, `contract address is ${address}`);
    assert.notStrictEqual(address, null, `contract address is ${address}`);
    assert.notStrictEqual(address, "", `contract address is ${address}`);
    assert.notStrictEqual(address, 0x0, `contract address is ${address}`);
  });

   //*Check main state
  it("check main state", async () => {
    const tokenName = await this.color.name();
    assert.strictEqual(tokenName, "Color Picker", "check tokenName");
    
    const tokenSymbol = await this.color.symbol();
    assert.strictEqual(tokenSymbol, "CP", "check tokenSymbol");
  });

    //*Check mint function
  it("mint", async () => {
    const result = await this.color.mint("#FFFFFF");
    await result;

    let color = await this.color.colors(0);
    assert.strictEqual(color, "#FFFFFF");

    colorExists = await this.color._colorExists("#FFFFFF");
    assert.strictEqual(colorExists, true);

    //!revert
    await truffleAssertions.reverts(this.color.mint("#FFFFFF"));

    //!event
    const event = await result.logs[0].args;
    assert.strictEqual(result.logs.length, 1, "count events");
    assert.strictEqual(event.tokenId.toNumber(), 1, "tokenId");
    assert.strictEqual(
      event.from,
      "0x0000000000000000000000000000000000000000",
      "from"
    );
    assert.strictEqual(event.to, accounts[0], "to");
  });

it("list colors", async()=>{
 
 await this.color.mint("#000000");
 await this.color.mint("#fec104");
 await this.color.mint("#040b25");
  const totalSupply = await this.color.totalSupply()
  let colors = [] 
for(let i = 0;i < totalSupply.toNumber(); i++){
  const color = await this.color.colors(i) 
  colors.push(color)
 }
assert.strictEqual(colors.length,4,"count color");
assert.strictEqual(colors[0],"#FFFFFF",'first color');
assert.strictEqual(colors[1],"#000000",'second color');
assert.strictEqual(colors[2],"#fec104","Third color");
assert.strictEqual(colors[3],"#040b25","Fourth color");

})
});
