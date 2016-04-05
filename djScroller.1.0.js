(function ($) {

    $.fn.djScroller = function (options) {
        // Settings
        var settings = $.extend({
            // These are the defaults.
            scrollTop: 0,
            autoScroll: false,
            scrollWait: 600
        }, options);
		var items = this;
        //auto scroll option
        if (settings.autoScroll) {
            $(window).scroll(function () {
                clearTimeout($.data(this, 'scrollTimer'));
				
				$.data(this, 'scrollTimer', setTimeout(function () {
					//alert("working");
					if($(window).width() <= 992 ) return;
                    if ($(".header").height() < 75) {
                        settings.scrollTop = 75;
                    } else {
                        settings.scrollTop = 45;
                    }
                    var doScroll = false;
                    var itemToScroll = 0;
                    var scrollTop = 0;

                    // check each item position
                    for (var count = 0; count < $(items).length - 1; count++) {
                        var currentItem = $(items)[count];
                        var windowHeight = $(window).height() - 75;
                        var scrollTopPos = $(window).scrollTop() + 75;
                        var bottomPos = scrollTopPos + windowHeight;
                        var middlePos = scrollTopPos + parseInt(windowHeight / 2);
                        var sectionID = "#" + $(currentItem).attr("href");
                        contSectionID = sectionID;
                        var topPos = $(sectionID).offset().top;

                        if (topPos > scrollTopPos && topPos <= middlePos) {
                            itemToScroll = count + 2;
                            doScroll = true;
                            break;
                        } else if (topPos >= middlePos && topPos <= bottomPos) {
                            doScroll = true;
                            itemToScroll = count + 1;
                            break;
                        }
                    }
				
                    if (doScroll) {
                        var itemID = "#section-" + itemToScroll;
						var itemFind = "section-" + itemToScroll;
						//alert(itemFind);
                        if (itemToScroll == 1) {
                            scrollTop = $(itemID).offset().top - 45;
                        } else if (itemToScroll == 2) {
                            scrollTop = $(itemID).offset().top - 45;
                        } else if (itemToScroll == 3) {
                            scrollTop = $(itemID).offset().top - 75;
                        } else if (itemToScroll == 4) {
                            scrollTop = $(itemID).offset().top - 75;
                        }

                        if (scrollTop != 0) {
                           // $('html,body').animate({ scrollTop: scrollTop });
                        }
						$('.link-nav').removeClass('active');
						
						$(".nav").find('a').each(function() {
							
							if ($(this).attr('href') == itemFind) {
							
								$(this).addClass('active');
							
							}
							
						
						
						});
						
						
                    }
				
                }, settings.scrollWait));
            });
        }

        return this.each(function () {
            // click function of href.
            $(this).click(function () {
                var sectionID = "#" + $(this).attr("href");
				var itemFind = $(this).attr("href");
                var topPos = $(sectionID).offset().top;
				var settingScrollTop = settings.scrollTop;
				if(settings.scrollTop == 35) {
					if(sectionID == "#section-2") {
						settingScrollTop = 45;
					}
					else if(sectionID == "#section-d2") {
						settingScrollTop = 250;
					}
					else if(sectionID == "#section-n2") {
						settingScrollTop = 75;
					}else if(sectionID == "#section-download") {
						settingScrollTop = 136;
					} else {
						settingScrollTop = 75;
					}
				}
				//alert(topPos + "  " + settings.scrollTop);
                topPos = parseInt(topPos) - parseInt(settingScrollTop);
				$('html,body').animate({ scrollTop: topPos },{"duration":800,"easing":"easeInOutCirc"});
				$('.link-nav').removeClass('active');
					$(".nav").find('a').each(function() {
							
							if ($(this).attr('href') == itemFind) {
							
								$(this).addClass('active');
							
							}
							
						
						
						});
				return false;
            });

        });

    };

} (jQuery));
