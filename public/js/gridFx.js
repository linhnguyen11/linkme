$(document).ready(function() {
    'use strict';
    var support = { animations : Modernizr.cssanimations },
    animEndEventNames = {
        'WebkitAnimation' : 'webkitAnimationEnd',
        'OAnimation' : 'oAnimationEnd',
        'msAnimation' : 'MSAnimationEnd',
        'animation' : 'animationend'
    },
// animation end event name
    animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

    function inViewport(el) {
        var elH = el.innerHeight(),
            scrolled = $(window).scrollTop(),
            viewed = scrolled +  $(window).height(),
            elTop = el.offset().top,
            elBottom = elTop + elH;
        return elTop <= viewed && elBottom >= scrolled;
    }
    function GridItem(el){
        this.el = el;
        this.anchor = el.find('figure');
        this.image = el.find('img');
        this.fig = el.find('figcaption');
    }
    GridItem.prototype.addCurtain = function(){
        if(!this.image) return;
        $('<div class="curtain"></div>').appendTo(this.el);
        this.curtain = this.el.find('.curtain');
        this.image.attr('id','imageId');

        var rgb = new ColorFinder( function favorHue(r,g,b) {
            // exclude white
            //if (r>245 && g>245 && b>245) return 0;
            return (Math.abs(r-g)*Math.abs(r-g) + Math.abs(r-b)*Math.abs(r-b) + Math.abs(g-b)*Math.abs(g-b))/65535*50+1;
        } ).getMostProminentColor(document.getElementById('imageId'));
        if( rgb.r && rgb.g && rgb.b ) {
            this.curtain.css('background-color', 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')');
        }
        this.image.removeAttr('id');
    }
    GridItem.prototype.delay = function(time){
        if(this.curtain){
            this.curtain.css('-webkit-animation-delay',time+'ms');
            this.curtain.css('animation-delay',time+'ms');
        }
        if(this.image){
            this.image.css('-webkit-animation-delay',time+'ms');
            this.image.css('animation-delay',time+'ms');
        }
        if(this.fig){
            this.fig.css('-webkit-animation-delay',time+'ms');
            this.fig.css('animation',time+'ms');
        }
    }
    function GridScrollFx(el){
        this.el = el;
        this._init();
    }
    GridScrollFx.prototype.options = {
        minDelay: 0,
        maxDelay: 500
    }
    GridScrollFx.prototype._init = function() {
        var self = this;
        var items = [];
        this.el.children().each(function () {
            var item = new GridItem($(this));
            items.push(item);
        });
        this.items = items;
        this.itemsCount = this.items.length;
        this.itemsRendered = 0;
        this.didScroll = false;

        this.el.imagesLoaded( function() {
            self.el.addClass('loaded');
            //self.el.masonry({
            //    // options
            //    itemSelector: '.grid-item',
            //    isFitWidth: true,
            //    transitionDuration: 0
            //});
            self.items.forEach(function (item) {
                if (inViewport(item.el)) {
                    ++self.itemsRenderedCount;
                    item.el.addClass('shown');
                }
                else {
                    item.addCurtain();
                    // add random delay
                    item.delay(Math.random() * ( self.options.maxDelay - self.options.minDelay ) + self.options.minDelay);
                }
            });
            var onScrollFn = function() {
                if( !self.didScroll ) {
                    self.didScroll = true;
                    setTimeout( function() { self._scrollPage(); }, 200 );
                }

                if( self.itemsRenderedCount === self.itemsCount ) {
                    $(window).unbind( 'scroll', onScrollFn);
                }
            }
            // animate the items inside the viewport (on scroll)
            $(window).bind( 'scroll', onScrollFn);
            // check if new items are in the viewport after a resize
            $(window).bind( 'resize', function() { self._resizeHandler(); });

        });

    }
    GridScrollFx.prototype._scrollPage = function() {

        var self = this;
        this.items.forEach( function( item ) {
            if(!item.el.hasClass('shown') && !item.el.hasClass('animate') && inViewport(item.el) ) {
                ++self.itemsRenderedCount;
                if(!item.el.find('div').hasClass('curtain')) {
                    item.el.addClass('shown');
                    return;
                };
                item.el.addClass('animate');

                //after animation ends add class shown
                var onEndAnimationFn = function( ev ) {
                    if( support.animations ) {
                        this.removeEventListener( animEndEventName, onEndAnimationFn );
                    }
                   item.el.removeClass('animate');
                   item.el.addClass('shown');
                };

                if( support.animations ) {
                    item.el.children('.curtain').bind( animEndEventName, onEndAnimationFn );
                }
                else {
                    onEndAnimationFn();
                }
            }
        });
        this.didScroll = false;
    }

    GridScrollFx.prototype._resizeHandler = function() {
        $('#navbar-import').width($('#myCarousel').width());
        var self = this;
        function delayed() {
            self._scrollPage();
            self.resizeTimeout = null;
        }
        if ( this.resizeTimeout ) {
            clearTimeout( this.resizeTimeout );
        }
        this.resizeTimeout = setTimeout( delayed, 1000 );
    }
    window.GridScrollFx = GridScrollFx;
});

