/*!
 *  Kwicks: Sexy Sliding Panels for jQuery - v2.1.0
 *  http://devsmash.com/projects/kwicks
 *
 *  Copyright 2013 Jeremy Martin (jmar777)
 *  Contributors: Duke Speer (Duke3D), Guillermo Guerrero (gguerrero)
 *  Released under the MIT license
 *  http://www.opensource.org/licenses/mit-license.php
 */

(function($) {

	/**
	 *  API methods for the plugin
	 */
	var methods = {
		init: function(opts) {
			var defaults = {
				// general options:
				maxSize: -1,
				minSize: -1,
				spacing: 5,
				duration: 500,
				isVertical: false,
				easing: undefined,
				autoResize: true,
				behavior: null,
				// menu behavior options:
				delayMouseIn: 0,
				delayMouseOut: 0,
				selectOnClick: true,
				deselectOnClick: false,
				// slideshow behavior options:
				interval: 2500,
				interactive: true
			};
			var o = $.extend(defaults, opts);

			// validate and normalize options
			if (o.minSize !== -1 && o.maxSize !== -1)
				throw new Error('Kwicks options minSize and maxSize may not both be set');
			if (o.behavior && o.behavior !== 'menu' && o.behavior !== 'slideshow')
				throw new Error('Unrecognized Kwicks behavior specified: ' + o.behavior);
			$.each(['minSize', 'maxSize', 'spacing'], function(i, prop) {
				var val = o[prop];
				switch (typeof val) {
					case 'number':
						o[prop + 'Units'] = 'px';
						break;
					case 'string':
						if (val.slice(-1) === '%') {
							o[prop + 'Units'] = '%';
							o[prop] = +val.slice(0, -1) / 100;
						} else if (val.slice(-2) === 'px') {
							o[prop + 'Units'] = 'px';
							o[prop] = +val.slice(0, -2);	
						} else {
							throw new Error('Invalid value for Kwicks option ' + prop + ': ' + val);
						}
						break;
					default:
						throw new Error('Invalid value for Kwicks option ' + prop + ': ' + val);
				}
			});
						
			return this.each(function() {
				$(this).data('kwicks', new Kwick(this, o));
			});
		},
		expand: function(index, opts) {
			var self = this;

			if (typeof index === 'object') {
				opts = index;
				index = undefined;
			}

			var delay = opts && opts.delay || 0;
			
			return this.each(function() {
				var $this = $(this),
					kwick = $this.data('kwicks');

				// assume this is the container
				if (kwick) {
					index = typeof index === 'number' ? index : -1;
				}
				// otherwise, assume we have a panel
				else if (kwick = $this.parent().data('kwicks')) {
					index = $this.index();
				} else {
					return;
				}

				var expand = function() {
					// bail out if the panel is already expanded
					if (index === kwick.expandedIndex) return;

					var $panels = kwick.$panels,
						expanded = $panels[index] || null;

					kwick.$container.trigger('expand.kwicks', {
						index: index,
						expanded: expanded,
						collapsed: $panels.not(expanded).get(),
						oldIndex: kwick.expandedIndex,
						oldExpanded: kwick.getExpandedPanel(),
						isAnimated: kwick.isAnimated
					});
				};

				var timeoutId = kwick.$container.data('kwicks-timeout-id');
				if (timeoutId) {
					kwick.$container.removeData('kwicks-timeout-id');
					clearTimeout(timeoutId);
				}
				if (delay > 0) {
					kwick.$container.data('kwicks-timeout-id', setTimeout(expand, delay));
				} else {
					expand();
				}
			});
		},
		expanded: function() {
			var kwick = this.first().data('kwicks');
			if (!kwick) return;
			return kwick.expandedIndex;
		},
		select: function(index) {
			return this.each(function() {
				var $this = $(this),
					kwick = $this.data('kwicks');
				
				// assume this is the container
				if (kwick) {
					index = typeof index === 'number' ? index : -1;
				}
				// otherwise, assume we have a panel
				else if (kwick = $this.parent().data('kwicks')) {
					index = $this.index();
				} else {
					return;
				}

				// don't trigger event if its already selected
				if (index !== kwick.selectedIndex) {
					var $panels = kwick.$panels,
						selected = $panels[index] || null;

					kwick.$container.trigger('select.kwicks', {
						index: index,
						selected: selected,
						unselected: $panels.not(selected).get(),
						oldIndex: kwick.selectedIndex,
						oldSelected: kwick.getSelectedPanel()
					});
				}

				// call expand
				kwick.$container.kwicks('expand', index);
			});
		},
		selected: function() {
			var kwick = this.first().data('kwicks');
			if (!kwick) return;
			return kwick.selectedIndex;
		},
		resize: function(index) {
			return this.each(function() {
				var $this = $(this),
					kwick = $this.data('kwicks');

				if (!kwick) return;

				kwick.resize();
			});
		},
		destroy: function() {
			return this.each(function() {
				var $this = $(this),
					kwick = $this.data('kwicks');

				if (!kwick) return;

				kwick.destroy();
			});
		}
	};

	/**
	 *  Expose the actual plugin
	 */
	$.fn.kwicks = function(opts) {
		if (methods[opts]) {
			return methods[opts].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof opts === 'object' || !opts) {
			return methods.init.apply(this, arguments);
		} else {
			throw new Error('Unrecognized kwicks method: ' + opts);
		}
	};

	/**
	 *  Special event for triggering default behavior on 'expand.kwicks' events
	 */
	$.event.special.expand = {
		_default: function(e, data) {
			if (e.namespace !== 'kwicks') return;
			var kwick = $(e.target).data('kwicks');
			if (kwick) kwick.expand(data.index);
		}
	};

	/**
	 *  Special event for triggering default behavior on 'select.kwicks' events
	 */
	$.event.special.select = {
		_default: function(e, data) {
			if (e.namespace !== 'kwicks') return;
			var kwick = $(e.target).data('kwicks');
			if (kwick) kwick.select(data.index);
		}
	};

	/**
	 *  Instantiates a new Kwick instance using the provided container and options.
	 */
	var Kwick = function Kwick(container, opts) {
		var self = this;

		this.opts = opts;

		// an array of callbacks to invoke if 'destroy' is invoked
		this.onDestroyHandlers = [];

		// references to our DOM elements
		var orientation = opts.isVertical ? 'vertical' : 'horizontal';
		this.$container = $(container);
		this.$panels = this.$container.children();

		// semi-smart add/remove around container classes so that we don't bork
		// the styling if/when destroy is called
		var containerClasses = ['kwicks', 'kwicks-' + orientation];
		$.each(containerClasses, function(className) {
			if (self.$container.hasClass(className)) return;
			self.$container.addClass(className);
			self.onDestroy(function() {
				self.$container.removeClass(className);
			});
		});

		// zero-based, -1 for "none"
		this.selectedIndex = this.$panels.filter('.kwicks-selected').index();
		this.expandedIndex = this.selectedIndex;

		// each instance has a primary and a secondary dimension (primary is the animated dimension)
		this.primaryDimension = opts.isVertical ? 'height' : 'width';
		this.secondaryDimension = opts.isVertical ? 'width' : 'height';

		// initialize panel sizes
		this.calculatePanelSizes();

		// likewise, we have primary and secondary alignments (all panels but the last use primary,
		// which uses the secondary alignment). this is to allow the first and last panels to have
		// fixed offsets. this reduces jittering, which is much more noticeable on the last item.
		this.primaryAlignment = opts.isVertical ? 'top' : 'left';
		this.secondaryAlignment = opts.isVertical ? 'bottom' : 'right';

		// object for creating a "master" animation loop for all panel animations
		this.$timer = $({ progress: 0 });

		// keeps track of whether or not an animation is in progress
		this.isAnimated = false;

		// the current offsets for each panel
		this.offsets = this.getOffsetsForExpanded();

		this.initStyles();
		this.initBehavior();
		this.initWindowResizeHandler();
	};

	/**
	 * Calculates size, minSize, maxSize, and spacing based on the current size of the container and
	 * the user-provided options.  The results will be stored on this.panelSize, this.panelMinSize,
	 * this.panelMaxSize, and this.panelSpacing.  This should be run on initialization and whenever
	 * the container's primary dimension may have changed in size.
	 */
	Kwick.prototype.calculatePanelSizes = function() {
		var opts = this.opts,
			containerSize = this.getContainerSize(true);

		// calculate spacing first
		if (opts.spacingUnits === '%') {
			this.panelSpacing = containerSize * opts.spacing;
		} else {
			this.panelSpacing = opts.spacing;
		}

		var numPanels = this.$panels.length,
			sumSpacing = this.panelSpacing * (numPanels - 1),
			sumPanelSize = containerSize - sumSpacing;

		this.panelSize = sumPanelSize / numPanels;

		if (opts.minSize === -1) {
			if (opts.maxSize === -1) {
				// if neither minSize or maxSize or set, then we try to pick a sensible default
				if (numPanels < 5) {
					this.panelMaxSize = containerSize / 3 * 2;
				} else {
					this.panelMaxSize = containerSize / 3;
				}
			} else if (opts.maxSizeUnits === '%') {
				this.panelMaxSize = sumPanelSize * opts.maxSize;
			} else {
				this.panelMaxSize = opts.maxSize;
			}

			// at this point we know that this.panelMaxSize is set
			this.panelMinSize = (sumPanelSize - this.panelMaxSize) / (numPanels - 1);
		} else if (opts.maxSize === -1) {
			// at this point we know that opts.minSize is set
			if (opts.minSizeUnits === '%') {
				this.panelMinSize = sumPanelSize * opts.minSize;
			} else {
				this.panelMinSize = opts.minSize;
			}

			// at this point we know that this.panelMinSize is set
			this.panelMaxSize = sumPanelSize - (this.panelMinSize * (numPanels - 1));
		}
	};

	/**
	 *  Returns the calculated panel offsets based on the currently expanded panel.
	 */
	Kwick.prototype.getOffsetsForExpanded = function() {
		// todo: cache the offset values
		var expandedIndex = this.expandedIndex,
			numPanels = this.$panels.length,
			spacing = this.panelSpacing,
			size = this.panelSize,
			minSize = this.panelMinSize,
			maxSize = this.panelMaxSize;

		//first panel is always offset by 0
		var offsets = [0];

		for (var i = 1; i < numPanels; i++) {
			// no panel is expanded
			if (expandedIndex === -1) {
				offsets[i] = i * (size + spacing);
			}
			// this panel is before or is the expanded panel
			else if (i <= expandedIndex) {
				offsets[i] = i * (minSize + spacing);
			}
			// this panel is after the expanded panel
			else {
				offsets[i] = maxSize + (minSize * (i - 1)) + (i * spacing);
			}
		}

		return offsets;
	};

	/**
	 *  Sets the style attribute on the specified element using the provided value.  This probably
	 *  doesn't belong on Kwick.prototype, but here it is...
	 */
	Kwick.prototype.setStyle = (function() {
		if ($.support.style) {
			return function(el, style) { el.setAttribute('style', style); };
		} else {
			return function (el, style) { el.style.cssText = style; };
		}
	})();

	/**
	 *  Updates the offset and size styling of each panel based on the current values in
	 *  `this.offsets`.  Also does some special handling to convert panels to absolute positioning
	 *  the first time this is invoked.
	 */
	Kwick.prototype.updatePanelStyles = function() {
		var offsets = this.offsets,
			$panels = this.$panels,
			pDim = this.primaryDimension,
			pAlign = this.primaryAlignment,
			sAlign = this.secondaryAlignment,
			spacing = this.panelSpacing,
			containerSize = this.getContainerSize();

		// the kwicks-processed class ensures that panels are absolutely positioned, but on our
		// first pass we need to set offsets, width|length, and positioning atomically to prevent
		// mid-update repaints
		var stylePrefix = !!this._stylesInited ? '' : 'position:absolute;',
			offset, size, prevOffset, style;

		// loop through remaining panels
		for (var i = $panels.length; i--;) {
			prevOffset = offset;
			// todo: maybe we do one last pass at the end and round offsets, rather than on every
			// update
			offset = Math.round(offsets[i]);
			if (i === $panels.length - 1) {
				size = containerSize - offset;
				style = sAlign + ':0;' + pDim + ':' + size + 'px;';
			} else {
				size = prevOffset - offset - spacing;
				style = pAlign + ':' + offset + 'px;' + pDim + ':' + size + 'px;';
			}
			this.setStyle($panels[i], stylePrefix + style);
		}

		if (!this._stylesInited) {
			this.$container.addClass('kwicks-processed');
			this._stylesInited = true;
		}
	};

	/**
	 *  Sets initial styles on the container element and panels
	 */
	Kwick.prototype.initStyles = function() {
		var opts = this.opts,
			$container = this.$container,
			$panels = this.$panels,
			numPanels = $panels.length,
			pDim = this.primaryDimension,
			sDim = this.secondaryDimension;

		this.updatePanelStyles();
	};

	/**
	 *  Assuming for a moment that out-of-the-box behaviors aren't a horrible idea, this method
	 *  encapsulates the initialization logic thereof.
	 */
	Kwick.prototype.initBehavior = function() {
		if (!this.opts.behavior) return;

		switch (this.opts.behavior) {
			case 'menu':
				this.initMenuBehavior();
				break;
			case 'slideshow':
				this.initSlideshowBehavior();
				break;
			default:
				throw new Error('Unrecognized behavior option: ' + this.opts.behavior);
		}
	};

	/**
	 * Initializes the menu behavior.
	 */
	Kwick.prototype.initMenuBehavior = function() {
		var self = this,
			opts = self.opts;

		this.addEventHandler(this.$container, 'mouseleave', function() {
			self.$container.kwicks('expand', -1, { delay: opts.delayMouseOut });
		});

		this.addEventHandler(this.$panels, 'mouseenter', function() {
			$(this).kwicks('expand', { delay: opts.delayMouseIn });
		});

		if (!opts.selectOnClick && !opts.deselectOnClick) return;

		this.addEventHandler(this.$panels, 'click', function() {
			var $this = $(this),
				isSelected = $this.hasClass('kwicks-selected');

			if (isSelected && opts.deselectOnClick) {
				$this.parent().kwicks('select', -1);
			} else if (!isSelected && opts.selectOnClick) {
				$this.kwicks('select');
			}
		});
	};

	/**
	 * Initializes the slideshow behavior.
	 */
	Kwick.prototype.initSlideshowBehavior = function() {
		var self = this,
			numSlides = this.$panels.length,
			curSlide = 0,
			// flag to handle weird corner cases
			running = false,
			intervalId;

		var start = function() {
			if (running) return;
			intervalId = setInterval(function() {
				self.$container.kwicks('expand', ++curSlide % numSlides);
			}, self.opts.interval);
			running = true;
		};
		var pause = function() {
			clearInterval(intervalId);
			running = false;
		};

		start();
		this.onDestroy(pause);

		if (!this.opts.interactive) return;

		this.addEventHandler(this.$container, 'mouseenter', pause);
		this.addEventHandler(this.$container, 'mouseleave', start);
		this.addEventHandler(this.$panels, 'mouseenter', function() {
			curSlide = $(this).kwicks('expand').index();
		});
	};

	/**
	 * Sets up a throttled window resize handler that triggers resize logic for the panels
	 * todo: hideous code, needs refactor for the eye bleeds
	 */
	Kwick.prototype.initWindowResizeHandler = function() {
		if (!this.opts.autoResize) return;

		var self = this,
			prevTime = 0,
			execScheduled = false,
			$window = $(window);

		var onResize = function(e) {
			// if there's no event, then this is a scheduled from our setTimeout
			if (!e) { execScheduled = false; }

			// if we've already run in the last 20ms, then delay execution
			var now = +new Date();
			if (now - prevTime < 20) {
				// if we already scheduled a run, don't do it again
				if (execScheduled) return;
				setTimeout(onResize, 20 - (now - prevTime));
				execScheduled = true;
				return;
			}

			// throttle rate is satisfied, go ahead and run
			prevTime = now;
			self.resize();			
		}

		this.addEventHandler($window, 'resize', onResize);
	};

	/**
	 * Returns the size in pixels of the container's primary dimension. This value is cached as it
	 * is used repeatedly during animation loops, but the cache can be cleared by passing `true`.
	 * todo: benchmark to see if this caching business is even at all necessary.
	 */
	Kwick.prototype.getContainerSize = function(clearCache) {
		var containerSize = this._containerSize;
		if (clearCache || !containerSize) {
			containerSize = this._containerSize = this.$container[this.primaryDimension]();
		}
		return containerSize;
	};

	/**
	 *  Gets a reference to the currently expanded panel (if there is one)
	 */
	Kwick.prototype.getExpandedPanel = function() {
		return this.$panels[this.expandedIndex] || null;
	};

	/**
	 *  Gets a reference to the currently collapsed panels
	 */
	Kwick.prototype.getCollapsedPanels = function() {
		return this.$panels.not(this.getExpandedPanel()).get();
	};

	/**
	 *  Gets a reference to the currently selected panel (if there is one)
	 */
	Kwick.prototype.getSelectedPanel = function() {
		return this.$panels[this.selectedIndex] || null;
	};

	/**
	 * Gets a reference to the currently unselected panels
	 */
	Kwick.prototype.getUnselectedPanels = function() {
		return this.$panels.not(this.getSelectedPanel()).get();
	};

	/**
	 * Registers a handler to be invoked if/when 'destroy' is invoked
	 */
	Kwick.prototype.onDestroy = function(handler) {
		this.onDestroyHandlers.push(handler);
	};

	/**
	 * Adds an event handler and automatically registers it to be removed if/when
	 * the plugin is destroyed.
	 */
	Kwick.prototype.addEventHandler = function($el, eventName, handler) {
		$el.on(eventName, handler);
		this.onDestroy(function() {
			$el.off(eventName, handler);
		});
	};

	/**
	 * "Destroys" this Kwicks instance plugin by performing the following:
	 * 1) Stops any currently running animations
	 * 2) Invokes all destroy handlers
	 * 3) Clears out all style attributes on panels
	 * 4) Removes all kwicks class names from panels and container
	 * 5) Removes the 'kwicks' data value from the container
	 */
	Kwick.prototype.destroy = function(handler) {
		this.$timer.stop();
		for (var i = 0, len = this.onDestroyHandlers.length; i < len; i++) {
			this.onDestroyHandlers[i]();
		}
		this.$panels
			.attr('style', '')
			.removeClass('kwicks-expanded kwicks-selected kwicks-collapsed');
		this.$container
			// note: kwicks and kwicks-<orientation> classes have extra smarts around them
			// back in the constructor
			.removeClass('kwicks-processed')
			.removeData('kwicks');
	};

	/**
	 *  Forces the panels to be updated in response to the container being resized.
	 */
	Kwick.prototype.resize = function(index) {
		// bail out if container size hasn't changed
		if (this.getContainerSize() === this.getContainerSize(true)) return;

		this.calculatePanelSizes();
		this.offsets = this.getOffsetsForExpanded();

		// if the panels are currently being animated, we'll just set a flag that can be detected
		// during the next animation step
		if (this.isAnimated) {
			this._dirtyOffsets = true;
		} else {
			// otherwise update the styles immediately
			this.updatePanelStyles();
		}
	};

	/**
	 *  Selects the panel with the specified index (use -1 to select none)
	 */
	Kwick.prototype.select = function(index) {
		// make sure the panel isn't already selected
		if (index === this.selectedIndex) return;

		$(this.getSelectedPanel()).removeClass('kwicks-selected');
		this.selectedIndex = index;
		$(this.getSelectedPanel()).addClass('kwicks-selected');
	};

	/**
	 *  Expands the panel with the specified index (use -1 to expand none)
	 */
	Kwick.prototype.expand = function(index) {
		var self = this,
			// used for expand-complete event later on
			oldIndex = this.expandedIndex,
			oldExpanded = this.getExpandedPanel();

		// if the index is -1, then default it to the currently selected index (which will also be
		// -1 if no panels are currently selected)
		if (index === -1) index = this.selectedIndex;

		// make sure the panel isn't already expanded
		if (index === this.expandedIndex) return;

		$(this.getExpandedPanel()).removeClass('kwicks-expanded');
		$(this.getCollapsedPanels()).removeClass('kwicks-collapsed');
		this.expandedIndex = index;
		$(this.getExpandedPanel()).addClass('kwicks-expanded');
		$(this.getCollapsedPanels()).addClass('kwicks-collapsed');

		// handle panel animation
		var $timer = this.$timer,
			numPanels = this.$panels.length,
			startOffsets = this.offsets.slice(),
			offsets = this.offsets,
			targetOffsets = this.getOffsetsForExpanded();

		$timer.stop()[0].progress = 0;
		this.isAnimated = true;
		$timer.animate({ progress: 1 }, {
			duration: this.opts.duration,
			easing: this.opts.easing,
			step: function(progress) {
				// check if we've resized mid-animation (yes, we're thorough)
				if (self._dirtyOffsets) {
					offsets = self.offsets;
					targetOffsets = self.getOffsetsForExpanded();
					self._dirtyOffsets = false;
				}
				offsets.length = 0;
				for (var i = 0; i < numPanels; i++) {
					var targetOffset = targetOffsets[i],
						newOffset = targetOffset - ((targetOffset - startOffsets[i]) * (1 - progress));
					offsets[i] = newOffset;
				}
				self.updatePanelStyles();
			},
			complete:  function() {
				self.isAnimated = false;
				self.$container.trigger('expand-complete.kwicks', {
					index: index,
					expanded: self.getExpandedPanel(),
					collapsed: self.getCollapsedPanels(),
					oldIndex: oldIndex,
					oldExpanded: oldExpanded,
					// note: this will always be false but is included to match expand event
					isAnimated: false
				});
			}
		});
	};

})(jQuery);
