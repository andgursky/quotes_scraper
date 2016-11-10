/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){"use strict";function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.button"),options="object"==typeof option&&option;data||$this.data("bs.button",data=new Button(this,options)),"toggle"==option?data.toggle():option&&data.setState(option)})}var Button=function(element,options){this.$element=$(element),this.options=$.extend({},Button.DEFAULTS,options),this.isLoading=!1};Button.VERSION="3.3.7",Button.DEFAULTS={loadingText:"loading..."},Button.prototype.setState=function(state){var d="disabled",$el=this.$element,val=$el.is("input")?"val":"html",data=$el.data();state+="Text",null==data.resetText&&$el.data("resetText",$el[val]()),setTimeout($.proxy(function(){$el[val](null==data[state]?this.options[state]:data[state]),"loadingText"==state?(this.isLoading=!0,$el.addClass(d).attr(d,d).prop(d,!0)):this.isLoading&&(this.isLoading=!1,$el.removeClass(d).removeAttr(d).prop(d,!1))},this),0)},Button.prototype.toggle=function(){var changed=!0,$parent=this.$element.closest('[data-toggle="buttons"]');if($parent.length){var $input=this.$element.find("input");"radio"==$input.prop("type")?($input.prop("checked")&&(changed=!1),$parent.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==$input.prop("type")&&($input.prop("checked")!==this.$element.hasClass("active")&&(changed=!1),this.$element.toggleClass("active")),$input.prop("checked",this.$element.hasClass("active")),changed&&$input.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var old=$.fn.button;$.fn.button=Plugin,$.fn.button.Constructor=Button,$.fn.button.noConflict=function(){return $.fn.button=old,this},$(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(e){var $btn=$(e.target).closest(".btn");Plugin.call($btn,"toggle"),$(e.target).is('input[type="radio"], input[type="checkbox"]')||(e.preventDefault(),$btn.is("input,button")?$btn.trigger("focus"):$btn.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(e){$(e.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(e.type))})}(jQuery);