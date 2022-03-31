[![npm install node-Okx-api](https://nodei.co/npm/okx-api-v5.png?mini=true)](https://npmjs.org/package/okx-api-v5)

[![npm package](https://img.shields.io/npm/v/okx-api-v5.svg?style=flat-square)](https://www.npmjs.org/package/okx-api-v5)
[![NPM downloads](http://img.shields.io/npm/dm/okx-api-v5.svg?style=flat-square)](http://www.npmtrends.com/okx-api-v5)
![GitHub license](https://img.shields.io/github/license/445022889/okx-v5-api-nodejs?style=flat)
![GitHub stars](https://img.shields.io/github/stars/445022889/okx-v5-api-nodejs?color=fa6470&style=flat)
![GitHub forks](https://img.shields.io/github/forks/445022889/okx-v5-api-nodejs?style=flat)
![Last Commit](https://badgen.net/github/last-commit/445022889/okx-v5-api-nodejs?scale=2&label=🟣%20Updated&labelColor=black&color=448AFF&cache=9999)
#### 完成情况

- [ ] 交易
- [ ] 资金
- [ ] 闪兑
- [ ] 账户
- [ ] 子账户
- [ ] 行情数据
- [x] 公共数据
- [x] 交易大数据
- [x] Status

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

## 交易大数据

### 获取交易大数据支持币种

#### GET /api/v5/rubik/stat/trading-data/support-coin

```javascript
console.info(await api.get_api_v5_rubik_stat_tradingData_supportCoin({}));
```

### 获取主动买入/卖出情况

#### GET /api/v5/rubik/stat/taker-volume

```javascript
console.info(await api.get_api_v5_rubik_stat_takerVolume({ccy: "", instType: "", begin: "", end: "", period: ""}));
```

### 获取杠杆多空比

#### GET /api/v5/rubik/stat/margin/loan-ratio

```javascript
console.info(await api.get_api_v5_rubik_stat_margin_loanRatio({ccy: "", begin: "", end: "", period: ""}));
```

### 获取合约多空持仓人数比

#### GET /api/v5/rubik/stat/contracts/long-short-account-ratio

```javascript
console.info(await api.get_api_v5_rubik_stat_contracts_longShortAccountRatio({
    ccy: "",
    begin: "",
    end: "",
    period: ""
}));
```

### 获取合约持仓量及交易量

#### GET /api/v5/rubik/stat/contracts/open-interest-volume

```javascript
console.info(await api.get_api_v5_rubik_stat_contracts_openInterestVolume({ccy: "", begin: "", end: "", period: ""}));
```

### 看涨/看跌期权合约 持仓总量比/交易总量比

#### GET /api/v5/rubik/stat/option/open-interest-volume-ratio

```javascript
console.info(await api.get_api_v5_rubik_stat_option_openInterestVolumeRate({ccy: "", period: ""}));
```

### 看涨看跌持仓总量及交易总量（按到期日分）

#### GET /api/v5/rubik/stat/option/open-interest-volume-expiry

```javascript
console.info(await api.get_api_v5_rubik_stat_option_openInterestVolumeExpiry({ccy: "", period: ""}));
```

### 看涨看跌持仓总量及交易总量（按执行价格分）

#### GET /api/v5/rubik/stat/option/open-interest-volume-strike

```javascript
console.info(await api.get_api_v5_rubik_stat_option_openInterestVolumeStrike({ccy: "", expTime: "", period: ""}));
```

### 看跌/看涨期权合约 主动买入/卖出量

#### GET /api/v5/rubik/stat/option/taker-block-volume

```javascript
console.info(await api.get_api_v5_rubik_stat_option_takerBlockVolume({ccy: "", period: ""}));
```

## Status

### Status

#### GET /api/v5/system/status

```javascript
console.info(await api.get_api_v5_system_status({}));
```