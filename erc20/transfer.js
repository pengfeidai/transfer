const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

const symbol = 'USDT';

// ERC20合约地址
const tokenAddress = {
  [symbol]: '0x55d398326f99059fF775485246999027B3197955'
};
const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org');

// TODO: 更改地址私钥
const walletPrivateKey = '';
const wallet = new ethers.Wallet(walletPrivateKey, provider);

const erc20Abi = ['function transfer(address recipient, uint256 amount) public returns (bool)'];
const tokenContract = new ethers.Contract(tokenAddress[symbol], erc20Abi, wallet);

async function getAddresses() {
  const walletStr = await fs.readFileSync(path.resolve(__dirname, './to-list.json'), 'utf8');
  return JSON.parse(walletStr);
}

async function transferToken() {
  const addresses = await getAddresses();

  const hashes = [];
  for (const { address, amount } of addresses) {
    const value = ethers.utils.parseUnits(amount.toFixed(2), 18);
    console.log('Transfer to: ', address, 'value:', value.toString());

    // 预测gas费用
    const estimateGas = await tokenContract.estimateGas.transfer(address, value);
    console.log('Estimate gas: ', estimateGas.toString());
    
    // 为了避免交易失败, 你可以选择增加一些额外的 gas
    const gasLimit = estimateGas.add(ethers.BigNumber.from("10000"));

    const tx = await tokenContract.transfer(address, value, { gasLimit: gasLimit });
    console.log('Transaction hash: ', tx.hash, address);
    const receipt = await tx.wait();
    if (receipt.status !== 1) {
      console.log('Transaction receipt fail: ', receipt, 'address:', address);
    }
    hashes.push({  to: address, hash: tx.hash });
  }
  fs.writeFileSync(path.resolve(__dirname, './hashes.json'), JSON.stringify(hashes, null, 2));
}

transferToken();
