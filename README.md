# LoopSlider
jQuery plugin for creating a responsive slider with infinite loop support. [Demo page](http://pgood.space/userfiles/file/loopslider/demo/)

Basic Usage
-------
Load the jQuery and LoopSlider plugin's files on the page. Requires jQuery 1.12.0 or higher, dosen't work with the slim build.
```html
<link rel="stylesheet" href="../loopslider.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
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

Parallax mode
-------
Set your images as background of slide elements
```html
<div class="slider-container">
	<figure style="background-image: url(images/ih1.jpg); min-height: 300px;">
		<figcaption class="card-body">Image caption 1</figcaption>
	</figure>
	<figure style="background-image: url(images/ih2.jpg); min-height: 300px;">
		<figcaption class="card-body">Image caption 2</figcaption>
	</figure>
	<figure style="background-image: url(images/ih3.jpg); min-height: 300px;">
		<figcaption class="card-body">Image caption 3</figcaption>
	</figure>
</div>
```

Call the plugin with `parallax` setting
```js
$(function(){
	$('.slider-container').loopslider({
		visibleItems: 1
		,pagination: true
		,navigation: true
		,parallax: {
			/* 
			 * Selector for an element which contains background image.
			 * '>*' is default value and corresponds to a root slide element
			 */
			e: '>*'
			/* 
			 * Index of background shift (1 is default).
			 * Might be in range from 0.1 to 1 
			 */
			,index: .8
		}
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
	,fullscreen: false //If true sets the height of the slides equal of a viewport height
	,parallax: null
	
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
Copyright (c) 2018 Pavel Khoroshkov. Licensed under the [MIT license](https://github.com/pgooood/loopslider/blob/master/LICENSE).