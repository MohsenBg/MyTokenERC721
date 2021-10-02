let CP;
const assert = require("assert");
const Color = artifacts.require("Color");

contract("Color", accounts => {

  before(async () => {
    CP = await Color.deployed();
  })

  //*Check contract successFully deployed
  it("deployed", async () => {
    const address = CP.address;
    assert.notStrictEqual(address, "0x0000000000000000000000000000000000000000",`contract address is ${address}`);
    assert.notStrictEqual(address, undefined,`contract address is ${address}`);
    assert.notStrictEqual(address, null,`contract address is ${address}`);
    assert.notStrictEqual(address, "",`contract address is ${address}`);
    assert.notStrictEqual(address, 0x0,`contract address is ${address}`);
  });
  it("check main state",async()=>{
    const tokenName = await CP.name();
    assert.strictEqual(tokenName,"Color Picker","check tokenName");
    const tokenSymbol = await CP.symbol();
    assert.strictEqual(tokenSymbol,"CP","check tokenSymbol");
  
  })

  
});
