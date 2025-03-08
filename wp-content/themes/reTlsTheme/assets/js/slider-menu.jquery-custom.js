! function(e) {
    "use strict";
    window.currentLeft = 0;
    var i = {
        init: function(i) {
            e(this).each(function() {
                var i = e(this).clone(),
                    s = e("<div>").addClass("slider-menu"),
                    n = e("<nav>").addClass("slider-menu__container").attr({
                        role: "navigation",
                        "aria-label": "Menu"
                    });
                i.attr("class", "slider-menu__menu"), e("ul", i).addClass("slider-menu__menu").prepend('<li><a href="#" class="slider-menu__back"><span class="slider-menu__text"></span> </a> <a href="#" class="slider-menu__text-link"> <span class="slider-menu__text-heading"> </span></a>').parent().addClass("slider-menu--has-children"), e("li", i).addClass("slider-menu__item"), e("a", i).addClass("slider-menu__link"), n.html(i), e('[data-vertical="true"]', n).addClass("slider-menu__item--vertical"), s.html(n), e(s).on("click", ".slider-menu__link", function(i) {
                    var s = e(this),
                        t = s.closest(".slider-menu"),
                        l = s.parent(".slider-menu__item"),
                        r = l.parent(".slider-menu__menu"),
                        a = e("> .slider-menu__menu", l);
                    if (a.length || s.hasClass("slider-menu__back"))
                        if (i.preventDefault(), l.data("vertical")) a.is(":visible") ? (r.addClass("slider-menu--active"), a.hide(), t.css("height", r.height()), s.removeClass("slider-menu__link--active-link")) : (a.show(), t.css("height", r.height()), s.addClass("slider-menu__link--active-link"));
                        else if (e(".slider-menu__item--vertical .slider-menu__menu", t).hide(), e(".slider-menu__item--vertical .slider-menu__link", t).removeClass("slider-menu__link--active-link"), s.hasClass("slider-menu__back")) {
                        var d = r.parent().parent();
                        console.log("currentLeft", window.currentLeft), window.currentLeft -= 100, n.css("left", "-" + window.currentLeft + "%"), r.removeClass("slider-menu--active"), d.addClass("slider-menu--active").parents(".slider-menu__menu").addClass("slider-menu--active"), t.css("height", d.height())
                    } else window.currentLeft += 100, n.css("left", "-" + window.currentLeft + "%"), r.removeClass("slider-menu--active"), a.addClass("slider-menu--active").parents(".slider-menu__menu").addClass("slider-menu--active"), t.css("height", a.height())
                }), e(this).replaceWith(s), e(".slider-menu__text-link").each(function(i) {
                    var s = e(this).closest(".slider-menu--has-children").find(" > .slider-menu__link").text(),
                        n = e(this).closest(".slider-menu--has-children").find(" > .slider-menu__link").attr("href");
                    e(this).find(" > .slider-menu__text-heading").text(s), e(this).closest(".slider-menu__text-link").attr("href", n)
                }), e(".slider-menu--has-children").each(function(i) {
                    var s = e(this).find(" > .slider-menu__link").text(),
                        n = '<a class="submenu-link-text" href="' + e(this).find(" > .slider-menu__link").attr("href") + '">' + s + "</a>";
                    e(this).find(" > .slider-menu__menu").before(n), e(this).find(" > .slider-menu__link").remove(), e(this).find(" > .slider-menu__menu").before('<a class="slider-menu__link right-arrow" href="#"></a>')
                })
            })
        },
        reposition: function() {
            window.currentLeft = 0, setTimeout(function() {
                e(this).each(function() {
                    e(".slider-menu__container").css("left", "-" + currentLeft + "%"), e(".slider-menu__menu").each(function() {
                        e(this).removeClass("slider-menu--active")
                    }), e(".slider-menu").css({
                        height: "auto"
                    })
                })
            }, 500)
        }
    };
    e.fn.sliderMenu = function(s) {
        return i[s] ? i[s].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof s && s ? void e.error("Method " + s + " does not exist on jQuery.tooltip") : i.init.apply(this, arguments)
    }
}(jQuery);