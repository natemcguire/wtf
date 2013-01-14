// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.


//gallery plugin
(function($) {
	$.fn.gallery = function(options) {
		var args = Array.prototype.slice.call(arguments);
		args.shift();
		this.each(function(){
			if(this.galControl && typeof options === 'string') {
				if(typeof this.galControl[options] === 'function') {
					this.galControl[options].apply(this.galControl, args);
				}
			} else {
				this.galControl = new Gallery(this, options);
			}
		});
		return this;
	};
	function Gallery(context, options) { this.init(context, options); };
	Gallery.prototype = {
		options:{},
		init: function (context, options){
			this.options = $.extend({
				duration: 700,
				slideElement:1,
				autoRotation: false,
				effect: false,
				listOfSlides: '.list > li',
				switcher: false,
				autoSwitcher: false,
				disableBtn: false,
				nextBtn: 'a.link-next, a.btn-next, a.next',
				prevBtn: 'a.link-prev, a.btn-prev, a.prev',
				circle: true,
				clone: false,
				direction: false,
				event: 'click'
			}, options || {});
			var self = this;
			this.context = $(context);
			this.els = this.context.find(this.options.listOfSlides);
			this.list = this.els.parent();
			this.count = this.els.length;
			this.autoRotation = this.options.autoRotation;
			this.direction = this.options.direction;
			this.duration = this.options.duration;
			if (this.options.clone) {
				this.list.append(this.els.clone());
				this.list.prepend(this.els.clone());
				this.els = this.context.find(this.options.listOfSlides);
			}
			this.wrap = this.list.parent();
			if (this.options.nextBtn) this.nextBtn = this.context.find(this.options.nextBtn);
			if (this.options.prevBtn) this.prevBtn = this.context.find(this.options.prevBtn);

			this.calcParams(this);
			
			if (this.options.autoSwitcher) {
				this.switcherHolder = this.context.find(this.options.switcher).empty();
				this.switchPattern = $('<ul class="'+ (this.options.autoSwitcher == true ? '' : this.options.autoSwitcher) +'"></ul>');
				for (var i=0;i<this.max+1;i++){
					$('<li><a href="#">'+i+'</a></li>').appendTo(this.switchPattern);
				}
				this.switchPattern.appendTo(this.switcherHolder);
				this.switcher = this.context.find(this.options.switcher).find('li');
				this.active = 0;
			} else {
				if (this.options.switcher) {
					this.switcher = this.context.find(this.options.switcher);
					this.active = this.switcher.index(this.switcher.filter('.active:eq(0)'));
				}
				else this.active = this.els.index(this.els.filter('.active:eq(0)'));
			}
			if (this.active < 0) this.active = 0;
			this.last = this.active;
			if (this.options.switcher) this.switcher.removeClass('active').eq(this.active).addClass('active');
			if (this.options.clone) this.active += this.count;
			
			if (this.options.effect) this.els.css({opacity: 0}).removeClass('active').eq(this.active).addClass('active').css({opacity: 1}).css('opacity', 'auto');
			else {
				if (this.direction) this.list.css({marginTop: -(this.mas[this.active])});
				else this.list.css({marginLeft: -(this.mas[this.active])});
			}
			
			
			if (this.options.nextBtn) this.initEvent(this, this.nextBtn,true);
			if (this.options.prevBtn) this.initEvent(this, this.prevBtn,false);
			
			this.initWindow(this,$(window));
			
			if (this.autoRotation) this.runTimer(this);
			
			if (this.options.switcher) this.initEventSwitcher(this, this.switcher);
			if (this.options.disableBtn && !this.options.circle && !this.options.clone) this.disableControls();
		},
		calcParams: function(self){
			this.mas = [];
			this.sum = 0;
			this.max = this.count-1;
			this.width = 0;
			this.els.each(function(){self.mas.push(self.width);self.width += self.direction?$(this).outerHeight(true):$(this).outerWidth(true);self.sum+=self.direction?$(this).outerHeight(true):$(this).outerWidth(true);});
			this.finish = this.direction?this.sum-this.wrap.outerHeight():this.sum-this.wrap.outerWidth();
			for (var i=0;i<this.count;i++){
				if (this.mas[i]>=this.finish) {
					this.max = i;
					break;
				}
			}
		},
		changeSettings: function(set,val){
			this[set] = val;
		},
		fadeElement: function(){
			this.els.eq(this.last).animate({opacity:0}, {queue:false, duration: this.duration});
			this.els.removeClass('active').eq(this.active).addClass('active').animate({
				opacity:1
			}, {queue:false, duration: this.duration, complete: function(){
				$(this).css('opacity','auto');
			}});
			if (this.options.switcher) this.switcher.removeClass('active').eq(this.active).addClass('active');
			this.last = this.active;
		},
		scrollElement: function(f){
			if (this.direction) this.list.animate({marginTop: f ? -this.finish : -(this.mas[this.active])}, {queue:false, duration: this.duration});
			else this.list.animate({marginLeft: f ? -this.finish : -(this.mas[this.active])}, {queue:false, duration: this.duration});
			if (this.options.switcher) this.switcher.removeClass('active').eq(this.options.clone ? this.active < this.count ? this.active/this.options.slideElement : this.active >= this.count*2 ? (this.active - this.count*2)/this.options.slideElement : (this.active - this.count)/this.options.slideElement : this.active/this.options.slideElement).addClass('active');
		},
		runTimer: function($this){
			if($this._t) clearTimeout($this._t);
			$this._t = setInterval(function(){
				$this.nextStep();
			}, this.autoRotation);
		},
		initEventSwitcher: function($this, el){
			el.bind($this.options.event, function(){
				if (!$(this).hasClass('active')){
					$this.active = $this.switcher.index($(this)) * $this.options.slideElement;
					if ($this.options.clone) $this.active += $this.count;
					$this.initMove();
				}
				return false;
			});
		},
		initEvent: function($this, addEventEl, dir){
			addEventEl.bind($this.options.event, function(){
				if (dir) $this.nextStep();
				else $this.prevStep();
				if($this._t) clearTimeout($this._t);
				if ($this.autoRotation) $this.runTimer($this);
				return false;
			});
		},
		disableControls: function(){
			this.prevBtn.removeClass(this.options.disableBtn);
			this.nextBtn.removeClass(this.options.disableBtn);
			if (this.active>=this.max) this.nextBtn.addClass(this.options.disableBtn);
			if (this.active<=0) this.prevBtn.addClass(this.options.disableBtn);
		},
		initMove: function(){
			var f = false;
			if (this.active >= this.max && !this.options.clone) {
				f = true;
				this.active = this.max;
			}
			if(this._t) clearTimeout(this._t);
			if (!this.options.effect) this.scrollElement(f);
			else this.fadeElement();
			if (this.autoRotation) this.runTimer(this);
			if (this.options.disableBtn && !this.options.circle && !this.options.clone) this.disableControls();
		},
		nextStep:function(){
			var f = false;
			this.active = this.active + this.options.slideElement;
			if (this.options.disableBtn && !this.options.circle && !this.options.clone) this.disableControls();
			if (this.options.clone){
				if (this.active > this.count*2) {
					if (this.direction) this.list.css({marginTop:-this.mas[this.count]});
					else this.list.css({marginLeft:-this.mas[this.count]});
					this.active = this.count+this.options.slideElement;
				}
			} else {
				if (this.active >= this.max) {
					if (this.options.circle) {
						if (this.active > this.max) this.active = 0;
						else {
							this.active = this.max;
							f = true
						}
					}
					else {
						this.active = this.max;
						f = true;
					}
				}
			}
			if (!this.options.effect) this.scrollElement(f);
			else this.fadeElement();
		},
		prevStep: function(){
			var f = false;
			this.active = this.active - this.options.slideElement;
			if (this.options.disableBtn && !this.options.circle && !this.options.clone) this.disableControls();
			if (this.options.clone){
				if (this.active < 0) {
					if (this.direction) this.list.css({marginTop:-this.mas[this.count]});
					else this.list.css({marginLeft:-this.mas[this.count]});
					this.active = this.count-1;
				}
			} else {
				if (this.active < 0) {
					if (this.options.circle) {
						this.active = this.max;
						f = true;
					}
					else this.active = 0;
				}
			}
			if (!this.options.effect) this.scrollElement(f);
			else this.fadeElement();
		},
		initWindow: function($this,$window){
			$window.focus($.proxy(this.play,this));
			$window.blur($.proxy(this.stop,this));
		},
		stop: function(){
			if (this._t) clearTimeout(this._t);
		},
		play: function(){
			if (this._t) clearTimeout(this._t);
			if (this.autoRotation) this.runTimer(this);
		}
	}
}(jQuery));


//////

// clear inputs on focus
function initInputs() {
	// replace options
	var opt = {
		clearInputs: true,
		clearTextareas: true,
		clearPasswords: true
	}
	// collect all items
	var inputs = [].concat(
		PlaceholderInput.convertToArray(document.getElementsByTagName('input')),
		PlaceholderInput.convertToArray(document.getElementsByTagName('textarea'))
	);
	// apply placeholder class on inputs
	for(var i = 0; i < inputs.length; i++) {
		if(inputs[i].className.indexOf('default') < 0) {
			var inputType = PlaceholderInput.getInputType(inputs[i]);
			if((opt.clearInputs && inputType === 'text') ||
				(opt.clearTextareas && inputType === 'textarea') || 
				(opt.clearPasswords && inputType === 'password')
			) {
				new PlaceholderInput({
					element:inputs[i],
					wrapWithElement:false,
					showUntilTyping:false,
					getParentByClass:false,
					placeholderAttr: inputs[i].getAttribute('placeholder') ? 'placeholder' : 'value'
				});
			}
		}
	}
}

// input type placeholder class
;(function(){
	var placeholderCollection = [];
	PlaceholderInput = function() {
		this.options = {
			element:null,
			showUntilTyping:false,
			wrapWithElement:false,
			getParentByClass:false,
			placeholderAttr:'value',
			inputFocusClass:'focus',
			inputActiveClass:'text-active',
			parentFocusClass:'parent-focus',
			parentActiveClass:'parent-active',
			labelFocusClass:'label-focus',
			labelActiveClass:'label-active',
			fakeElementClass:'input-placeholder-text'
		}
		placeholderCollection.push(this);
		this.init.apply(this,arguments);
	}
	PlaceholderInput.convertToArray = function(collection) {
		var arr = [];
		for (var i = 0, ref = arr.length = collection.length; i < ref; i++) {
			arr[i] = collection[i];
		}
		return arr;
	}
	PlaceholderInput.getInputType = function(input) {
		return (input.type ? input.type : input.tagName).toLowerCase();
	}
	PlaceholderInput.refreshAllInputs = function(except) {
		for(var i = 0; i < placeholderCollection.length; i++) {
			if(except !== placeholderCollection[i]) {
				placeholderCollection[i].refreshState();
			}
		}
	}
	PlaceholderInput.prototype = {
		init: function(opt) {
			this.setOptions(opt);
			if(this.element && this.element.PlaceholderInst) {
				this.element.PlaceholderInst.refreshClasses();
			} else {
				this.element.PlaceholderInst = this;
				if(this.elementType == 'text' || this.elementType == 'password' || this.elementType == 'textarea') {
					this.initElements();
					this.attachEvents();
					this.refreshClasses();
				}
			}
		},
		setOptions: function(opt) {
			for(var p in opt) {
				if(opt.hasOwnProperty(p)) {
					this.options[p] = opt[p];
				}
			}
			if(this.options.element) {
				this.element = this.options.element;
				this.elementType = PlaceholderInput.getInputType(this.element);
				this.wrapWithElement = (this.elementType === 'password' || this.options.showUntilTyping ? true : this.options.wrapWithElement || this.options.placeholderAttr === 'placeholder');
				this.setOrigValue( this.options.placeholderAttr == 'value' ? this.element.defaultValue : this.element.getAttribute(this.options.placeholderAttr) );
			}
		},
		setOrigValue: function(value) {
			this.origValue = value;
		},
		initElements: function() {
			// create fake element if needed
			if(this.wrapWithElement) {
				this.element.value = '';
				this.element.removeAttribute(this.options.placeholderAttr);
				this.fakeElement = document.createElement('span');
				this.fakeElement.className = this.options.fakeElementClass;
				this.fakeElement.innerHTML += this.origValue;
				this.fakeElement.style.color = getStyle(this.element, 'color');
				this.fakeElement.style.position = 'absolute';
				this.element.parentNode.insertBefore(this.fakeElement, this.element);
			}
			// get input label
			if(this.element.id) {
				this.labels = document.getElementsByTagName('label');
				for(var i = 0; i < this.labels.length; i++) {
					if(this.labels[i].htmlFor === this.element.id) {
						this.labelFor = this.labels[i];
						break;
					}
				}
			}
			// get parent node (or parentNode by className)
			this.elementParent = this.element.parentNode;
			if(typeof this.options.getParentByClass === 'string') {
				var el = this.element;
				while(el.parentNode) {
					if(hasClass(el.parentNode, this.options.getParentByClass)) {
						this.elementParent = el.parentNode;
						break;
					} else {
						el = el.parentNode;
					}
				}
			}
		},
		attachEvents: function() {
			this.element.onfocus = bindScope(this.focusHandler, this);
			this.element.onblur = bindScope(this.blurHandler, this);
			if(this.options.showUntilTyping) {
				this.element.onkeydown = bindScope(this.typingHandler, this);
				this.element.onpaste = bindScope(this.typingHandler, this);
			}
			if(this.wrapWithElement) this.fakeElement.onclick = bindScope(this.focusSetter, this);
		},
		togglePlaceholderText: function(state) {
			if(this.wrapWithElement) {
				this.fakeElement.style.display = state ? '' : 'none';
			} else {
				this.element.value = state ? this.origValue : '';
			}
		},
		focusSetter: function() {
			this.element.focus();
		},
		focusHandler: function() {
			clearInterval(this.checkerInterval);
			this.checkerInterval = setInterval(bindScope(this.intervalHandler,this), 1);
			this.focused = true;
			if(!this.element.value.length || this.element.value === this.origValue) {
				if(!this.options.showUntilTyping) {
					this.togglePlaceholderText(false);
				}
			}
			this.refreshClasses();
		},
		blurHandler: function() {
			clearInterval(this.checkerInterval);
			this.focused = false;
			if(!this.element.value.length || this.element.value === this.origValue) {
				this.togglePlaceholderText(true);
			}
			this.refreshClasses();
			PlaceholderInput.refreshAllInputs(this);
		},
		typingHandler: function() {
			setTimeout(bindScope(function(){
				if(this.element.value.length) {
					this.togglePlaceholderText(false);
					this.refreshClasses();
				}
			},this), 10);
		},
		intervalHandler: function() {
			if(typeof this.tmpValue === 'undefined') {
				this.tmpValue = this.element.value;
			}
			if(this.tmpValue != this.element.value) {
				PlaceholderInput.refreshAllInputs(this);
			}
		},
		refreshState: function() {
			if(this.wrapWithElement) {
				if(this.element.value.length && this.element.value !== this.origValue) {
					this.togglePlaceholderText(false);
				} else if(!this.element.value.length) {
					this.togglePlaceholderText(true);
				}
			}
			this.refreshClasses();
		},
		refreshClasses: function() {
			this.textActive = this.focused || (this.element.value.length && this.element.value !== this.origValue);
			this.setStateClass(this.element, this.options.inputFocusClass,this.focused);
			this.setStateClass(this.elementParent, this.options.parentFocusClass,this.focused);
			this.setStateClass(this.labelFor, this.options.labelFocusClass,this.focused);
			this.setStateClass(this.element, this.options.inputActiveClass, this.textActive);
			this.setStateClass(this.elementParent, this.options.parentActiveClass, this.textActive);
			this.setStateClass(this.labelFor, this.options.labelActiveClass, this.textActive);
		},
		setStateClass: function(el,cls,state) {
			if(!el) return; else if(state) addClass(el,cls); else removeClass(el,cls);
		}
	}
	
	// utility functions
	function hasClass(el,cls) {
		return el.className ? el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) : false;
	}
	function addClass(el,cls) {
		if (!hasClass(el,cls)) el.className += " "+cls;
	}
	function removeClass(el,cls) {
		if (hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
	}
	function bindScope(f, scope) {
		return function() {return f.apply(scope, arguments)}
	}
	function getStyle(el, prop) {
		if (document.defaultView && document.defaultView.getComputedStyle) {
			return document.defaultView.getComputedStyle(el, null)[prop];
		} else if (el.currentStyle) {
			return el.currentStyle[prop];
		} else {
			return el.style[prop];
		}
	}
}());

if (window.addEventListener) window.addEventListener("load", initInputs, false);
else if (window.attachEvent) window.attachEvent("onload", initInputs);


/////

var divs = new Array('content', 'sidebar'); // IDs of equalizing columns //
function scriptInit() { if (!document.getElementById) { return; } }
function addEvent(elm, evType, fn, useCapture) { 
	if (elm.addEventListener) { elm.addEventListener(evType, fn, useCapture); return true; } 
	else if (elm.attachEvent) { var r = elm.attachEvent('on' + evType, fn); return r; }
	else { elm['on' + evType] = fn; }
}
function setTall() {
	if (document.getElementById) { var maxHeight = 0; for (var i = 0; i < divs.length; i++) {
			if (document.getElementById(divs[i]) != null)
			{ var div = document.getElementById(divs[i]); div.style.height = null; if (div.offsetHeight > maxHeight) maxHeight = div.offsetHeight; }
		}
	for (var i = 0; i < divs.length; i++) {
			if (document.getElementById(divs[i]) != null)
			{ var div = document.getElementById(divs[i]); div.style.height = maxHeight + 'px'; if (div.offsetHeight > maxHeight) { div.style.height = (maxHeight - (div.offsetHeight - maxHeight)) + 'px'; } }
		}
	}
}
function initTall() {
	if (document.getElementById) { for (var i = 0; i < divs.length; i++)
		{ if (document.getElementById(divs[i]) != null) { TextResizeDetector.TARGET_ELEMENT_ID = divs[i]; break; } }
	setTall(); } 
}
addEvent(window, 'load', initTall, false);
addEvent(window, 'resize', setTall, false);
TextResizeDetector = function() {
    var el  = null;
	var iIntervalDelay  = 200;
	var iInterval = null;
	var iCurrSize = -1;
	var iBase = -1;
 	var aListeners = [];
 	var createControlElement = function() {
	 	el = document.createElement('span');
		el.id='textResizeControl';
		el.innerHTML='&nbsp;';
		el.style.position="absolute";
		el.style.left="-9999px";
		var elC = document.getElementById(TextResizeDetector.TARGET_ELEMENT_ID);
		// insert before firstChild
		if (elC)
			elC.insertBefore(el,elC.firstChild);
		iBase = iCurrSize = TextResizeDetector.getSize();
 	};

 	function _stopDetector() {
		window.clearInterval(iInterval);
		iInterval=null;
	};
	function _startDetector() {
		if (!iInterval) {
			iInterval = window.setInterval('TextResizeDetector.detect()',iIntervalDelay);
		}
	};

 	 function _detect() {
 		var iNewSize = TextResizeDetector.getSize();

 		if(iNewSize!== iCurrSize) {
			for (var 	i=0;i <aListeners.length;i++) {
				aListnr = aListeners[i];
				var oArgs = {  iBase: iBase,iDelta:((iCurrSize!=-1) ? iNewSize - iCurrSize + 'px' : "0px"),iSize:iCurrSize = iNewSize};
				if (!aListnr.obj) {
					aListnr.fn('textSizeChanged',[oArgs]);
				}
				else  {
					aListnr.fn.apply(aListnr.obj,['textSizeChanged',[oArgs]]);
				}
			}

 		}
 		return iCurrSize;
 	};
	var onAvailable = function() {
		if (!TextResizeDetector.onAvailableCount_i ) {
			TextResizeDetector.onAvailableCount_i =0;
		}

		if (document.getElementById(TextResizeDetector.TARGET_ELEMENT_ID)) {
			TextResizeDetector.init();
			if (TextResizeDetector.USER_INIT_FUNC){
				TextResizeDetector.USER_INIT_FUNC();
			}
			TextResizeDetector.onAvailableCount_i = null;
		}
		else {
			if (TextResizeDetector.onAvailableCount_i<600) {
	  	 	    TextResizeDetector.onAvailableCount_i++;
				setTimeout(onAvailable,200)
			}
		}
	};
	setTimeout(onAvailable,500);

 	return {
		 	/*
		 	 * Initializes the detector
		 	 *
		 	 * @param {String} sId The id of the element in which to create the control element
		 	 */
		 	init: function() {

		 		createControlElement();
				_startDetector();
 			},
			/**
			 * Adds listeners to the ontextsizechange event.
			 * Returns the base font size
			 *
			 */
 			addEventListener:function(fn,obj,bScope) {
				aListeners[aListeners.length] = {
					fn: fn,
					obj: obj
				}
				return iBase;
			},
			/**
			 * performs the detection and fires textSizeChanged event
			 * @return the current font size
			 * @type {integer}
			 */
 			detect:function() {
 				return _detect();
 			},
 			/**
 			 * Returns the height of the control element
 			 *
			 * @return the current height of control element
			 * @type {integer}
 			 */
 			getSize:function() {
	 				var iSize;
			 		return el.offsetHeight;


 			},
 			/**
 			 * Stops the detector
 			 */
 			stopDetector:function() {
				return _stopDetector();
			},
			/*
			 * Starts the detector
			 */
 			startDetector:function() {
				return _startDetector();
			}
 	}
 }();

/*** end TextResizeDetector */

TextResizeDetector.TARGET_ELEMENT_ID = 'doc';
TextResizeDetector.USER_INIT_FUNC = function() {
	var iBase = TextResizeDetector.addEventListener(setTall, null);
};

//////