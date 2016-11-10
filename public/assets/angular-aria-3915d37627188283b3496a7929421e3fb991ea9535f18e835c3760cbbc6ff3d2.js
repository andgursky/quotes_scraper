!function(window,angular){"use strict";function $AriaProvider(){function watchExpr(attrName,ariaAttr,nodeBlackList,negate){return function(scope,elem,attr){var ariaCamelName=attr.$normalize(ariaAttr);!config[ariaCamelName]||isNodeOneOf(elem,nodeBlackList)||attr[ariaCamelName]||scope.$watch(attr[attrName],function(boolVal){boolVal=negate?!boolVal:!!boolVal,elem.attr(ariaAttr,boolVal)})}}var config={ariaHidden:!0,ariaChecked:!0,ariaReadonly:!0,ariaDisabled:!0,ariaRequired:!0,ariaInvalid:!0,ariaValue:!0,tabindex:!0,bindKeypress:!0,bindRoleForClick:!0};this.config=function(newConfig){config=angular.extend(config,newConfig)},this.$get=function(){return{config:function(key){return config[key]},$$watchExpr:watchExpr}}}var ngAriaModule=angular.module("ngAria",["ng"]).provider("$aria",$AriaProvider),nodeBlackList=["BUTTON","A","INPUT","TEXTAREA","SELECT","DETAILS","SUMMARY"],isNodeOneOf=function(elem,nodeTypeArray){if(nodeTypeArray.indexOf(elem[0].nodeName)!==-1)return!0};ngAriaModule.directive("ngShow",["$aria",function($aria){return $aria.$$watchExpr("ngShow","aria-hidden",[],!0)}]).directive("ngHide",["$aria",function($aria){return $aria.$$watchExpr("ngHide","aria-hidden",[],!1)}]).directive("ngValue",["$aria",function($aria){return $aria.$$watchExpr("ngValue","aria-checked",nodeBlackList,!1)}]).directive("ngChecked",["$aria",function($aria){return $aria.$$watchExpr("ngChecked","aria-checked",nodeBlackList,!1)}]).directive("ngReadonly",["$aria",function($aria){return $aria.$$watchExpr("ngReadonly","aria-readonly",nodeBlackList,!1)}]).directive("ngRequired",["$aria",function($aria){return $aria.$$watchExpr("ngRequired","aria-required",nodeBlackList,!1)}]).directive("ngModel",["$aria",function($aria){function shouldAttachAttr(attr,normalizedAttr,elem,allowBlacklistEls){return $aria.config(normalizedAttr)&&!elem.attr(attr)&&(allowBlacklistEls||!isNodeOneOf(elem,nodeBlackList))}function shouldAttachRole(role,elem){return!elem.attr("role")&&elem.attr("type")===role&&"INPUT"!==elem[0].nodeName}function getShape(attr){var type=attr.type,role=attr.role;return"checkbox"===(type||role)||"menuitemcheckbox"===role?"checkbox":"radio"===(type||role)||"menuitemradio"===role?"radio":"range"===type||"progressbar"===role||"slider"===role?"range":""}return{restrict:"A",require:"ngModel",priority:200,compile:function(elem,attr){var shape=getShape(attr,elem);return{pre:function(scope,elem,attr,ngModel){"checkbox"===shape&&(ngModel.$isEmpty=function(value){return value===!1})},post:function(scope,elem,attr,ngModel){function ngAriaWatchModelValue(){return ngModel.$modelValue}function getRadioReaction(){var boolVal=attr.value==ngModel.$viewValue;elem.attr("aria-checked",boolVal)}function getCheckboxReaction(){elem.attr("aria-checked",!ngModel.$isEmpty(ngModel.$viewValue))}var needsTabIndex=shouldAttachAttr("tabindex","tabindex",elem,!1);switch(shape){case"radio":case"checkbox":shouldAttachRole(shape,elem)&&elem.attr("role",shape),shouldAttachAttr("aria-checked","ariaChecked",elem,!1)&&scope.$watch(ngAriaWatchModelValue,"radio"===shape?getRadioReaction:getCheckboxReaction),needsTabIndex&&elem.attr("tabindex",0);break;case"range":if(shouldAttachRole(shape,elem)&&elem.attr("role","slider"),$aria.config("ariaValue")){var needsAriaValuemin=!elem.attr("aria-valuemin")&&(attr.hasOwnProperty("min")||attr.hasOwnProperty("ngMin")),needsAriaValuemax=!elem.attr("aria-valuemax")&&(attr.hasOwnProperty("max")||attr.hasOwnProperty("ngMax")),needsAriaValuenow=!elem.attr("aria-valuenow");needsAriaValuemin&&attr.$observe("min",function(newVal){elem.attr("aria-valuemin",newVal)}),needsAriaValuemax&&attr.$observe("max",function(newVal){elem.attr("aria-valuemax",newVal)}),needsAriaValuenow&&scope.$watch(ngAriaWatchModelValue,function(newVal){elem.attr("aria-valuenow",newVal)})}needsTabIndex&&elem.attr("tabindex",0)}!attr.hasOwnProperty("ngRequired")&&ngModel.$validators.required&&shouldAttachAttr("aria-required","ariaRequired",elem,!1)&&attr.$observe("required",function(){elem.attr("aria-required",!!attr.required)}),shouldAttachAttr("aria-invalid","ariaInvalid",elem,!0)&&scope.$watch(function(){return ngModel.$invalid},function(newVal){elem.attr("aria-invalid",!!newVal)})}}}}}]).directive("ngDisabled",["$aria",function($aria){return $aria.$$watchExpr("ngDisabled","aria-disabled",nodeBlackList,!1)}]).directive("ngMessages",function(){return{restrict:"A",require:"?ngMessages",link:function(scope,elem){elem.attr("aria-live")||elem.attr("aria-live","assertive")}}}).directive("ngClick",["$aria","$parse",function($aria,$parse){return{restrict:"A",compile:function(elem,attr){var fn=$parse(attr.ngClick,null,!0);return function(scope,elem,attr){isNodeOneOf(elem,nodeBlackList)||($aria.config("bindRoleForClick")&&!elem.attr("role")&&elem.attr("role","button"),$aria.config("tabindex")&&!elem.attr("tabindex")&&elem.attr("tabindex",0),$aria.config("bindKeypress")&&!attr.ngKeypress&&elem.on("keypress",function(event){function callback(){fn(scope,{$event:event})}var keyCode=event.which||event.keyCode;32!==keyCode&&13!==keyCode||scope.$apply(callback)}))}}}}]).directive("ngDblclick",["$aria",function($aria){return function(scope,elem){!$aria.config("tabindex")||elem.attr("tabindex")||isNodeOneOf(elem,nodeBlackList)||elem.attr("tabindex",0)}}])}(window,window.angular);