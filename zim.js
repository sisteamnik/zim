var Zim = function(selector) {
		var padding = 50
		var p = {}
		var w = window
		var d = document
		var zimClass = "zim"
		var zimClassSelector = "." + zimClass
		var clev = "click"

		function scale(ow, oh, mw, mh){
	  		var scale = Math.min(mw / ow, mh / oh);
	  		if (scale > 1) scale = 1;
	  		return {
	   			width : ow * scale,
	   			height : oh * scale
	  		};
		};

		function loadImg(src,cb) {
			var img = new Image();
			img.onload = function() {
				cb(img);
			}
			img.src = src
		}

		function dem(img) {
			rb = targetSize(img.width,img.height)
			img.style.width = rb.w + "px"
			img.style.height = rb.h + "px"
			img.style.top = rb.y + "px"
			img.style.left = rb.x + "px"
			img.style.position = "fixed"
			img.classList.add(zimClass);
			d.body.appendChild(img);
			off(qS(selector),clev,zoomListener)
			on([d],clev,rm)
		}


		function rm(e) {
			e.preventDefault();
			qS(zimClassSelector)[0].remove()
			off([d],clev,rm)
			on(qS(selector),clev,zoomListener)
		}

		function targetSize(iw,ih){
		  var vp = {}

		  vp.width = w.innerWidth
		  vp.height = w.innerHeight

		  var target = scale(iw, ih, vp.width - padding, vp.height - padding);

		  var left = (vp.width / 2) - (target.width / 2);
		  var top = (vp.height / 2) - (target.height / 2);

		  var res = {
		    x : left,
		    y: top,
		    w: target.width,
		    h: target.height
		  };

		  return res;
		};

		function zoomListener(e) {
			e.preventDefault()
			var el = this
			src = el.href
			loadImg(src, dem)
		}

		function on(nodes, event, fn) {
			[].forEach.call(nodes, function(div) {
				div.addEventListener(event, fn)
			});
		}

		function off(nodes, event, fn) {
			[].forEach.call(nodes, function(div) {
				div.removeEventListener(event, fn)
			});
		}

		function qS(s) {
			return d.querySelectorAll(s)
		}

		on(qS(selector),clev,zoomListener)
}
