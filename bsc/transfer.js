const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org');

// TODO: 私钥
const walletPrivateKey = '';
const wallet = new ethers.Wallet(walletPrivateKey, provider);

async function getAddresses() {
  const walletStr = await fs.readFileSync(path.resolve(__dirname, './to-list.json'), 'utf8');
  return JSON.parse(walletStr);
}

async function transferBNB() {
  const addresses = await getAddresses();

  const hashes = [];
  for (const { address, amount } of addresses) {
    const value = ethers.utils.parseEther(amount.toString());
    const nonce = await provider.getTransactionCount(wallet.address);

    const tx = {
      nonce,
      to: address,
      value: value,
      gasPrice: await provider.getGasPrice(),
    };

    // 预估gas
    tx.gasLimit = await wallet.estimateGas(tx);

    try {
      const transactionResponse = await wallet.sendTransaction(tx);

      console.log('to:', address, 'Transaction hash: ', transactionResponse.hash);

      const receipt = await provider.waitForTransaction(transactionResponse.hash);
      if (receipt.status !== 1) {
        console.log('Transaction receipt fail: ', receipt, 'address:', address);
      }
      hashes.push({ hash: transactionResponse.hash, to: address });
    } catch (err) {
      console.log('Error:', err);
    }
  }
  fs.writeFileSync(path.resolve(__dirname, './hashes.json'), JSON.stringify(hashes, null, 2));
}

transferBNB()