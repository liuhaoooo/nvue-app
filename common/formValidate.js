export const Validate = {
    //普通校验
    normal: (rule, value, callback) => {
        const reg1 = /^[0-9a-zA-Z!*#:\(\)\+\-\.\/%=\?@\^_\{|\}~\x20]{1,150}$/;
        const reg_cn = new RegExp("[\\u4E00-\\u9FA5]+", "g");
        const reg = /[\\\'\"]/m
        if (!value) {
            return true
        } else if (/\s/.test(value) || reg_cn.test(value) || !reg1.test(value) || reg.test(value)) {
            return false
        } else {
            return true
        }
    },
    Ssid: (rule, value, callback) => {
        const reg = /[\\\'\"]/m;
        const reg1 = /^\s+|\s+$/g;
        const bitLen = bytesLnegth(value);//算字节数
        const cn_len = value.match(/[\u4E00-\u9FA5]/g)?.length || 0;//找出中文个数，不能超过10个
        if (!value) {
            return true
        } else if (value.length < 4 || value.length > 32 || /\s/.test(value) || reg.test(value) || reg1.test(value) || cn_len > 10 || bitLen > 32) {
            return false
        } else {
            return true
        }
    },
    //wifi 密码
    WifiPwd: (rule, value, callback) => {
        const reg1 = /(?=.*[0-9a-zA-Z]).{8,32}$/;
        const reg2 = new RegExp("[`~!@%#$^&*()=|{}':;',\\[\\].<>]")
        const reg_cn = /[^\u0000-\u00ff]/g;
        const reg3 = /[\\\'\"]/m;
        if (!value) {
            return true
        } else if (/\s/.test(value) || reg_cn.test(value) || reg3.test(value) || (!reg1.test(value) && !reg2.test(value))) {
            return false
        } else {
            return true
        }
    },
    //ip
    checkIP: (rule, value, callback) => {
        if (!value) {
            return true
        }
        const reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if ((reg.test(value) && (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256))) {
            return true
        } else {
            return false
        }
    },
    //ipv6
    checkIPv6: (rule, value, callback) => {
        if (!value) {
            return true
        }
        let regTest = /:/.test(value)
            && value.match(/:/g).length < 8
            && /::/.test(value)
            ? (value.match(/::/g).length == 1
                && /^::$|^(::)?([\da-f]{1,4}(:|::))*[\da-f]{1,4}(:|::)?$/i.test(value))
            : /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(value);
        if (regTest) {
            return true
        } else {
            return false
        }
    },
    //ipv6带前缀
    checkIPv6_prefix: (rule, value, callback) => {
        if (!value) {
            return true
        }
        let valArr = value.split('/')
        let reg = /:/.test(valArr[0])
            && valArr[0].match(/:/g).length < 8
            && /::/.test(valArr[0])
            ? (valArr[0].match(/::/g).length == 1
                && /^::$|^(::)?([\da-f]{1,4}(:|::))*[\da-f]{1,4}(:|::)?$/i.test(valArr[0]))
            : /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(valArr[0]);
        let reg1 = valArr[1] >= 1 && valArr[1] <= 128
        if (reg && reg1) {
            return true
        } else {
            return false
        }
    },
    //port
    checkPort: (rule, value, callback) => {
        if (!value) {
            return true
        }
        value = Number(value)
        if (!Number.isInteger(value)) {
            return false
        } else if (/\s/.test(value) || value < 1 || value > 65535) {
            return false
        } else {
            return true
        }
    },
    //mac
    checkMac: (rule, value, callback) => {
        if (!value) {
            return true
        }
        const reg = /^([0-9a-f]{2}[\:|\-]){5}[0-9a-f]{2}$/i;
        if (!reg.test(value)) {
            return false
        } else {
            return true
        }
    },
    //url
    checkUrl: (rule, value, callback) => {
        if (!value) {
            return true
        }
        const strRegex = /^((http|https):\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/\?\:]?.*$/
        const strRegex_ip = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (strRegex.test(value) || strRegex_ip.test(value)) {
            return true
        } else {
            return false
        }
    },
    //子网掩码
    checkNetMask: (rule, value, callback) => {
        if (!value) {
            return true
        }
        const reg = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
        if (reg.test(value) && (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256)) {
            return true
        } else {
            return false
        }
    },
    //网页登录密码
    checkSysPass: (rule, value, callback) => {
        if (!value) {
            return true
        }
        const reg = /(?=.*[0-9]).{8,30}$/;
        const reg1 = /(?=.*[a-zA-Z]).{8,30}$/;
        const reg2 = new RegExp("[`~!@#$%^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
        if (reg.test(value) && reg1.test(value) && reg2.test(value) && !/\s/.test(value)) {
            return true
        } else {
            return false
        }
    },
}
//计算字符串字节长度
function bytesLnegth(str) {
    let count = str.length;
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) {
            count += 2;
        }
    }
    return count;
};
