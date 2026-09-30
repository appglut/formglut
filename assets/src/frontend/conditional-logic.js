/**
 * FormGlut Conditional Logic Module
 *
 * Handles show/hide logic for form fields based on user input.
 * Fields can be configured to show/hide based on values of other fields.
 *
 * @package FormGlut
 */

(function() {
	'use strict';

	/**
	 * Conditional Logic Manager
	 */
	class FormGlutConditionalLogic {
		/**
		 * Initialize conditional logic for a form
		 * @param {HTMLFormElement} form - The form element
		 */
		constructor(form) {
			this.form = form;
			this.fields = [];
			this.dependentsMap = {}; // Maps source field IDs to dependent fields
			this.init();
		}

		/**
		 * Initialize the conditional logic system
		 */
		init() {
			// Find all fields with conditional logic
			this.findConditionalFields();
			this.buildDependenciesMap();
			this.attachEventListeners();
			// Initial evaluation
			this.evaluateAll();
		}

		/**
		 * Find all fields that have conditional logic configured
		 */
		findConditionalFields() {
			const fieldElements = this.form.querySelectorAll('[data-conditional-logic]');
			fieldElements.forEach(fieldEl => {
				try {
					const configJson = fieldEl.getAttribute('data-conditional-logic');
					const config = JSON.parse(configJson);
					if (config && config.enabled) {
						this.fields.push({
							element: fieldEl,
							config: config
						});
					}
				} catch (e) {
					console.warn('[FormGlut Conditional Logic] Invalid config for field:', fieldEl, e);
				}
			});
		}

		/**
		 * Build a map of which fields depend on which other fields
		 * This allows efficient re-evaluation when a field changes
		 */
		buildDependenciesMap() {
			this.fields.forEach(field => {
				field.config.rules.forEach(rule => {
					if (!rule.field_id) return;

					if (!this.dependentsMap[rule.field_id]) {
						this.dependentsMap[rule.field_id] = [];
					}
					this.dependentsMap[rule.field_id].push(field);
				});
			});
		}

		/**
		 * Attach event listeners to all input fields
		 */
		attachEventListeners() {
			// Listen for changes on all input fields
		 const inputs = this.form.querySelectorAll('input, select, textarea');
			inputs.forEach(input => {
				// Use change event for most reliable results
				input.addEventListener('change', (e) => this.handleFieldChange(e));
				// Also listen for input event for real-time updates
				input.addEventListener('input', (e) => this.handleFieldChange(e));
			});
		}

		/**
		 * Handle field change event
		 * @param {Event} e - The change event
		 */
		handleFieldChange(e) {
			const target = e.target;
			const fieldId = this.getFieldId(target);

			// Re-evaluate all dependent fields
			if (this.dependentsMap[fieldId]) {
				this.dependentsMap[fieldId].forEach(dependentField => {
					this.evaluateField(dependentField);
				});
			}
		}

		/**
		 * Get the field ID from an input element
		 * @param {HTMLElement} input - The input element
		 * @returns {string} The field ID
		 */
		getFieldId(input) {
			// Try to get the field ID from the name attribute or ID
			if (input.name) {
				// For checkbox arrays, remove the [] suffix
				return input.name.replace(/\[\]$/, '');
			}
			if (input.id) {
				return input.id;
			}
			// Try to find from parent field container
			const container = input.closest('.formglut-field');
			if (container) {
				const inputs = container.querySelectorAll('input, select, textarea');
				if (inputs.length > 0 && inputs[0].name) {
					return inputs[0].name.replace(/\[\]$/, '');
				}
			}
			return '';
		}

		/**
		 * Get the current value of a field
		 * @param {string} fieldId - The field ID/name
		 * @returns {string|string[]} The field value(s)
		 */
		getFieldValue(fieldId) {
			// First try to find by name attribute
			let input = this.form.querySelector(`[name="${fieldId}"]`);

			// If not found, try by ID
			if (!input) {
				input = this.form.querySelector(`#${fieldId}`);
			}

			// If still not found, return empty string
			if (!input) {
				return '';
			}

			// Handle checkbox groups and multiselect
			if (input.type === 'checkbox' || input.type === 'radio') {
				// For radio buttons, get the checked one
				if (input.type === 'radio') {
					const checked = this.form.querySelector(`[name="${fieldId}"]:checked`);
					return checked ? checked.value : '';
				}

				// For checkboxes, get all checked values
				const checked = this.form.querySelectorAll(`[name="${fieldId}[]"]:checked`);
				return Array.from(checked).map(cb => cb.value);
			}

			// Handle select multiple
			if (input.tagName === 'SELECT' && input.multiple) {
				return Array.from(input.selectedOptions).map(opt => opt.value);
			}

			// For single value inputs
			return input.value;
		}

		/**
		 * Evaluate a single field's conditional logic
		 * @param {Object} field - The field object with element and config
		 */
		evaluateField(field) {
			const config = field.config;
			const matchType = config.match || 'any';
			const rules = config.rules || [];

			if (rules.length === 0) {
				this.showField(field.element);
				return;
			}

			let result;

			if (matchType === 'all') {
				// All rules must be true
				result = rules.every(rule => this.evaluateRule(rule));
			} else {
				// Any rule can be true (default)
				result = rules.some(rule => this.evaluateRule(rule));
			}

			if (result) {
				this.showField(field.element);
			} else {
				this.hideField(field.element);
			}
		}

		/**
		 * Evaluate a single conditional rule
		 * @param {Object} rule - The rule object with field_id, operator, value
		 * @returns {boolean} Whether the rule passes
		 */
		evaluateRule(rule) {
			const fieldValue = this.getFieldValue(rule.field_id);
			const compareValue = rule.value || '';

			// Handle array values (checkboxes, multiselect)
			const fieldValues = Array.isArray(fieldValue) ? fieldValue : [fieldValue];

			switch (rule.operator) {
				case 'is':
					return fieldValues.some(v => v === compareValue);

				case 'is_not':
					return !fieldValues.some(v => v === compareValue);

				case 'contains':
					return fieldValues.some(v => v && v.toString().indexOf(compareValue) !== -1);

				case 'not_contains':
					return !fieldValues.some(v => v && v.toString().indexOf(compareValue) !== -1);

				case 'starts_with':
					return fieldValues.some(v => v && v.toString().indexOf(compareValue) === 0);

				case 'ends_with':
					return fieldValues.some(v => {
						const str = v.toString();
						return str.indexOf(compareValue) === str.length - compareValue.length;
					});

				case 'greater_than':
					return fieldValues.some(v => {
						const num = parseFloat(v);
						const compareNum = parseFloat(compareValue);
						return !isNaN(num) && !isNaN(compareNum) && num > compareNum;
					});

				case 'less_than':
					return fieldValues.some(v => {
						const num = parseFloat(v);
						const compareNum = parseFloat(compareValue);
						return !isNaN(num) && !isNaN(compareNum) && num < compareNum;
					});

				case 'is_empty':
					return fieldValues.every(v => !v || v.toString().trim() === '');

				case 'is_not_empty':
					return fieldValues.some(v => v && v.toString().trim() !== '');

				default:
					return false;
			}
		}

		/**
		 * Show a field
		 * @param {HTMLElement} fieldEl - The field element
		 */
		showField(fieldEl) {
			fieldEl.style.display = '';
			// Remove any disabled state from inputs
			const inputs = fieldEl.querySelectorAll('input, select, textarea');
			inputs.forEach(input => {
				input.removeAttribute('data-conditional-disabled');
			});
			fieldEl.classList.remove('formglut-conditional-hidden');
		}

		/**
		 * Hide a field
		 * @param {HTMLElement} fieldEl - The field element
		 */
		hideField(fieldEl) {
			fieldEl.style.display = 'none';
			// Disable inputs so they're not submitted
			const inputs = fieldEl.querySelectorAll('input, select, textarea');
			inputs.forEach(input => {
				input.setAttribute('data-conditional-disabled', 'true');
			});
			fieldEl.classList.add('formglut-conditional-hidden');
		}

		/**
		 * Evaluate all conditional fields
		 */
		evaluateAll() {
			this.fields.forEach(field => this.evaluateField(field));
		}

		/**
		 * Destroy the conditional logic instance
		 */
		destroy() {
			const inputs = this.form.querySelectorAll('input, select, textarea');
			inputs.forEach(input => {
				input.removeEventListener('change', this.handleFieldChange);
				input.removeEventListener('input', this.handleFieldChange);
			});
			this.fields = [];
			this.dependentsMap = {};
		}
	}

	// Initialize for all forms on the page
	function initConditionalLogic() {
		const forms = document.querySelectorAll('.formglut-form');
		forms.forEach(form => {
			// Avoid duplicate initialization
			if (!form.hasAttribute('data-conditional-init')) {
				form.setAttribute('data-conditional-init', 'true');
				new FormGlutConditionalLogic(form);
			}
		});
	}

	// Initialize when DOM is ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initConditionalLogic);
	} else {
		initConditionalLogic();
	}

	// Also initialize after AJAX loads (for dynamically added forms)
	// Use a MutationObserver to watch for new forms
	const observer = new MutationObserver(mutations => {
		let shouldInit = false;
		mutations.forEach(mutation => {
			mutation.addedNodes.forEach(node => {
				if (node.nodeType === 1) {
					if (node.classList && node.classList.contains('formglut-form')) {
						shouldInit = true;
					} else if (node.querySelector) {
						const forms = node.querySelectorAll('.formglut-form');
						if (forms.length > 0) {
							shouldInit = true;
						}
					}
				}
			});
		});

		if (shouldInit) {
			initConditionalLogic();
		}
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true
	});

	// Export for external use
	window.FormGlutConditionalLogic = FormGlutConditionalLogic;

})();
