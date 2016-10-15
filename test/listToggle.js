var expect = chai.expect;
var icons = document.getElementsByClassName('nav-trigger');
var iconsArray = [];

describe('List-toggle', function() {
	it('should display one and only one icon', function() {
		var count = 0;
		for (i = 0; i < icons.length; i++) {
			if (!icons[i].classList.contains('display-none')) count++;
		}
		expect(count).to.equal(1);
	});
	it('should change icon src when clicked', function() {
		var testTwo = function(a, b) {
			expect(a).to.not.equal(b);
		};

		for (i = 0; i < icons.length; i++) {
			iconsArray.push([icons[i], '', '']);
			var srcOld = icons[i].src;
			icons[i].addEventListener('click', (function(i, s) {
				icons[i][1] = s;
				icons[i][2] = icons[i].src;
				testTwo(icons[i][1], icons[i][2]);
			})(i, srcOld));
		}
	});
});