(function($) {
    /*animation*/
    /*Shake head*/
    $.fn.shaking = function(options, complete) {
        if ($.isFunction(options)) { //no options
            complete = options;
        }
        options = $.extend($.fn.shaking.defaults, options);
        // Plugin code
        return this.each(function() {
            var rang = 50;
            $(this).animate({
                "margin-left": "-=" + rang
            }, options.speed, "easeOutQuart", function() {
                $(this).animate({
                    "margin-left": "+=" + (rang * 2)
                }, options.speed, "easeOutQuart", function() {
                    $(this).animate({
                        "margin-left": "-=" + (rang * 1.6)
                    }, options.speed, "easeOutQuart", function() {
                        $(this).animate({
                            "margin-left": "+=" + (rang * 1.2)
                        }, options.speed, "easeOutQuart", function() {
                            $(this).animate({
                                "margin-left": "-=" + (rang * 1)
                            }, options.speed, "easeOutQuart", function() {
                                $(this).animate({
                                    "margin-left": "+=" + (rang * 0.6)
                                }, options.speed, "easeOutQuart", function() {
                                    $(this).animate({
                                        "margin-left": "-=" + (rang * 0.2)
                                    }, options.speed, "easeOutQuart", function() {

                                    });
                                });
                            });
                        });
                    });
                });
            });
            // Fire the setup callback
            $.isFunction(complete) && complete.call(this);
        });
    };
    $.fn.shaking.defaults = {
        speed: 80,
    };
    $.fn.openUp = function(options, complete) {
        if ($.isFunction(options)) { //no options
            complete = options;
        }
        options = $.extend($.fn.openUp.defaults, options);
        // Plugin code
        return this.each(function() {
            //make it smaller
            var mainElement = this;
            if (options.mask) {
                var mask = $("<div />", {
                    class: "popupMask",
                    style: "height : " + $(document).height() + "px"
                }).click(function() {
                    $(mainElement).closeDown(function() {
                        $(".popupMask").fadeOut('300', function() {
                            $(".popupMask").remove();
                        });
                    });
                }).mousewheel(function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                });
                $("body").css("overflow", "hidden");
                $(this).before(mask);
            }
            $(this).find(".popup-close-btn").click(function() {
                $(mainElement).closeDown(function() {
                    $(".popupMask").fadeOut('300', function() {
                        $(".popupMask").remove();
                    });
                });
            });
            $(this).css({
                zoom: "30%",
                opacity: 0.5,
                display: "block"
            });
            $(this).animate({
                zoom: "110%",
                opacity: 1
            }, options.delay, "easeOutQuart", function() {
                $(this).animate({
                    zoom: "100%"
                }, options.delay / 4, "easeOutQuart");
            });
            // Fire the setup callback
            $.isFunction(complete) && complete.call(this);
        });
    };
    $.fn.openUp.defaults = {
        delay: 350,
        mask: true
    };
    $.fn.closeDown = function(options, complete) {
        if ($.isFunction(options)) { //no options
            complete = options;
        }
        options = $.extend($.fn.closeDown.defaults, options);
        // Plugin code
        return this.each(function() {
            $("body").css("overflow", "auto");
            $(this).animate({
                zoom: "30%",
                opacity: 0.3
            }, options.delay, "easeOutQuart", function() {
                $(this).animate({
                    opacity: 0
                }, options.delay, "easeOutQuart", function() {
                    $(this).css({
                        zoom: "100%",
                        display: "none"
                    });
                });
            });
            // Fire the setup callback
            $.isFunction(complete) && complete.call(this);
        });
    };
    $.fn.closeDown.defaults = {
        delay: 200,
    };
    $.fn.enlargeOut = function(options, complete) {
        if ($.isFunction(options)) { //no options
            complete = options;
        }
        options = $.extend($.fn.enlargeOut.defaults, options);
        // Plugin code
        return this.each(function() {
            $(this).animate({
                zoom: "110%",
                opacity: 0
            }, options.delay, "easeOutQuart", function() {
                $(this).css({
                    zoom: "100%"
                });
            });
            // Fire the setup callback
            $.isFunction(complete) && complete.call(this);
        });
    };
    $.fn.enlargeOut.defaults = {
        delay: 600,
    };
    $.fn.narrowIn = function(options, complete) {
        if ($.isFunction(options)) { //no options
            complete = options;
        }
        options = $.extend($.fn.narrowIn.defaults, options);
        // Plugin code
        return this.each(function() {
            $(this).css({
                zoom: "110%",
                opacity: 0
            });
            $(this).animate({
                zoom: "100%",
                opacity: 1
            }, options.delay, "easeOutQuart", function() {});
            // Fire the setup callback
            $.isFunction(complete) && complete.call(this);
        });
    };
    $.fn.narrowIn.defaults = {
        delay: 600,
    };
    //Loading
    $.fpLoading = function() {
        $("body").show();
        var cover = $("<div />", {
            class: "fp-loading-cover"
        }).appendTo("body");
        $(cover).mousewheel(function(e) {
            e.preventDefault();
            return false;
        });
        $("<span />", {
            class: "loading-text",
            text: "Loading..."
        }).appendTo(cover);

    };
    $.fpLoaded = function() {
        $(".fp-loading-cover").fadeOut(500, "easeOutQuart", function() {
            $(".fp-loading-cover").remove();
        });
    };
    $.fn.elementLoading = function(options, complete) {
        if ($.isFunction(options)) { //no options
            complete = options;
        }
        options = $.extend($.fn.elementLoading.defaults, options);
        // Plugin code
        return this.each(function() {
            var loadingCover = $("<div />", {
                class: "element-loading-cover"
            });
            $("<img />", {
                src: "./loading.gif",
                style: "top : " + options.top
            }).appendTo(loadingCover);
            $(this).css({ position: "relative" });
            $(this).append(loadingCover);

            // Fire the setup callback
            $.isFunction(complete) && complete.call(this);
        });
    };
    $.fn.elementLoading.defaults = {
        top: "50%"
    };
    $.fn.elementLoaded = function(options, complete) {
        if ($.isFunction(options)) { //no options
            complete = options;
        }
        options = $.extend($.fn.elementLoaded.defaults, options);
        // Plugin code
        return this.each(function() {
            $(this).find(".element-loading-cover").fadeOut('500', function() {
                $(this).remove();
            });

            // Fire the setup callback
            $.isFunction(complete) && complete.call(this);
        });
    };
    $.fn.elementLoaded.defaults = {
        delay: 600,
    };
    /*Switch*/
    $.fn.switcher = function(options, clickFunc) {
        if ($.isFunction(options)) { //no options
            clickFunc = options;
        }
        options = $.extend($.fn.switcher.defaults, options);
        // Plugin code
        return this.each(function() {
            var parentElemet = this;
            var switcher = $("<span />", {
                class: "chongson-switcher"
            }).appendTo(parentElemet);
            var switchBtn = $("<span />", {
                class: "chongson-switcher-btn"
            }).appendTo(switcher);
            $(switcher).click(function() {
                // Fire the setup callback
                $.isFunction(clickFunc) && clickFunc.call(this);
                if ($(this).hasClass('switcher-off')) {
                    $(this).removeClass('switcher-off');
                    $(this).find(".chongson-switcher-btn").removeClass('switcher-btn-off', 200);
                } else {
                    $(this).addClass('switcher-off');
                    $(this).find(".chongson-switcher-btn").addClass('switcher-btn-off', 200);
                }

            });
            if (!options.open) {
                $(switcher).addClass("switcher-off");
                $(switchBtn).addClass('switcher-btn-off');
            }
        });
    };
    $.fn.switcher.defaults = {
        open: true,
    };
    $.consoleLog = function(options, confirmFnc, cancelFnc) {
        options = $.extend($.consoleLog.defaults, options);
        var mask = $("<div />", {
            class: "popupMask",
            style: "height : " + $(document).height() + "px"
        }).mousewheel(function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }).appendTo("body");
        var consoleBox = $("<div />", {
            class: "consol-box"
        }).appendTo(mask);
        $("<div />", {
            class: "consol-content"
        }).append(options.content).appendTo(consoleBox);
        $("<button />", {
            class: "chongson-btn chongson-btn-xs",
            text: options.confirmTxt
        }).appendTo(consoleBox).click(function() {
            $.isFunction(confirmFnc) && confirmFnc.call(this);
            $(".popupMask").fadeOut('300', function() {
                $(".popupMask").remove();
            });
        });
        if (options.cancelBtn) {
            $("<button />", {
                class: "chongson-btn chongson-btn-xs",
                text: options.cancelTxt
            }).appendTo(consoleBox).click(function() {
                $.isFunction(cancelFnc) && cancelFnc.call(this);
                $(".popupMask").fadeOut('300', function() {
                    $(".popupMask").remove();
                });
            });
        }

        // Fire the setup callback
    };
    $.consoleLog.defaults = {
        content: "This is Console!",
        cancelBtn: true,
        cancelTxt: "Cancel",
        confirmTxt: "OK"
    };
}(jQuery));
