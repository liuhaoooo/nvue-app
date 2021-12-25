import { router } from './router.js'
import store from "@/store";
let pending = []; //存储每个请求的取消函数和标识
const request = (params = {},timeout) => {
	let baseURL = "http://192.168.0.1/cgi-bin/http.cgi"
	try {
	    const value = uni.getStorageSync('sessionId');
	    params.sessionId = value || ''
	} catch (e) {
	    params.sessionId = ""
	}
	try {
	    const value = uni.getStorageSync('ip');
	    baseURL = value ? `http://${value}/cgi-bin/http.cgi` : "http://192.168.10.1/cgi-bin/http.cgi"
	} catch (e) { }
	return new Promise((resolve, reject) => {
		let requestTask = uni.request({
			url: baseURL,
			data: params,
			timeout: timeout || 30000,
			method: "POST",
			success: (res) => {
				if (!res.data.success && res.data.message == "NO_AUTH") { //sessionId失效
					let intervalID = store.state.sysStatus.intervalIDs["GET_DEVICE_NAME"]
					clearInterval(intervalID);
					uni.redirectTo({
						url: router.LOGIN
					});
					uni.showModal({
						title: '提示',
						content: '账号在其他地方登录或长时间未操作，已退出登录',
						showCancel: false
					});
				}
				resolve(res.data);
			},
			fail: (err)=>{
				reject(err);
			},
			complete: (com) => {
				pendingPop(com.data.cmd)
			}
		});
		if(params.method==="GET"){//只对GET中断
			pending.push({
				key: params.cmd,
				fn: requestTask
			})
		}
	})
}
//删除已响应的接口
const pendingPop = (cmd) => {
	for (let p in pending) {
		if (pending[p].key == cmd) {
			pending.splice(p, 1); //把这条记录从数组中移除
		}
	}
}
//method参数为GET
export const request_get = async (params = {},timeout) => {
	params.method = 'GET';
	let res = await request(params,timeout)
	return res
}
//method参数为POST
export const request_post = async (params = {},timeout) => {
	params.method = 'POST';
	let res = await request(params,timeout)
	return res
}
//中断请求{cmd,method}
export const request_cancel = (cmd) => {
	for (let p in pending) {
		if (pending[p].key == cmd) { //当前请求在数组中存在时执行函数体
			pending[p].fn.abort(); //执行取消操作
			pending.splice(p, 1); //把这条记录从数组中移除
		}
	}
}
