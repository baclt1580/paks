function resize_window() {
		  this.W_width = Number(document.documentElement.clientWidth);
		  document.documentElement.style.fontSize=(this.W_width/375/2*100)+"px";
}
		resize_window();
		window.onresize=resize_window;