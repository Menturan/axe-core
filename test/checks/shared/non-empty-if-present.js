describe('non-empty-if-present', function() {
	'use strict';

	var fixture = document.getElementById('fixture');

	// These defaults are only available in IE and Edge
	var input = document.createElement('input');
	input.type = 'submit';
	var isEdgeOrIe = typeof input.getAttribute('value') === 'string';

	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should return false if a value is present', function() {
		var node = document.createElement('input');
		node.setAttribute('type', 'submit');
		node.setAttribute('value', 'woohoo');
		fixture.appendChild(node);

		assert.isFalse(
			axe.testUtils
				.getCheckEvaluate('non-empty-if-present')
				.call(checkContext, node)
		);
		assert.equal(checkContext._data.messageKey, 'has-label');
	});

	(isEdgeOrIe ? xit : it)(
		'should return true if a value is not present',
		function() {
			var node = document.createElement('input');
			node.setAttribute('type', 'submit');
			fixture.appendChild(node);

			assert.isTrue(
				axe.testUtils
					.getCheckEvaluate('non-empty-if-present')
					.call(checkContext, node)
			);
			assert.isNull(checkContext._data);
		}
	);

	it('should return false if an value is present, but empty', function() {
		var node = document.createElement('input');
		node.setAttribute('type', 'submit');
		node.setAttribute('value', '');
		fixture.appendChild(node);

		assert.isFalse(
			axe.testUtils
				.getCheckEvaluate('non-empty-if-present')
				.call(checkContext, node)
		);
	});

	it('should return false if the element is not a submit or reset input', function() {
		var node = document.createElement('input');
		node.setAttribute('type', 'text');
		fixture.appendChild(node);
		assert.isFalse(
			axe.testUtils
				.getCheckEvaluate('non-empty-if-present')
				.call(checkContext, node)
		);

		node = document.createElement('input');
		node.setAttribute('type', 'button');
		fixture.appendChild(node);
		assert.isFalse(
			axe.testUtils
				.getCheckEvaluate('non-empty-if-present')
				.call(checkContext, node)
		);

		node = document.createElement('button');
		node.setAttribute('type', 'submit');
		fixture.appendChild(node);
		assert.isFalse(
			axe.testUtils
				.getCheckEvaluate('non-empty-if-present')
				.call(checkContext, node)
		);
	});
});
