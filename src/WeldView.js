(function(Backbone) {
	Backbone.WeldView = Backbone.View.extend({
		initialize: function(options) {
			if(options.container) this.container = options.container || document.createElement("div");
			if(options.tplEl) this.tplEl = options.tplEl;

			///hrmph
			this.dataElements = {};

			this.el = document.createElement("div");

			var view = this;

			if(this.model) {
				this.model.view = this;

				this.model.bind("change", function(model, collection) {
					_.each(model.changedAttributes(), function(v, k) {
						var el = view.dataElements[k];

						if(!el)
							return view.render();

						el.removeChild(el.firstChild);
						el.appendChild(document.createTextNode(v));
					});
				});
			}

			this.el.innerHTML = this.tplEl.outerHTML;
			this.container.appendChild(this.el);

			this.render();
		},
		render: function() {
			var view = this;
			weld(this.el, this.model.attributes, {
				map: function(parent, element, key, val) {
					view.dataElements[key] = element;
				}
			});
		}
	});
})(Backbone);
