!function(root, $) {
	
	// $ prototype methods
	$.fn.translate3d = function(distanceX) {
		this.css({
			'transform': 'translate3d(' + distanceX + 'px, 0, 0)',
			'webkitTransform': 'translate3d(' + distanceX + 'px, 0, 0)'
		});
	}
	
	// requestAnimationFrame
	var RAF = root.requestAnimationFrame || root.mozRequestAnimationFrame || root.webkitRequestAnimationFrame || root.msRequestAnimationFrame || function(callback) {
		return root.setTimeout(callback, 1000/60);
	}
	
	var AppleMusic = function(argus) {
		// 资源列表
		this.playlist = argus.playlist;
		// 音乐
		this.sound = null;
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
		// this.allTime = 24;
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
		this.volumeContainer = argus.volumeContainer;
	}, SYY = AppleMusic.prototype;
	
	SYY.constructor = AppleMusic;
	
	SYY.defaults = {
		volume: 0.5
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
		
		var _s = this;
		
		_s.arrowDown();
		
		_s.startLoad();
		
		_s.btnEffect();
		
		_s.volumeControl();
		
	}
	
	SYY.arrowDown = function() {
		this.arrow.on('touchstart', function() {
			$(this).addClass(CNS.ap);
		});
		this.arrow.on('touchend', function() {
			$(this).removeClass(CNS.ap);
		});
	}
	
	SYY.btnEffect = function() {
		
		var _s = this;
		_s.btns.on('touchend', function() {
			var index = $(this).index();
			if (index === 1) {
				if (_s.sound.playing()) {
					_s.sound.pause();
				} else {
					_s.sound.play();
				}
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
			_volume = _s.volumeContainer,
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
				$(this).translate3d(vileft);
				_progress.css({
					'width': pLength + vileft + 'px'
				});
				_s.sound.volume((pLength + vileft) / (vLength - iLength / 2));
			}
		});
		
		_indicator.on('touchend', function() {
			isDown = false;
			iLeft = $(this).offset().left;
			record = vileft;
		});
		
	}
	
	SYY.startLoad = function() {
		
		var _s = this,
			_album = _s.album,
			_pp = _s.btns.eq(1);
		
		_s.sound = new Howl({
			src: _s.playlist,
			html5: true,
			preload : true,
			onload: function() {
				_s.duration = _s.sound.duration();
				_s.rest.text('-' + _s.formatTime(Math.round(_s.duration)));
				_s.sound.volume(0.5);
			},
			onplay: function() {
				_album.addClass(CNS.ab);
				_pp.addClass(CNS.pp);
				RAF(_s.step.bind(_s));
			},
			onpause: function() {
				_album.removeClass(CNS.ab);
				_pp.removeClass(CNS.pp);
			},
			onend: function() {
				_s.resetPlay();
			},
		});
	}
	
	SYY.step = function() {
		var _s = this,
			seek = _s.sound.seek(),
			allWidth = _s.timeline.width(),
			halfWidth = _s.timeIndicator.width() / 2,
			indicatorWidth = allWidth - halfWidth;
		var percent = seek / _s.duration,
			playedTime = _s.formatTime(Math.round(seek)),
			restTime = _s.restTime(playedTime, Math.round(_s.duration));
		
		_s.play.text(playedTime);
		_s.rest.text('-' + restTime);
		_s.played.width(allWidth * percent + halfWidth);
		_s.timeIndicator.translate3d(indicatorWidth * percent);
		if (_s.sound.playing()) {
			RAF(_s.step.bind(_s));
		}
	}
	
	SYY.formatTime = function(seconds) {
		var m = Math.floor(seconds / 60) || 0,
			s = seconds - m * 60 || 0;
		return m + ':' + (s < 10 ? '0' : '') + s;
	}
	
	SYY.restTime = function(playedTime, allTime) {
		var splitTime = playedTime.split(':'),
			restTime = allTime - (+splitTime[0]) * 60 - (+splitTime[1]);
		return this.formatTime(restTime);
	}
	
	SYY.resetPlay = function() {
		// 重置时间显示
		this.play.text('0:00');
		this.rest.text('-' + this.formatTime(Math.round(this.duration)));
		// 重置时间进度条
		this.timeIndicator.css({left: 0});
		this.played.width(0);
		this.btns.eq(1).removeClass(CNS.pp);
		this.album.removeClass(CNS.ab);
	}
	
	root.AppleMusic = AppleMusic;
	
}(this, jQuery);