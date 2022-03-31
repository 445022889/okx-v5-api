[![npm install node-Okx-api](https://nodei.co/npm/okx-api-v5.png?mini=true)](https://npmjs.org/package/okx-api-v5)

[![npm package](https://img.shields.io/npm/v/okx-api-v5.svg?style=flat-square)](https://www.npmjs.org/package/okx-api-v5)
[![NPM downloads](http://img.shields.io/npm/dm/okx-api-v5.svg?style=flat-square)](http://www.npmtrends.com/okx-api-v5)
![GitHub license](https://img.shields.io/github/license/445022889/okx-v5-api-nodejs?style=flat)
![GitHub stars](https://img.shields.io/github/stars/445022889/okx-v5-api-nodejs?color=fa6470&style=flat)
![GitHub forks](https://img.shields.io/github/forks/445022889/okx-v5-api-nodejs?style=flat)

#### 引入使用

```javascript
const API = require("okx-api-v5")
```

#### 正常使用

```javascript

const api = new API({
    api_key: "<key>",
    secret_key: "<secret>",
    pass_phrase: "<pass>"
})
```

#### 加入代理

```javascript
const proxy = {
    host: '127.0.0.1',
    port: 7890
}
const api = new API({
    api_key: "<key>",
    secret_key: "<secret>",
    pass_phrase: "<pass>",
    proxy_setting: proxy
})
```

# 已添加的API列表

## 公共数据

### 获取交易产品基础信息

#### GET /api/v5/public/instruments

```javascript
console.info(await api.get_api_v5_public_instruments({instType: "", uly: "", instId: ""}));
```

### 获取交割和行权记录

#### GET /api/v5/public/delivery-exercise-history

```javascript
console.info(await api.get_api_v5_public_deliveryExerciseHistory({
    instType: "",
    uly: "",
    after: "",
    before: "",
    limit: ""
}));
```

### 获取持仓总量

#### GET /api/v5/public/open-interest

```javascript
console.info(await api.get_api_v5_public_openInterest({instType: "", uly: "", instId: ""}));
```

### 获取永续合约当前资金费率

#### GET /api/v5/public/funding-rate

```javascript
console.info(await api.get_api_v5_public_fundingRate({instId: ""}));
```

### 获取永续合约历史资金费率

#### GET /api/v5/public/funding-rate-history

```javascript
console.info(await api.get_api_v5_public_fundingRateHistory({instId: "", before: "", after: "", limit: ""}));
```

### 获取限价

#### GET /api/v5/public/limit-price

```javascript
console.info(await api.get_api_v5_public_limitPrice({instId: ""}));
```

### 获取期权定价

#### GET /api/v5/public/opt-summary

```javascript
console.info(await api.get_api_v5_public_optSummary({uly: "", expTime: ""}));
```

### 获取预估交割/行权价格

#### GET /api/v5/public/estimated-price

```javascript
console.info(await api.get_api_v5_public_estimatedPrice({instId: ""}));
```

### 获取免息额度和币种折算率等级

#### GET /api/v5/public/discount-rate-interest-free-quota

```javascript
console.info(await api.get_api_v5_public_discountRateInterestFreeQuota({discountLv: ""}));
```

### 获取系统时间

#### GET /api/v5/public/time

```javascript
console.info(await api.get_api_v5_public_time({}));
```

### 获取平台公共爆仓单信息

#### GET /api/v5/public/liquidation-orders

```javascript
console.info(await api.get_api_v5_public_liquidationOrders({
    instType: "",
    mgnMode: "",
    instId: "",
    ccy: "",
    uly: "",
    alias: "",
    state: "",
    before: "",
    after: "",
    limit: ""
}));
```

### 获取标记价格

#### GET /api/v5/public/mark-price

```javascript
console.info(await api.get_api_v5_public_markPrice({instType: "", instId: "", uly: ""}));
```

### 获取衍生品仓位档位

#### GET /api/v5/public/position-tiers

```javascript
console.info(await api.get_api_v5_public_positionTiers({instType: "", instId: "", uly: ""}));
```

### 获取市场借币杠杆利率和借币限额

#### GET /api/v5/public/interest-rate-loan-quota

```javascript
console.info(await api.get_api_v5_public_interestRateLoanQuota({
    instType: "",
    tdMode: "",
    instId: "",
    uly: "",
    tier: ""
}));
```

### 获取尊享借币杠杆利率和借币限额

#### GET /api/v5/public/vip-interest-rate-loan-quota

```javascript
console.info(await api.get_api_v5_public_vipInterestRateLoanQuota({}));
```

### 获取衍生品标的指数

#### GET /api/v5/public/underlying

```javascript
console.info(await api.get_api_v5_public_underlying({}));
```

### 获取风险准备金余额

#### GET /api/v5/public/insurance-fund

```javascript
console.info(await api.get_api_v5_public_insuranceFund({instType: ""}));
```
