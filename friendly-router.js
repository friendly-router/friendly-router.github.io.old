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

