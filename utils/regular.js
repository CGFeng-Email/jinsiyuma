function checkPhone(mobile) {
	let regExp = /^[1][3,4,5,7,8][0-9]{9}$/; 
	if (mobile.length == 11) { //手机号码
		if (regExp.test(mobile)) {
			return true
		}
	}
	return false
}

export {
	checkPhone
}