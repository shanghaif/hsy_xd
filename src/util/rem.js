
// 新版页面rem设置
export function resetRem() {
	let sw = document.documentElement.clientWidth;
	let html = document.documentElement;
	// html.style.fontSize = 12 + 'px';
	// console.log(sw,typeof(sw))
	if (300 <= sw && sw < 310) {
		html.style.fontSize = 9 + 'px';
		// console.log(sw,'300-310')
	} else if (310 <= sw && sw < 360) {
		html.style.fontSize = 9 + 'px';
		// console.log('310-320')
	} else if (360 <= sw && sw < 376) {
		html.style.fontSize = 11 + 'px';
		// console.log('360-376')
	} else if (376 <= sw && sw < 414) {
		html.style.fontSize = 11 + 'px';
		// console.log('376-414')
	} else if (414 <= sw && sw < 641) {
		html.style.fontSize = 13 + 'px';
		// console.log('376-641')
	} else if (641 <=  sw) {
		html.style.fontSize = 21 + 'px';
		// console.log('>641')
	}
	// 监听 window 的 resize 事件．在浏览器窗口变化时再设置下区域高度．
	window.onresize = () => {
		let sw = document.documentElement.clientWidth;
		let html = document.documentElement;
		if (300 <= sw && sw < 310) {
			html.style.fontSize = 9 + 'px';
			// console.log(sw,'300-310')
		} else if (310 <= sw && sw < 360) {
			html.style.fontSize = 9 + 'px';
			// console.log('310-320')
		} else if (360 <= sw && sw < 376) {
			html.style.fontSize = 11 + 'px';
			// console.log('360-376')
		} else if (376 <= sw && sw < 414) {
			html.style.fontSize = 11 + 'px';
			// console.log('376-414')
		} else if (414 <= sw && sw < 641) {
			html.style.fontSize = 13 + 'px';
			// console.log('376-641')
		} else if (641 <= sw) {
			html.style.fontSize = 21 + 'px';
			// console.log('>641')
		}
	};
}


// 老版rem设置
export function resumeRem() {
	let sw = document.documentElement.clientWidth;
	let html = document.documentElement;

	if (300 <= sw < 310) {
		html.style.fontSize = 20 + 'px';
	} else if (310 <= sw && sw < 320) {
		// html.style.fontSize = 20 + 'px';
	} else if (360 <= sw && sw < 376) {
		// html.style.fontSize = 20 + 'px';
	} else if (376 <= sw && sw < 414) {
		// html.style.fontSize = 21 + 'px';
	} else if (414 <= sw && sw < 641) {
		// html.style.fontSize = 22 + 'px';
	} else if (641 <= sw) {
		// html.style.fontSize = 23 + 'px';
	}
	// 监听 window 的 resize 事件．在浏览器窗口变化时再设置下区域高度．
	window.onresize = () => {
		let sw = document.documentElement.clientWidth;
		let html = document.documentElement;
		if (300 <= sw < 310) {
			// html.style.fontSize = 20 + 'px';
		} else if (310 <= sw && sw < 320) {
			// html.style.fontSize = 20 + 'px';
		} else if (360 <= sw && sw < 376) {
			// html.style.fontSize = 20 + 'px';
		} else if (376 <= sw && sw < 414) {
			// html.style.fontSize = 21 + 'px';
		} else if (414 <= sw && sw < 641) {
			// html.style.fontSize = 22 + 'px';
		} else if (641 <= sw) {
			// html.style.fontSize = 23 + 'px';
		}
	};
}
