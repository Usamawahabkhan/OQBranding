	//Gallery Filters
	if($('.filter-list').length){
		$('.filter-list').mixItUp({});
	}


	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}



	handlePreloader();


