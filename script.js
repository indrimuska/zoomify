var columns = [ 12, 6, 6, 3, 3, 3, 3, 6, 6, 12 ],
	images = [
		{
			credits: 'http://photography.nationalgeographic.com/contest-2015/wallpapers/week-8-all/13',
			source:  'http://yourshot.nationalgeographic.com/u/ss/fQYSUbVfts-T7Ehj8_lPSALDyndvMSNW9paJ9-zKyhc9WOHwTz_HJZV1PUjKLmZxxfsKxzFlKTfmZvJDie7bugKZJhz0j4GfrgatGr1FIhSZBX_3kPYK3nG_dcxSuosO98066GwetCM2h6dHQzncc5rh_NLVATYunSKedq1kLzVM/'
		},
		{
			credits: 'http://photography.nationalgeographic.com/contest-2015/wallpapers/week-8-all/11',
			source:  'http://yourshot.nationalgeographic.com/u/ss/fQYSUbVfts-T7Ehj8_lPSALDyndvMSNW9paJ9-zKyhc9WOHwTz_HJZV1PUIym2rifL_mWvf_0OP76EIeSqiLi523-B5MQvV8ZHDLW5aQw3gOB8zLTJs7qHQJnIsLc-YIGQJnmB7gPoE72O9xsx2ldwOoXmmO7h_d6ibwQc-2Ux7K/'
		},
		{
			credits: 'http://photography.nationalgeographic.com/contest-2015/wallpapers/week-6-all/13',
			source:  'http://yourshot.nationalgeographic.com/u/ss/fQYSUbVfts-T7Ehj8_lPSALDyndvMSNW9paJ9-zKyhc9WOHwTz_HJZV1N7I2yFTKer28tO-NP2QIBkDTClyjlBRxbUx2YgeCilgcW181kE1Dre3iV-KZA346JotWVtNlwiW0-DSiWwYCY7LN0ZMz7HJXFRRAfL_-CxUoEwyu0gfC/'
		},
		{
			credits: 'http://photography.nationalgeographic.com/contest-2015/wallpapers/week-1-all/10',
			source:  'http://yourshot.nationalgeographic.com/u/ss/fQYSUbVfts-T7Ehj8_lPSALDyndvMSNW9paJ9-zKyhc9WOHwTz_HJZRKlOx6kP2CCEjshDbOApSVRhHgmuqFQLaP-yUM1IE93-UpY8i0xAi1nRLgYA5ZB0aTW2aXoTzoX4Cx02dOj9YFDBsKCNi7deZ12lWdiAlwEEMv6nynQ8Rd/'
		},
		{
			credits: 'http://photography.nationalgeographic.com/contest-2015/wallpapers/week-2-all/3',
			source:  'http://yourshot.nationalgeographic.com/u/ss/fQYSUbVfts-T7Ehj8_lPSALDyndvMSNW9paJ9-zKyhc9WOHwTz_HJZc3j2ugq-ge9Gp3AlN05UvpDsni9gWY5pzEy1FlRzS2gf1jLrYeSTCKCkP7zzQytwjvqu4GyMKTr5DR0a1069XA8dN0nyGQXj8D3zFCRQLROzUxsPgFgUQv/'
		},
		{
			credits: 'http://photography.nationalgeographic.com/contest-2015/wallpapers/week-5-all/11',
			source:  'http://yourshot.nationalgeographic.com/u/ss/fQYSUbVfts-T7Ehj8_lPSALDyndvMSNW9paJ9-zKyhc9WOHwTz_HJZRE2ttwc4NHS5G_brP8lAQ_F1T-yUObfnh2GCzVZwgIGVyB-uNuvgUj7Qj-4vlvB9V1COizQFEicrpDCWNwULc2fxfiimKqk0NUg9jQcPJuAckB8LTKyJhw/'
		},
		{
			credits: 'http://photography.nationalgeographic.com/contest-2015/wallpapers/week-6-all/7',
			source:  'http://yourshot.nationalgeographic.com/u/ss/fQYSUbVfts-T7Ehj8_lPSALDyndvMSNW9paJ9-zKyhc9WOHwTz_HJZRNVThfFHVaVYjsbK2TtGGcoSLGkPVYSqCCMbPdMGWkT2rlpV9vhr16avHILtc7Hc8JuZZZa1x33XLKmpwfXIA6NiQlGnoiai6LxJLT04fyYJYhCtt5Kd3q/'
		}
	];

// insert images
images.forEach(function (i, k) {
	var container = $('<div class="example col-xs-' + columns[k] + '"></div>'),
		image     = $('<img>').attr('src', i.source).addClass('img-responsive img-thumbnail'),
		credits   = $('<a></a>').attr({ href: i.credits, target: '_blank', rel: 'nofollow, noindex' }).append('<i class="glyphicon glyphicon-share"></i>&nbsp; Credits');
	
	$('<p></p>').append(image).appendTo(container);
	$('<p class="text-overflow text-center small"></p>').append(credits).appendTo(container);
	$('.examples').append(container);
});

// zoomify!
$('.example img').zoomify({ delay: 200 });