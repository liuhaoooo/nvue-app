import { Validate } from "@/common/formValidate.js";
export const rules_wifi_index = {
    ssid: [
        {
            required: true,
            message: 'SSID不能为空',
            trigger: ['change'],
        },
        {
            min: 4,
            max: 32,
            validator: Validate.Ssid,
            message: 'SSID格式不正确',
            trigger: ['change'],
        }
    ],
    key: [
        {
            required: true,
            message: 'Wi-Fi密码不能为空',
            trigger: ['change'],
        },
        {
            min: 8,
            max: 32,
            validator: Validate.WifiPwd,
            message: 'Wi-Fi密码格式不正确',
            trigger: ['change']
        }
    ]
}
// 加密方式
export const authenticationOption = [
    {
        value: "0",
        name: "开放"
    },
    {
        value: "2",
        name: "WPA2-PSK"
    },
    {
        value: "3",
        name: "WPA-PSK/WPA2-PSK"
    },
    {
        value: "4",
        name: "WPA3-PSK"
    },
    {
        value: "5",
        name: "WPA2-PSK/WPA3-PSK"
    }
]
export const encryptionOption = [
    { value: "0", name: "TKIP" },
    { value: "1", name: "AES" },
    { value: "2", name: "TKIP+AES" },
];
// 带宽
export const bandWidthOption_24 = [
    { name: "20MHz", value: "0" },
    { name: "40MHz", value: "1" },
    { name: "20/40MHz", value: "2" },
];
export const bandWidthOption_5 = [
    { name: "20MHz", value: "0" },
    { name: "40MHz", value: "1" },
    { name: "80MHz", value: "3" },
    { name: "160MHz", value: "4" },
];
// 工作模式
export const wifiWorkMode_24 = [
    { name: "11b only", value: "0" },
    { name: "11g only", value: "1" },
    { name: "11n only", value: "2" },
    { name: "11b/g", value: "3" },
    { name: "11g/n", value: "4" },
    { name: "11b/n", value: "5" },
    { name: "11b/g/n", value: "6" },
    { name: "11g/n/ax", value: "16" },
];
export const wifiWorkMode_5 = [
    { name: "11a only", value: "7" },
    { name: "11n only", value: "8" },
    { name: "11ac only", value: "9" },
    { name: "11a/n", value: "10" },
    { name: "11n/ac", value: "11" },
    { name: "11a/ac", value: "12" },
    { name: "11a/n/ac", value: "13" },
    { name: "11ac/ax", value: "17" },
];
// 国家码
export const countryCodeOption = [
    { "name": "CHINA", "value": "CN" },
    { "name": "FCC", "value": "FCC" },
    { "name": "US", "value": "US" },
    { "name": "WORLD-WIDE", "value": "WORLD-WIDE" }
]


