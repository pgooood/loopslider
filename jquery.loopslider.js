/**
 * @author Pavel Khoroshkov aka pgood
 */
(function($){$.fn.loopslider=function(options){
 
 	options = $.extend({
		htmlSliderWraper:'<div style="overflow:hidden;"></div>'
		,htmlSliderBody:'<div style="position:relative;"></div>'
		,htmlItemWraper:'<div style="float:left;"></div>'
		,htmlPaginationContainer:'<div class="slider-pagination"></div>'
		,htmlPaginationItem:'<div></div>'
		,visibleItems:3
		,slideDuration:400
		,easing:'swing'
		,responsive:false
		,autoplay:false
		,stopOnHover:false
		,autoplayInterval:3000
		,prevButton:null
		,nextButton:null
		,stopButton:null
		,playButton:null
		,hideButtons:true
		,gap:0
		,step:1
		,pagination:false
		,onStop:null
		,onPlay:null
		,onMove:null
	},options);
	
	options.gap = parseInt(options.gap);
	options.gap = !isNaN(options.gap) && options.gap > 0 ? options.gap : 0;
	options.visibleItems = options.visibleItems > 0 ? parseInt(options.visibleItems) : 1;
	options.step = parseInt(options.step);
	options.step = isNaN(options.step) || options.step < 1
				? 1 : (options.step > options.visibleItems ? options.visibleItems : options.step);
	
	var sliders = [],isPlaying;
	
	function wrap($container){
		var slider = {
			$e: $(options.htmlSliderBody).appendTo($(options.htmlSliderWraper).width('100%')).width('1000%')
			,$items: function(){return this.$e.find('>*');}
			,$currentItem: function(){return this.$e.find('>*:first-child');}
			,currentIndex: function(){return this.$currentItem().data('index');}
		};
		$container.find('>*').each(function(i){
			$(options.htmlItemWraper)
				.append(this)
				.appendTo(slider.$e)
				.data('index',i);
		});
		$container.append(slider.$e.parent());
		slider.length = slider.$items().length;
		return slider;
	};
	
	function init(slider){
		var width = slider.$e.parent().width();
		slider.itemWidth = (width - options.gap * (options.visibleItems - 1)) / options.visibleItems;
		if(slider.arInvisible && slider.arInvisible.length)
			slider.$e.append(slider.arInvisible);
		slider.arInvisible = [];
		var $items = slider.$items();
		$items.css({
			'margin-right': ((options.gap > 0 ? options.gap * 100 / width : 0) / 10).toFixed(3) + '%'
			,'width': ((slider.itemWidth * 100 / width) / 10).toFixed(3) + '%'
		});
		if(slider.enabled = slider.length > options.visibleItems){
			$items.each(function(i,e){
				if(i >= options.visibleItems)
					slider.arInvisible.push(e);
			});
			$(slider.arInvisible).detach();
		};
		if(options.hideButtons)
			buttonsVisibility(slider.enabled);
		return slider;
	};
	
	function pagination(){
		$(sliders).each(function(){
			var slider = this
				,numPages = Math.ceil(slider.length / options.visibleItems)
				,$e = $(options.htmlPaginationContainer);
			if(slider.$pagination)
				slider.$pagination.parent().remove();
			if(!slider.enabled)
				return true;
			for(var i = 0; i < numPages; i++)
				$(options.htmlPaginationItem)
					.appendTo($e)
					.addClass('slider-page-nav-item')
					.click(function(i){return function(){moveTo(i*options.visibleItems);};}(i));
			$e.insertAfter(slider.$e.parent());
			slider.$pagination = $e.find('>.slider-page-nav-item');
			activatePageNavItem(slider);
		});
	};
	
	function activatePageNavItem(slider){
		if(slider.$pagination){
			slider.$pagination.removeClass('active-nav-item');
			slider.$pagination.eq(Math.round(slider.currentIndex() / options.visibleItems)).addClass('active-nav-item');
		};
	};
	
	function buttonsVisibility(v){
		var $buttons = $([
				$(options.nextButton)
				,$(options.prevButton)
				,$(options.playButton)
				,$(options.stopButton)
			]);
		$buttons.each(function(){
			v ? this.show() : this.hide();
		});
	};
	
	function prev(step){
		step = step || options.step;
		$(sliders).each(function(){
			var slider = this,$items;
			if(slider.enabled && !slider.motion){
				stop();
				slider.motion = true;
				for(var i = 0; i < step; i++)
					$(slider.arInvisible.pop()).prependTo(slider.$e);
				slider.$e.css('left',((slider.itemWidth + options.gap) * -step));
				slider.$e.animate({left: 0},options.slideDuration,options.easing,function(){
					for(var i = 0; i < step; i++){
						$items = slider.$items();
						slider.arInvisible.unshift($items.get($items.length-1));
						$items.eq($items.length-1).detach();
					};
					slider.motion = false;
					activatePageNavItem(slider);
					if(isPlaying)
						play();
					if(typeof(options.onMove) === 'function')
						options.onMove(slider.currentIndex(),slider.$currentItem().find('>*:first-child'),'back');
				});
			};
		});
		return false;
	};
	
	function next(step){
		step = step || options.step;
		$(sliders).each(function(){
			var slider = this,$items;
			if(slider.enabled && !slider.motion){
				stop();
				slider.motion = true;
				for(var i = 0; i < step; i++)
					$(slider.arInvisible.shift()).appendTo(slider.$e);
				slider.$e.animate({left: ((slider.itemWidth + options.gap) * -step)},options.slideDuration,options.easing,function(){
					for(var i = 0; i < step; i++){
						$items = slider.$items();
						slider.arInvisible.push($items.get(0));
						$items.eq(0).detach();
					};
					slider.$e.css('left',0);
					slider.motion = false;
					activatePageNavItem(slider);
					if(isPlaying)
						play();
					if(typeof(options.onMove) === 'function')
						options.onMove(slider.currentIndex(),slider.$currentItem().find('>*:first-child'),'forward');
				});
			};
		});
		return false;
	};
	
	function moveTo(index){
		index = parseInt(index);
		if(isNaN(index)) return;
		$(sliders).each(function(){
			var slider = this
				,pos = slider.$currentItem().data('index')
				,v1 = index - pos
				,v2 = slider.length - pos + index
				,v3 = slider.length - index + pos;
			//console.log('length = '+slider.length+'; index = '+index+'; pos = '+pos+'; v1 = '+v1+'; v2 = '+v2+'; v3 = '+v3);
			if(index >= slider.length || index == pos)
				return true;
			if(Math.abs(v1) < v2 && Math.abs(v1) < v3){
				if(v1 > 0) next(v1);
				else prev(Math.abs(v1));
			}else if(v2 < v3) next(v2);
			else prev(v3);
		});
	};
	
	function play(){
		stop();
		$(sliders).each(function(){
			var slider = this;
			if(slider.enabled && options.autoplayInterval > options.slideDuration){
				slider.autoplayIntervalId = window.setInterval(function(){next();},options.autoplayInterval);
			};
		});
	};
	
	function stop(){
		$(sliders).each(function(){
			var slider = this;
			if(slider.autoplayIntervalId){
				window.clearInterval(slider.autoplayIntervalId);
				slider.autoplayIntervalId = null;
			};
		});
	};
	
	function autoplay(){
		play();
		isPlaying = true;
		if(typeof(options.onPlay) === 'function')
			options.onPlay();
	};
	
	function initAll(){
		stop();
		$(sliders).each(function(){
			this.$e.stop(true,true);
		});
		if(options.responsive){
			var windowWidth = parseInt($(window).width())
				,width = Number.MAX_SAFE_INTEGER;
			for(var w in options.responsive)
				if(parseInt(w) >= windowWidth && parseInt(w) < parseInt(width))
					width = w;
			if(options.responsive[width])
				$.extend(options,options.responsive[width]);
		};
		$(sliders).each(function(){
			init(this);
		});
		if(options.pagination)
			pagination();
		if(isPlaying)
			play();
	};
	
	$(this).each(function(){
		sliders.push(wrap($(this)));
	});
	
	initAll();
	
	$(window).resize(initAll);
	$(options.nextButton).click(function(){next();return false;});
	$(options.prevButton).click(function(){prev();return false;});
	$(options.playButton).click(function(){autoplay();return false;});
	$(options.stopButton).click(function(){
		stop();
		isPlaying = false;
		if(typeof(options.onStop()) === 'function')
			options.onStop();
		return false;
	});
	
	if(options.autoplay)
		autoplay();
	
	if(options.stopOnHover){
		$(this).mouseenter(function(){
			if(isPlaying)
				stop();
		});
		$(this).mouseleave(function(){
			if(isPlaying)
				play();
		});
	};
	
};}(jQuery));
