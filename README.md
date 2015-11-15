# LoopSlider
jQuery plugin for creating a responsive slider with infinite loop support. [Demo page](http://pgood.ru/userfiles/file/loopslider/demo/)

Basic Usage
-------
Load the jQuery javascript and LoopSlider plugin's files on the page.
```html
<link rel="stylesheet" href="../loopslider.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="../jquery.loopslider.js"></script>
```

Wrap the HTML elements in a DIV container.
```html
<div class="slider-container">
	<figure>
		<img src="images/i1.jpg" alt="">
		<figcaption class="caption">Image caption 1</figcaption>
	</figure>
	<figure>
		<img src="images/i2.jpg" alt="">
		<figcaption class="caption">Image caption 2</figcaption>
	</figure>
	<figure>
		<img src="images/i3.jpg" alt="">
		<figcaption class="caption">Image caption 3</figcaption>
	</figure>
</div>
```

Call the plugin with basic settings
```js
$(function(){
	$('.slider-container').loopslider({
		autoplay: true
		,visibleItems: 1
		,step: 1
		,pagination: true
	});
});
```

Available settings
-------
```js
$('.slider-container').loopslider({
	visibleItems: 3 // Amount for slides showing in window at once
	,step: 1 // Amount of slides scrolling each time
	,gap: 30 // Margin between each slide (in px)
	,slideDuration: 400 // Slide transition duration (in ms)
	,easing: 'swing' // "swing" or "linear", more easing jqueryui.com/easing/
	,autoplay: false // Auto play slides
	,autoplayInterval: 3000 // Delay between slides
	,stopOnHover: false // Stop slideshow on mouse over
	,touchSupport: true // Handling swipe gestures
	,responsive: {
		480: {visibleItems: 1,step: 1}
		,760: {visibleItems: 3,step: 3}
		,1000: {visibleItems: 4,step: 3}
	}
	
	// Controls
	,pagination: true
	,navigation: true // prev and next buttons
	,prevButton: '#prev' // CSS selector for element used to populate the "Prev" control
	,nextButton: '#next' // CSS selector for element used to populate the "Next" control
	,stopButton: '#stop' // CSS selector for element used to populate the "Stop" control
	,playButton: '#play' // CSS selector for element used to populate the "Play" control
	
	// Callbacks
	,onStop: function(){ /* your code here */ }
	,onPlay: function(){ /* your code here */ }
	,onMove: function(index, $element, direction){ /* your code here */ }
});
```
## License
Copyright (c) 2015 Pavel Khoroshkov. Licensed under the [MIT license](https://github.com/pgooood/loopslider/blob/master/LICENSE).