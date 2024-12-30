# transfer

A batch transfer script for airdrop

## Requirements
- **Node.js**: Version > 16
- **NPM**: Comes with Node.js

## Install Dependencies
```bash
npm install
```

## transfer bnb
1. 按照样例，替换bsc目录下address.xlsx文件
2. 执行下面脚本，将xlsx文件转成json文件，此时目录下会生成一个to-list.json
```bash
node bsc/read_excel.js
```
3. 更新 transfer.js文件中配置
- 第5行：默认是bsc主网，修改成对应兼容evm的链rpc
- 第8行：填入转出账号的私钥。
4. 执行转账
```bash
node bsc/transfer.js
```

## transfer erc20

1. 按照样例，替换erc20目录下address.xlsx文件
2. 执行下面脚本，将xlsx文件转成json文件，此时目录下会生成一个to-list.json
```bash
node erc20/read_excel.js
```
3. 更新 transfer.js文件中配置
- 第11行：默认是bsc主网，修改成对应兼容evm的链rpc
- 第14行：填入转出账号的私钥。
- 如果是其他的ERC20代币：修改第5行的symbol 和 第9行的合约地址，文件中默认以USDT为例.

4. 执行转账
```bash
node erc20/transfer.js
```