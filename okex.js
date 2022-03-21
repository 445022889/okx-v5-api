/**
 * @Description: OKX.com的V5 API文档，具体可参考https://www.okx.com/docs-v5/zh/继续完善
 * @author Binghe
 * @date 2022/3/21
 */
const axios = require("axios-https-proxy-fix")
const crypto = require('crypto');

const apikey = ""
const secretkey = ""
const passphrase = ""
const rest = "https://www.okx.com/"
const appjson = "application/json"
const proxy = {
    host: '127.0.0.1',
    port: 7890
}
/**
 * 返回当前IOS时间
 * @returns {string}
 */
const timestamp = () => {
    return (new Date()).toISOString()
}

/**
 * 监测是否为空
 * @param obj 待监测的内容
 * @returns {boolean}
 */
const isEmpty = (obj) => {
    return typeof obj === 'undefined' || obj === null || obj === ''
}

/**
 * 签名操作
 * @param {string} str 签名的字符串
 * @returns {string}
 */
const signHttp = (str) => {
    return crypto.createHmac("sha256", secretkey).update(str).digest("base64")
}

/**
 * 清空对象中多余的空值
 * @param {Object} obj 待处理的对象
 * @returns {Object}
 */
const cleanObj = (obj) => {
    Object.keys(obj).forEach(item => {
        if (isEmpty(obj[item])) {
            delete obj[item];
        }
    })
    return obj;
}

/**
 * 简易封装的axios，作为okx.com的访问
 * @description 自动获取来路方法名称
 * @param params GET为url参数，POST为data参数
 * @returns {Object}
 */
const http = (params = {}) => {
    let _ = (new Error()).stack.split("\n")[2].trim().split(" ")[1].split("_")
    let method = _[0].toUpperCase()
    delete _[0]
    let path = _.join("/").replace(/[A-Z]/g, '-$&').toLowerCase()
    let options = Object.assign({
        baseURL: rest,
        url: path, method: method, proxy: proxy
    }, {headers: getHeaders(method, path, params)})
    Object.assign(options, method === "GET" ? {params: params} : {data: params})
    return new Promise((resolve) => {
        axios(options).then(resp => {
            resolve(resp.data)
        }).catch((error) => {
            let msg = error.response.data || error.request || error.message
            resolve(msg)
        });
    })


}

/**
 * 生成头部信息
 * @param {string} method 访问类型，GET/POST
 * @param  {string} path 访问路径
 * @param  {{}} params GET和POST提交的数据
 * @returns {Object}
 */
const getHeaders = (method, path, params = {}) => {
    let _time = timestamp(), _sign
    if (method === "GET") {
        let arr = []
        for (const item of Object.keys(params)) {
            arr.push(item + "=" + params[item])
        }
        _sign = signHttp(_time + method + path + (arr.length ? "?" + arr.join("&") : ""))
    } else {
        _sign = signHttp(_time + method + path + JSON.stringify(params))
    }
    return {
        "Accept": appjson,
        "Content-Type": appjson,
        "OK-ACCESS-KEY": apikey,
        "OK-ACCESS-SIGN": _sign,
        "OK-ACCESS-TIMESTAMP": _time,
        "OK-ACCESS-PASSPHRASE": passphrase
    }
}

/**
 * 获取交易产品基础信息（20次/2s@IP+instType）
 * @description 获取该账户下拥有实际持仓的信息。账户为单向持仓模式会显示净持仓（net），账户为双向持仓模式下会分别返回多头（long）或空头（short）的仓位。
 * @param {string} instType 产品类型 SPOT：币币 MARGIN：币币杠杆 SWAP：永续合约 FUTURES：交割合约 OPTION：期权
 * @param {string} [uly] 标的指数，仅适用于交割/永续/期权，期权必填
 * @param {string} [instId] 产品ID
 * @returns {Object}
 */
async function get_api_v5_public_instruments({instType, uly, instId}) {
    return await http(cleanObj({
        instType: instType,
        uly: uly,
        instId: instId
    }))
}

/**
 * 查看持仓信息（10次/2s@UserID）
 * @description 获取该账户下拥有实际持仓的信息。账户为单向持仓模式会显示净持仓（net），账户为双向持仓模式下会分别返回多头（long）或空头（short）的仓位。
 * @param {string} [instType] 产品类型，MARGIN：币币杠杆，SWAP：永续合约， FUTURES：交割合约，OPTION：期权，instType和instId同时传入的时候会校验instId与instType是否一致，结果返回instId的持仓信息
 * @param {string} [instId] 交易产品ID，如：BTC-USD-190927-5000-C， 支持多个instId查询（不超过10个），半角逗号分隔
 * @param {string} [posId] 持仓ID， 支持多个posId查询（不超过20个），半角逗号分割
 * @returns {Object}
 */

async function get_api_v5_account_positions({instType, instId, posId}) {
    return await http(cleanObj({
        instType: instType,
        instId: instId,
        posId: posId
    }))
}

/**
 * 查看账户余额（10次/2s@UserID）
 * @description 获取账户中资金余额信息。
 * @param {string} ccy 币种，如 BTC,支持多币种查询（不超过20个），币种之间半角逗号分隔，获取账户中BTC、ETH两种资产余额?ccy=BTC,ETH
 * @returns {Object}
 */
async function get_api_v5_account_balance({ccy}) {
    return await http(cleanObj({
        ccy: ccy
    }))
}

/**
 * 查看账户持仓风险（10次/2s@UserID）
 * @description 查看账户整体风险。 获取同一时间切片上的账户和持仓的基础信息
 * @param {string} [instType] 产品类型，MARGIN：币币杠杆，SWAP：永续合约， FUTURES：交割合约，OPTION：期权
 * @returns {Object}
 */
async function get_api_v5_account_accountPositionRisk({instType}) {
    return await http(cleanObj({
        instType: instType
    }))
}

/**
 * 查看账户配置（5次/2s@UserID）
 * @description 查看当前账户的配置信息。
 * @returns {Object}
 */
async function get_api_v5_account_config() {
    return await http()
}

/**
 * 设置持仓模式（5次/2s@UserID）
 * @description 单币种账户和跨币种账户模式：交割和永续合约支持双向持仓模式和单向持仓模式。单向持仓只会有一个方向的仓位；双向持仓可以分别持有多、空2个方向的仓位。组合保证金模式：交割和永续仅支持单向持仓模式
 * @param posMode 持仓方式 long_short_mode：双向持仓 net_mode：单向持仓 仅适用交割/永续
 * @returns {Object}
 */
async function post_api_v5_account_setPositionMode({posMode}) {
    return await http(cleanObj({
        posMode: posMode
    }))
}

/**
 * 设置杠杆倍数（5次/2s@UserID）
 * @description 一个产品可以有如下几种杠杆倍数的设置场景：币币杠杆逐仓杠杆倍数（币对层面）；币币杠杆单币种保证金模式下全仓杠杆倍数（币对层面）；币币杠杆跨币种保证金模式下全仓杠杆倍数（币种层面）； 交割/永续逐仓/全仓杠杆倍数（合约/指数层面）。
 * @param [instId] 产品ID：币对、合约 instId和ccy至少要传一个；如果两个都传，默认使用instId <br>
 * @param [ccy] 保证金币种 仅适用于跨币种保证金模式的全仓 币币杠杆。设置自动借币的杠杆倍数时必填
 * @param lever 杠杆倍数
 * @param mgnMode 保证金模式 isolated：逐仓 cross：全仓 如果ccy有效传值，该参数值只能为cross
 * @param [posSide] 持仓方向 long：双向持仓多头 short：双向持仓空头 net：单向持仓 仅适用于逐仓交割/永续 在双向持仓且保证金模式为逐仓条件下必填，且仅可选择 long或short，默认net
 * @returns {Object}
 */
async function post_api_v5_account_setLeverage({instId, ccy, lever, mgnMode, posSide}) {
    return await http(cleanObj({
        instId: instId, ccy: ccy, lever: lever, mgnMode: mgnMode, posSide: posSide
    }))
}

/**
 * 下单（60次/2s）
 * @description 只有当您的账户有足够的资金才能下单。
 * @param instId 产品ID，如 BTC-USD-190927-5000-C
 * @param tdMode 交易模式 保证金模式：isolated：逐仓 ；cross：全仓 非保证金模式：cash：非保证金
 * @param [ccy] 保证金币种，仅适用于单币种保证金模式下的全仓杠杆订单
 * @param [clOrdId] 客户自定义订单ID 字母（区分大小写）与数字的组合，可以是纯字母、纯数字且长度要在1-32位之间。
 * @param [tag] 订单标签 字母（区分大小写）与数字的组合，可以是纯字母、纯数字，且长度在1-16位之间。
 * @param side 订单方向 buy：买 sell：卖
 * @param [posSide] 持仓方向 在双向持仓模式下必填，且仅可选择 long 或 short
 * @param ordType 订单类型 market：市价单 limit：限价单 post_only：只做maker单 fok：全部成交或立即取消 ioc：立即成交并取消剩余 optimal_limit_ioc：市价委托立即成交并取消剩余（仅适用交割、永续）
 * @param sz 委托数量
 * @param [px] 委托价格，仅适用于limit、post_only、fok、ioc类型的订单
 * @param reduceOnly 是否只减仓，true 或 false，默认false 仅适用于币币杠杆，以及买卖模式下的交割/永续 仅适用于单币种保证金模式和跨币种保证金模式
 * @param tgtCcy 市价单委托数量的类型 base_ccy: 交易货币 ；quote_ccy：计价货币 仅适用于币币订单
 * @returns {Object}
 */
async function post_api_v5_trade_order({
                                           instId,
                                           tdMode,
                                           ccy,
                                           clOrdId,
                                           tag,
                                           side,
                                           posSide,
                                           ordType,
                                           sz,
                                           px,
                                           reduceOnly,
                                           tgtCcy
                                       }) {
    return await http(cleanObj({
        instId: instId,
        tdMode: tdMode,
        ccy: ccy,
        clOrdId: clOrdId,
        tag: tag,
        side: side,
        posSide: posSide,
        ordType: ordType,
        sz: sz,
        px: px,
        reduceOnly: reduceOnly,
        tgtCcy: tgtCcy
    }))
}


async function test() {
    console.log(await get_api_v5_public_instruments({instType: "SWAP"}))
}

test()

