!function(root, $) {
	
	// requestAnimationFrame
	root.RAF = root.requestAnimationFrame || root.mozRequestAnimationFrame || root.webkitRequestAnimationFrame || root.msRequestAnimationFrame || function(callback) {
		return root.setTimeout(callback, 1000/60);
	}
	
	var AppleMusic = function(argus) {
		// 音乐
		this.music = argus.music;
		// 页面向下的箭头
		this.arrow = argus.arrow;
		// 专辑封面
		this.album = argus.album;
		// 时间线
		this.timeline = argus.timeline;
		// 时间指示器
		this.timeIndicator = argus.timeIndicator;
		// 时间进度显示条
		this.played = argus.played;
		// 播放时间
		this.play = argus.play;
		// 剩余时间
		this.rest = argus.rest;
		// 总时间
		// this.allTime = this.music.duration;
		// 歌曲名字
		this.name = argus.name;
		// 歌曲主要信息
		this.info = argus.info;
		// 操作按钮
		this.btns = argus.btns;
		// 按钮背景
		this.btnBgs = argus.btnBgs;
		// 音量指示器
		this.volumeIndicator = argus.volumeIndicator;
		// 音量进度显示条
		this.progress = argus.progress;
		// 总音量长度条
		this.volume = argus.volume;
	}
	
	var SYY = AppleMusic.prototype;
	
	SYY.constructor = AppleMusic;
	
	AppleMusic.defaults = {
		
	}
	
	var CNS = {
		ap: 'arr-ping', // 箭头动画
		ab: 'album-big', // 专辑变大动画
		apau: 'album-pause-up', // 暂停时专辑动画
		aplu: 'album-play-up', // 播放时专辑动画
		ib: 'indicator-big', // 时间指示器变大动画
		pc: 'play-color', // 播放时间颜色变化时间
		pd: 'play-down', // 播放时间下降动画
		pedc: 'played-color', // 时间进度条动画
		bsh: 'bg-show-hide', // 按钮背景动画
		pp: 'pp-play', // 播放按钮显示
		du: 'down-up', // 按钮按下去的动画
	}
	
	SYY.init = function() {
		
		this.arrowDown();
		
		this.btnEffect();
		
		this.volumeControl();
		
	}
	
	SYY.arrowDown = function() {
		this.arrow.on('touchstart', function() {
			$(this).addClass(CNS.ap);
		});
		this.arrow.on('touchend', function() {
			$(this).removeClass(CNS.ap);
		});
	}
	
	SYY.albumAnimate = function() {
		var _album = this.album,
			_pp = this.btns.eq(1);
		if(!_album.hasClass(CNS.ab)) {
			_album.addClass(CNS.ab);
			_pp.addClass(CNS.pp);
			// this.music.play();
		} else {
			_album.removeClass(CNS.ab);
			_pp.removeClass(CNS.pp);
			// this.music.pause();
		}
	}
	
	SYY.btnEffect = function() {
		
		var _s = this;
		_s.btns.on('touchend', function() {
			var index = $(this).index();
			if (index === 1) {
				_s.albumAnimate();
			}
			_s.btnBgs.eq(index).addClass(CNS.bsh);
			$(this).addClass(CNS.du);
		});
		
		_s.btns.on('animationend webkitAnimationend', function() {
			$(this).removeClass(CNS.du);
		});
		
		_s.btnBgs.on('animationend webkitAnimationend', function() {
			$(this).removeClass(CNS.bsh);
		});
		
	}
	
	SYY.volumeControl = function() {
		
		var _s = this,
			_volume = _s.volume,
			_indicator = _s.volumeIndicator,
			_progress = _s.progress;
		
		var vLength = _volume.width(),
			vLeft = _volume.offset().left,
			iLength = _indicator.width(),
			iLeft = _indicator.offset().left,
			pLength = _progress.width(),
			offset = null,
			record = 0,
			vileft = null,
			isDown = false;
		
		_indicator.on('touchstart', function() {
			isDown = true;
			var cx = event.touches[0].pageX;
			if (cx <= iLength / 2 + vLeft) {
				cx = iLength / 2 + vLeft;
				iLeft = vLeft;
			}
			offset = cx - iLeft;
		});
		
		_indicator.on('touchmove', function() {
			if (isDown) {
				var cx = event.touches[0].pageX;
				if (cx <= iLength / 2 + vLeft) {
					cx = iLength / 2 + vLeft;
				}
				if (cx >= vLength - iLength / 2 + vLeft) {
					cx = vLength - iLength / 2 + vLeft;
				}
				vileft = cx - iLeft - offset + record;
				$(this).css({
					'transform': 'translate3d(' + vileft + 'px, 0, 0)',
					'webkitTransform': 'translate3d(' + vileft + 'px, 0, 0)'
				});
				_progress.css({
					'width': pLength + vileft + 'px'
				});
			}
		});
		
		_indicator.on('touchend', function() {
			isDown = false;
			iLeft = $(this).offset().left;
			record = vileft;
		});
		
	}
	
	root.AppleMusic = AppleMusic;
	
}(this, jQuery);