!function(root) {
	
	root.requestAnimationFrame = root.requestAnimationFrame || root.mozRequestAnimationFrame || root.webkitRequestAnimationFrame || root.msRequestAnimationFrame || function(callback) {
		return root.setTimeout(callback, 1000/60);
	}
	
	// album toggle scale
	var $pp = $('.pp'),
		$album = $('.album'),
		music = $('.music')[0];
	
	var needClass = ['album-big', 'pp-play'];
	
	function toggleAlbumPlay() {
		if(!$album.hasClass(needClass[0])) {
			$album.addClass(needClass[0]);
			$pp.addClass(needClass[1]);
			// music.play();
		} else {
			$album.removeClass(needClass[0]);
			$pp.removeClass(needClass[1]);
			// music.pause();
		}
	}
	
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
	
	// btn bg show hide
	var $upBtns = $('.up span'),
		$downBgs = $('.down span');
	
	$upBtns.on('touchend', function() {
		
		var index = $(this).index();
		if (index === 1) {
			toggleAlbumPlay();
		}
		
		$downBgs.eq(index).addClass('bg-show-hide');
		
		$(this).addClass('down-up');
		
	});
	
	$downBgs.on('animationend webkitAnimationend', function() {
		$(this).removeClass('bg-show-hide');
	});
	
	$upBtns.on('animationend webkitAnimationend', function() {
		$(this).removeClass('down-up');
	});
	
	// timeline control
	var $indicator = $('.indicator'),
		$played = $('.played'),
		$line = $('.line'),
		$playTime = $('.play'),
		$restTime = $('.rest');
	var isDown = false,
		lineOL = $line.offset().left;
	
	$indicator.on('touchstart', function(event) {
		isDown = true;
		$indicator.addClass('indicator-big');
		$playTime.addClass('play-down');
		if (!$album.hasClass(needClass[0])) {
			$album.addClass('album-pause-up');
		} else {
			$album.addClass('album-play-up');
		}
	});
	
	$indicator.on('touchmove', function(event) {
		
	});
	
	$indicator.on('touchend', function(event) {
		isDown = false;
		$indicator.removeClass('indicator-big');
		$playTime.removeClass('play-down');
		if (!$album.hasClass(needClass[0])) {
			$album.removeClass('album-pause-up');
		} else {
			$album.removeClass('album-play-up');
		}
	});
	
	// volume control
	var $progress = $('.progress'),
		$v_indicator = $('.v-indicator'),
		$volumes = $('.volumes');
	
	var vOL = $volumes.offset().left,
		viOL = $v_indicator.offset().left,
		wLA = $volumes.width(),
		wV = $v_indicator.width(),
		wP = $progress.width(),
		OML, recordOL = 0, oLeft;
	
	$v_indicator.on('touchstart', function(event) {
		isDown = true;
		var cx = event.touches[0].pageX;
		if (cx <= wV/2 + vOL) {
			cx = wV/2 + vOL;
			viOL = vOL;
		}
		OML = cx - viOL;
	});
	
	$v_indicator.on('touchmove', function(event) {
		if (isDown) {
			var cx = event.touches[0].pageX;
			if (cx <= wV/2 + vOL) {
				cx = wV/2 + vOL;
			}
			if (cx >= wLA - wV/2 + vOL) {
				cx = wLA - wV/2 + vOL;
			}
			oLeft = cx - viOL - OML + recordOL;
			$(this).css({
				'transform': 'translate3d(' + oLeft + 'px, 0, 0)',
				'webkitTransform': 'translate3d(' + oLeft + 'px, 0, 0)'
			});
			$progress.css({
				'width': wP + oLeft + 'px'
			});
		}
	});
	
	$v_indicator.on('touchend', function(event) {
		isDown = false;
		viOL = $(this).offset().left;
		recordOL = oLeft;
	});
	
}(this);