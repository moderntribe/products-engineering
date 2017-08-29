jQuery(function() {
	var $sidebar = $('.sidebar'),
		$content = $('.content'),
		$tutorial = $('.tutorial-content'),
		$window = $(window),
		offset = $content.offset().top + 60;

	var found = true;

	var $el;

	function setSidebar() {
		var offset = window.scrollY;

		if ( offset + $sidebar.outerHeight() > $tutorial.outerHeight() ) {
			return;
		}

		$sidebar.css( {
			position: 'absolute',
			top: offset
		} );
	}

	function configureSidebar() {
		var $list = $sidebar.children( 'ul' );
		var $headings = $( '.tutorial-content' ).find( 'h2, h3' );

		$headings.each( function () {
			var $heading = $( this );
			var $item = $( '<li>' );
			var $link = $( '<a>' );
			var type = $heading.prop( 'nodeName' ).toLowerCase();
			$item.addClass( 'type-' + type );
			$link.attr( 'href', '#' + $heading.attr( 'id' ) );
			$link.html( $heading.html() );
			$item.append( $link );

			$list.append( $item );
		} );
	}

	function setActiveSidebarLink() {
		$('.sidebar a').removeClass('active');
		var $closest = getClosestHeader();
		$closest.addClass('active');
	}
	configureSidebar();

	var href = $sidebar.find('a').first().attr("href");
	if (href !== undefined && href.charAt(0) === "#") {
		$(window).on("scroll", function() {
			setSidebar();
			throttle(function(){
				setActiveSidebarLink();
			}, 100)();
		}).trigger( 'scroll' );
	}

	var headings = $( '.tutorial-content' ).find( "h2[id], h3[id]" );
	for (var i = 0; i < headings.length; i++) {
		var anchorLink = document.createElement("a");
		anchorLink.innerText = "#";
		anchorLink.href = "#" + headings[i].id;
		anchorLink.classList.add("header-link");

		headings[i].append(anchorLink);
	}

});

function getClosestHeader() {
	var $links = $( '.sidebar a' );
	var $selected = $links.first();
	var $content = $(".tutorial-content");

	var contentHeight = $content.offset().top + $content.height();
	var top = window.scrollY;

	if ( top < 50 ) {
		return $selected;
	}

	if ( top + window.innerHeight >= contentHeight ) {
		return $links.last();
	}

	$links.each( function( i ) {
		var $link = $( this );
		var href  = $link.attr( 'href' );

		if ( ! href || '#' !== href.charAt( 0 ) || href.length <= 1 ) {
			return;
		}

		var $anchor = $( href );

		if ( 1 < $anchor.length ) {
			return;
		}

		var offset = $anchor.offset();

		if ( top < offset.top - ( window.innerHeight / 6 ) ) {
			return;
		}

		$selected =  $link;
	} );

	return $selected;
}

function throttle (callback, limit) {

	var wait = false;
	return function () {
		if (!wait) {

			callback.apply(null, arguments);
			wait = true;
			setTimeout(function () {
				wait = false;
			}, limit);
		}
	};
}