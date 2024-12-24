$(document).ready(function() {
	onResize();
});

$(window).resize(onResize);

function onResize() {
	$("section-heading").each(function(ind, root) {
		const size = parseInt($(root).css("font-size"));
		$("circle, path", root).css("transform", "scale("+ (size/21) +")");
		$("svg", root).each(function(ind, svg) {
			const bb = svg.getBBox();
			svg.setAttribute("width", bb.x*2 + bb.width);
			svg.setAttribute("height", bb.y*2 + bb.height);
		});
	});
}

class SectionHeading extends HTMLElement {
	constructor() {
		super();
	}
	
	connectedCallback() {
		const title = this.getAttribute("title");
		const val = `<div>
						<div style="flex: 0 0 1em;"></div>
						<svg>
							<path d="M181.5 15L28 15" stroke="white" stroke-width="4" stroke-linecap="round"/>
							<circle cx="14.5" cy="14.5" r="12.5" stroke="white" stroke-width="4"/>
						</svg>
						<h1 style="font-size: 2.5em; font-weight: 700;">${title}</h1>
						<div>
							<div>
								<svg>
									<path d="M2.5 14H156" stroke="white" stroke-width="4" stroke-linecap="round"/>
									<circle cx="169.5" cy="14.5" r="12.5" stroke="white" stroke-width="4"/>
								</svg>
							</div>
						</div>
						<div style="flex: 0 0 1em;"></div>
					</div>
				`;
		this.innerHTML = val;
	}
}
customElements.define("section-heading", SectionHeading);
