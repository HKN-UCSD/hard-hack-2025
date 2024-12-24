$(document).ready(function() {
	onResize();
	$("dropdown-box").each(function(ind, root) {
		$(".header", root).click(function() {
			const hiddenText = $(this).parent().find(".dropdown-hidden p");
			const hlines = $(this).parent().find(".dropdown-hidden hr");
			const svg = $(this).find("svg");
			if(!root.hasAttribute("transitioning"))
			{
				root.setAttribute("transitioning", "");
				if(root.hasAttribute("open"))
				{
					root.removeAttribute("open");
					hiddenText.animate({height: 0, margin: "0px auto"}, {
							delay: 500, queue: false, complete: function() {
								hiddenText.css("opacity", "0");
								root.removeAttribute("transitioning");
							}
						}
					);
					svg.animate({deg: "0"}, {
							duration: 500, queue: false, step: function(val) {
								$(this).css({transform: "rotate(" + val + "deg) scale(" + parseInt($(this).css("font-size"))/16 + ")"});
							}
						}
					);
					hlines.delay(400).animate({opacity: 0}, 100);
				}
				else
				{
					root.setAttribute("open", "");
					hiddenText.css({"opacity": 1, "height": "auto"});
					const autoHeight = hiddenText.height();
					hiddenText.css("height", "0px");
					
					hlines.animate({opacity: 1}, 100);
					hiddenText.animate({height: autoHeight, margin: "2em auto"}, {
							delay: 500, queue: false, complete: function() {
								$(this).css("height", "auto");
								root.removeAttribute("transitioning");
							}
						}
					);
					svg.animate({deg: "-180"}, {
							duration: 500, queue: false, step: function(val) {
								$(this).css({transform: "rotate(" + val + "deg) scale(" + parseInt($(this).css("font-size"))/16 + ")"});
							}
						}
					);
				}
			}
		});
	});
});

$(window).resize(onResize);

function onResize() {
	$("dropdown-box").each(function(ind, root) {
		const svg = $("svg", root);
		const hiddenText = $(".dropdown", root).find(".dropdown-hidden p");
		if(root.hasAttribute("open"))
			svg.css({transform: "rotate(-180deg) scale(" + parseInt($(this).css("font-size"))/16 + ")"});
		else
			svg.css({transform: "rotate(0deg) scale(" + parseInt($(this).css("font-size"))/16 + ")"});
	});
}

function updateDropdown(elem) {
	const header = elem.getAttribute("header");
	const bodyText = elem.getAttribute("text");
	const val = `<div class="header">
					<h3>${header}</h3>
					<svg width="31px" height="31px">
						<path d="M13.8488 19.3187L0.682497 6.15236C-0.22753 5.24233 -0.22753 3.7708 0.682497 2.87045L2.87043 0.682519C3.78046 -0.227506 5.25199 -0.227506 6.15233 0.682519L15.4849 10.0151L24.8175 0.682519C25.7276 -0.227506 27.1991 -0.227506 28.0994 0.682519L30.3067 2.86077C31.2168 3.7708 31.2168 5.24233 30.3067 6.14267L17.1404 19.309C16.2304 20.2287 14.7589 20.2287 13.8488 19.3187Z" fill="white" transform="translate(0,5)"/>
					</svg>
				</div>
			<div class="dropdown-hidden"><hr/><p>${bodyText}</p><hr/></div>`;
	elem.innerHTML = val;
}
class DropdownBox extends HTMLElement {
	
	constructor() {
		super();
	}
	
	connectedCallback() {
		updateDropdown(this);
	}
}
customElements.define("dropdown-box", DropdownBox);
