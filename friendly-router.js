/* Vue.component('product', {
    template: '<td><a :href=product.url>{{ product.name }}</a> - {{ product.manufacturer }}</td>',
    props: ['product'],
    data: function() { console.log("data"); return { product: { url: "test", name: "test", manufacturer: "test" } } },
    methods: { test: function() { console.log("test"); } } 
}) */

new Vue({
    el: '#app',
    data: { products: [] },
    created: function() {
	var self = this;
	$.ajax({ url: './products.json',
		 method: "GET",
		 dataType: "json",
		 success: function(data) {
		     $.each(data, function(index, value) {
			 $.ajax({ url: value,
				 method: "GET",
				 dataType: "json",
				 success: function(data) {
				     self.products.push(data);
				 }})
		     });
		 }
	       });
    }
})


