$(function() {
	
	/* -------- new code start ------- */
	
	var apple_music = new AppleMusic({
		// 需要播放的音频文件
		// music: $('.syy')[0],
		// 指示下滑箭头
		arrow: $('.arr-down'),
		// 专辑封面
		album: $('.album'),
		// 三个控制按钮
		btns: $('.up span'),
		// 按钮对应的背景
		btnBgs: $('.down span'),
		// 音量指示器
		volumeIndicator: $('.v-indicator'),
		// 音量进度条
		progress: $('.progress'),
		// 总音量
		volume: $('.volumes')
	});
	// 初始化调用
	apple_music.init();
	
	/* -------- new code end ------- */
	
	// text slide
	var PADDING_LEFT = 64,
		slideStep = 0;
	var desc = $('.desc')[0],
		descText = desc.innerText,
		offsetWidth = desc.offsetWidth,
		scrollWidth = desc.scrollWidth;
	
	function slide() {
		
		window.requestAnimationFrame(slide);
		slideStep -= 0.6;
		
		if (-slideStep > scrollWidth - offsetWidth + PADDING_LEFT) {
			desc.innerHTML = descText + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + descText;
			scrollWidth = desc.scrollWidth;
			slideStep = 0;
		}
		
		desc.style.transform =
		desc.style.webkitTransform = 'translate3d(' + slideStep + 'px, 0, 0)';
		
	};
	
	// timeline control
	var $indicator = $('.indicator'),
		$played = $('.played'),
		$line = $('.line'),
		$playTime = $('.play'),
		$restTime = $('.rest');
	var isDown = false,
		isLessThanLeft = false,
		isLessThanLeftTime = false,
		isMoreThanRight = false,
		isMoreThanRightTime = false,
		sbValue = 22,
		lineOL = $line.offset().left,
		indicatorOL, oLeft,
		indicatorW = $indicator.width(),
		lineW = $line.width(),
		ptW = $playTime.width();
		
	$indicator.on('touchstart', function(event) {
		isDown = true;
		indicatorOL = $indicator.offset().left
		
		// 距离左边小于安全距离的时候，放大不能超出
		if (indicatorOL <= lineOL + sbValue) {
			isLessThanLeft = true;
		}
		// 大于左边宽度足够放大的时候，但是又没有超过已播放时间的宽度
		if (indicatorOL <= lineOL + sbValue + ptW && indicatorOL > lineOL + sbValue) {
			isLessThanLeftTime = true;
		}
		
		if (indicatorOL >= lineOL + lineW - sbValue - indicatorW) {
			isMoreThanRight = true;
		}
		
		// 其他情况不影响已播放时间的显示
		if (!isLessThanLeft && !isLessThanLeftTime) {
			$indicator.addClass('indicator-big');
			$playTime.addClass('play-color');
		}
		if (isLessThanLeft) {
			var _oLeft = 28 - indicatorOL + lineOL - indicatorW/2 - 1;
			$indicator.css({
				'transform': 'translate3d(' + _oLeft + 'px, 0, 0) scale(4.66667)',
				'webkitTransform': 'translate3d(' + _oLeft + 'px, 0, 0) scale(4.66667)',
				'background-color': '#ff2d55',
				'border-color': '#fff'
			});
			$playTime.addClass('play-down');
		}
		if (isLessThanLeftTime) {
			$indicator.addClass('indicator-big');
			$playTime.addClass('play-down');
		}
		
		$played.addClass('played-color');
		
		if (!$album.hasClass(ncs[0])) {
			$album.addClass('album-pause-up');
		} else {
			$album.addClass('album-play-up');
		}
		
	});
	
	$indicator.on('touchmove', function(event) {
		
		if (isDown) {
			var mx = event.touches[0].pageX;
			
		}
		
	});
	
	$indicator.on('touchend', function(event) {
		isDown = false;
		isLessThanLeft = false;
		isMoreThanRight = false;
		isLessThanLeftTime = false;
		isMoreThanRightTime = false;
		$(this).removeAttr('style');
		$(this).removeClass('indicator-big');
		$played.removeClass('played-color');
		$playTime.removeClass('play-down play-color');
		$album.removeClass('album-pause-up album-play-up');
	});
	
});