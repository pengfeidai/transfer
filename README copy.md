## 安装依赖
```
npm install
```

## BNB转账步骤
1. 可以修改bsc目录下面 bnbAddress.xlsx 的to地址列表。
2. 执行脚本，生成to-list.json 列表，如果源数据本身就是json格式，就不用执行excel转json的脚本。
```
node bsc/read_excel.js
```
3. 执行转账脚本
```
node bsc/transfer.js
```
4. 转账脚本跑完，会在bsc目录生成一个hashes.json文件，是所有转账的列表，可以用于校验。（也可以直接根据from地址到浏览器查询）


## ERC20转账步骤
1. 可以修改bsc目录下面 usdtAddress.xlsx 的to地址列表。
2. 执行脚本，生成to-list.json 列表，如果源数据本身就是json格式，就不用执行excel转json的脚本。
```
node erc20/read_excel.js
```
3. 执行转账脚本
```
node bsc/transfer.js
```