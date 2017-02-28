$(function() {
	
	var appleMusic = new AppleMusic({
		// 资源列表
		playlist: ['img/syy.mp3'],
		// 指示下滑箭头
		arrow: $('.arr-down'),
		// 专辑封面
		album: $('.album'),
		// 总时间线
		timeline: $('.timeline'),
		// 时间指示器
		timeIndicator: $('.indicator'),
		// 已播放进度显示
		played: $('.played'),
		// 已播放时间
		play: $('.play'),
		// 剩余时间
		rest: $('.rest'),
		// 三个控制按钮
		btns: $('.up span'),
		// 按钮对应的背景
		btnBgs: $('.down span'),
		// 音量指示器
		volumeIndicator: $('.v-indicator'),
		// 音量进度条
		progress: $('.progress'),
		// 总音量
		volumeContainer: $('.volumes')
	});
	// 初始化调用
	appleMusic.init();
	
});