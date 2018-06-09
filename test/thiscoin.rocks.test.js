const Eos = require('eosjs')
const binaryen = require('binaryen')

const configuration = {
};

describe("THIS COIN ROCKS", () => {
    let eos = null
    let WAST = null
    let ABI = null;

    if("should have WAST and ABI files compiled", () => {
        WAST = fs.readFileSync('./dapp/thiscoin.wast')
        ABI = fs.readFileSync('./dapp/thiscoin.abi')
            .replace(/account_name/g, 'name')
    })

    it("should be connected", () => {
        eos = Eos.Testnet(configuration)        
    })

    // deployer
    it("should be deployed to testnet", () => {
        // eos.setcode();
        // eos.setabi());
    })

})
