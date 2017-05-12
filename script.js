var columns = [ 12, 6, 6, 3, 3, 3, 3, 6, 6, 12 ],
	columnCounter = 0,
	images = [
		{
			credits: 'http://photography.nationalgeographic.com/contest-2015/wallpapers/week-8-all/13',
			source:  'img/img-1.jpg'
		},
		{
			credits: 'http://photography.nationalgeographic.com/contest-2015/wallpapers/week-10-all/17',
			source:  'img/img-2.jpg'
		},
		{
			credits: 'http://photography.nationalgeographic.com/contest-2015/wallpapers/week-6-all/7',
			source:  'img/img-3.jpg'
		},
		{
			credits: 'http://photography.nationalgeographic.com/contest-2015/wallpapers/week-11-all/13',
			source:  'img/img-4.jpg'
		},
		{
			credits: 'http://photography.nationalgeographic.com/contest-2015/wallpapers/week-8-all/16',
			source:  'img/img-5.jpg'
		},
		{
			credits: 'http://photography.nationalgeographic.com/contest-2015/wallpapers/week-5-all/11',
			source:  'img/img-6.jpg'
		},
		{
			credits: 'http://photography.nationalgeographic.com/contest-2015/wallpapers/week-11-all/26',
			source:  'img/img-7.jpg'
		}
	];

// insert images
images.forEach(function (i, k) {
	var container = $('<div class="example col-xs-' + columns[k] + '"></div>'),
		image     = $('<img>').attr('src', i.source).addClass('img-responsive img-thumbnail'),
		credits   = $('<a></a>').attr({ href: i.credits, target: '_blank', rel: 'nofollow, noindex' }).append('<i class="glyphicon glyphicon-share"></i>&nbsp; Credits');
	
	$('<p></p>').append(image).appendTo(container);
	$('<p class="text-overflow text-center small"></p>').append(credits).appendTo(container);
	if (columnCounter % 12 == 0)
		$('.examples').append('<div class="row"></div>');
	$('.examples .row:last').append(container);
	columnCounter += columns[k];
});

// zoomify!
$('.example img').zoomify();