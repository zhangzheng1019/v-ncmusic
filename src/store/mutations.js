const INIT_USERINFO = 'INIT_USERINFO';
const RECORD_USERINFO = 'RECORD_USERINFO';
const OUT_LOGIN = 'OUT_LOGIN';
const SIGN_IN = 'SIGN_IN';
const RECORD_PLAYINFO = 'RECORD_PLAYINFO';
const INIT_PLAYINFO = 'INIT_PLAYINFO';
export default {
	//网页初始化时从本地缓存获取购物车数据
	[INIT_USERINFO](state) {
		let userInfo = localStorage.getItem('userInfo');
		if (userInfo) {
			state.userInfo = JSON.parse(userInfo);
			state.islogin = true;
		}
	},
	[INIT_PLAYINFO](state){
		let playInfo = localStorage.getItem('playInfo');
		if (playInfo) {
			state.playInfo = JSON.parse(playInfo);
			state.islogin = true;
		}
	},
	// 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		localStorage.setItem('userInfo',JSON.stringify(info))
		state.islogin = true;
	},
	//退出登录
	[OUT_LOGIN](state) {
		state.userInfo = null;
		state.islogin = false;
	},
	[SIGN_IN](state){
		state.isSign = true;
	},
	[RECORD_PLAYINFO](state,info){
		state.playInfo = info;
		localStorage.setItem('playInfo',JSON.stringify(info))
	}
}
