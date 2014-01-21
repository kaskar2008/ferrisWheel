/*
 *--------------------------------------------------------*
 ! Ferris Wheel 1.2 [slider]                              !
 !                                                        !
 ! Copyright (c) 2012 Kasparov Karen                      !
 ! Dual licensed under the MIT and GPL licenses           !
 !                                                        !
 ! $Date: 2012-12-14 01:32:18 +0600 (Fry, 14 Dec 2012) $  !
 *--------------------------------------------------------*
 */

	var radius = 225; 								//Радиус кольца
	var rotation = 5000;							//задержка таймера прокрутки (в милисекундах)
	var wait_rotation = 10000;						//время ожидания до начала автоматической прокрутки (в милисекундах)
	var cells = new Array(1, 2, 3, 4, 5);			//Массив из номеров элементов, начальные данные
	var img_array;									//массив изображений
	var img_count;									//количество изображений
	var selected_item_id = 1;						//номер выделенного элемента
	var rotate_interval;							//указатель на созданный таймер
	var rotate_timeout;								//указатель на созданный обратный отсчет
	var m_items_count = 5;							//количество элементов в меню (пока не изменяется)
	
	var clickable_item_id = "clickable_item";		//ID элемента для выбора (поверхность для выбора элемента меню)
	var logo_id = "logo";							//ID логотипа
	var left_arrow_id = "arrow_left";				//ID стрелок
	var right_arrow_id = "arrow_right";				//...
	var window_closebtn_id = "p_close";				//ID кнопки закрытия модального окна
	
	$("#shadow").show();							//Затемнить экран (показ тени)
		
function set_rotate_interval(interval) {			//установка таймера вращения
	clearInterval(rotate_interval);					//очистка предыдущего таймера
	rotate_interval = setInterval("move_slider_left('medium')", interval);	//установка таймера
}

function define_event_handlers() {					//определение обработчиков событий
	$("#" + clickable_item_id).click(function() {
		click_selected();
		clearInterval(rotate_interval);
	});
	
	$("#" + logo_id).click(function() {
		click_selected();
		clearInterval(rotate_interval);
	});
	
	$("#" + left_arrow_id).click(function() {
		arrow_click(this.alt);
	});
	
	$("#" + right_arrow_id).click(function() {
		arrow_click(this.alt);
	});
	
	$("#" + window_closebtn_id).click(function() {
		close_p_window();
	});
}
    
function slider_init() {							//Инициализация слайдера (загрузка и установка всех переменных)

    item1 = new Array(0, 0, 1);
	item2 = new Array(0, 0, 2);
	item3 = new Array(0, 0, 3);
	item4 = new Array(0, 0, 4);
	item5 = new Array(0, 0, 5);
    
    item_w = $("#slider1").width();
    item_h = $("#slider1").height();
	
	/* вычисление координат */    
    item1[0] = radius;
    item1[1] = 2 * radius;
    item2[0] = 0;
    item2[1] = radius + 20;
    item3[0] = 2 * (radius / 3 | 0) - (item_w / 2 | 0);
    item3[1] = 0;
    item4[0] = radius + (radius / 3 | 0) + (item_w / 2 | 0);
    item4[1] = 0;
    item5[0] = 2 * radius;
    item5[1] = radius + 20;
    
    items_array = new Array(
		item1, 
		item2, 
		item3, 
		item4, 
		item5
	);
    
    img_array = document.getElementsByTagName("img");
	img_count = img_array.length;
	
	var s_id = items_array[0][2];
    var bg_attrib = $("#slider" + s_id).attr("bg");
	$("#logo").fadeOut('fast', function() {
		$("#logo").css('background-image', 'url(' + bg_attrib + ')');
	});
	$("#logo").fadeIn('fast');
	
	align_slide_items();
	set_rotate_interval(rotation);
	
	for(j = 0; j < img_count; j++) {
		if(img_array[j].alt == 'slider_menu') {
			$("#" + img_array[j].id).click(function() {
				item_click(this.id);
			});
		}
	}
}

function realign_menu() {
	main_left = ($(window).width() / 2 | 0) - ( (((2 * radius) + item_w) / 2 | 0) );
    main_top = ($(window).height() / 2 | 0) - ( (((2 * radius) + item_h) / 2 | 0) );
	
	document.getElementById("main").style.left = main_left + "px";
    document.getElementById("main").style.top = main_top + "px";
}

function align_slide_items() {
	var i, j, x1, x2, y;
	var item;
	var item_id;
	
	btn_w = $("#arrow_left").width();
    btn_h = $("#arrow_left").height();
    
    logo_top = radius - 100 + (item_h / 2 | 0);
    logo_left = radius - 100 + (item_w / 2 | 0);
    
    main_left = ($(window).width() / 2 | 0) - ( (((2 * radius) + item_w) / 2 | 0) );
    main_top = ($(window).height() / 2 | 0) - ( (((2 * radius) + item_h) / 2 | 0) );
	
	for(i = 0; i < img_count; i++) {
		item = img_array[i];
		if(item.alt == "slider_menu") {
			item_id = Number(item.id.match(/\d+/));
			item.style.top = items_array[item_id - 1][1] + "px";
			item.style.left = items_array[item_id - 1][0] + "px";
			item.title = item.id;
		}
	}
    
    x1 = items_array[0][0] - 10 - btn_w;
    x2 = x1 + btn_w + 20 + item_w;
    y = items_array[0][1] + ( (item_h / 2 | 0) - (btn_h / 2 | 0) );
    document.getElementById("clickable_item").style.left = document.getElementById("slider1").style.left;
    document.getElementById("clickable_item").style.top = document.getElementById("slider1").style.top;
    document.getElementById("clickable_item").style.width = item_w + "px";
    document.getElementById("clickable_item").style. height = item_h + "px";
    document.getElementById("arrow_left").style.left = x1 + "px";
    document.getElementById("arrow_right").style.left = x2 + "px";
    document.getElementById("arrow_left").style.top = y + "px";
    document.getElementById("arrow_right").style.top = y + "px";
    document.getElementById("logo").style.top = logo_top + "px";
    document.getElementById("logo").style.left = logo_left + "px";
    document.getElementById("main").style.left = main_left + "px";
    document.getElementById("main").style.top = main_top + "px";
	$('#shadow').hide();
}

function item_click(item_id) {
	var c_id;
	var tmp_id, id;
	var j, i;
	var tmp_left, tmp_right;
	
	tmp_id = item_id.replace("slider", "");
	
	for(i = 0; i < m_items_count; i++) {
		if(tmp_id == items_array[i][2]) {
			id = i + 1;
			break;
		}
	}
	
	tmp_left = id - 1;
	tmp_right = m_items_count + 1 - id;
	
	clearInterval(rotate_interval);
	rotate_timeout = setTimeout('set_rotate_interval(' + rotation + ')', wait_rotation);
	
	if(tmp_left < tmp_right) {
		for(j = 1; j <= tmp_left; j++) {
			move_slider_left(250);
		}
	}
	else {
		for(j = 1; j <= tmp_right; j++) {
			move_slider_right(250);
		}
	}
}

function arrow_click(arrow) {
	switch(arrow) {
		case 'left':
			move_slider_left('medium');
			break;
		case 'right':
			move_slider_right('medium');
			break;
	}
	clearInterval(rotate_interval);
	rotate_timeout = setTimeout('set_rotate_interval(' + rotation + ')', wait_rotation);
}

function move_slider_right(duration) {
    var s;
    var c_id;
    for(i = 0; i < 5; i++) {
		c_id = items_array[i][2];
        c_id--;
        if(c_id == 0) {
            c_id = 5;
        }
        
        $("#slider" + c_id).animate({
            top: items_array[i][1],
            left: items_array[i][0]
        }, duration);
        items_array[i][2] = c_id;
	}
	
	var s_id = items_array[0][2];
    var bg_attrib = $("#slider" + s_id).attr("bg");
	$("#logo").fadeOut('fast', function() {
		$("#logo").css('background-image', 'url(' + bg_attrib + ')');
	});
	$("#logo").fadeIn('fast');
}

function move_slider_left(duration) {
    var s;
    var c_id;
    var old_id;
    
    for(i = 0; i < 5; i++) {
        c_id = items_array[i][2];
        c_id++;
        if(c_id == 6) {
            c_id = 1;
        }
        
        $("#slider" + c_id).animate({
            top: items_array[i][1],
            left: items_array[i][0]
        }, duration);
        items_array[i][2] = c_id;
	}
	
	var s_id = items_array[0][2];
    var bg_attrib = $("#slider" + s_id).attr("bg");
	$("#logo").fadeOut('fast', function() {
		$("#logo").css('background-image', 'url(' + bg_attrib + ')');
	});
	$("#logo").fadeIn('fast');
}

function click_selected() {
    var s_id = items_array[0][2];
    var attrib = $("#slider" + s_id).attr("href");
	var title = $("#slider" + s_id).attr("desc");
    show_p_window(attrib, title);
	clearInterval(rotate_interval);
	clearTimeout(rotate_timeout);
}

function close_p_window() {
	$("#p_content").html('');
    $("#p_window").fadeOut('fast');
    $("#shadow").fadeOut('fast');
	rotate_timeout = setTimeout('set_rotate_interval(' + rotation + ')', wait_rotation);
}

function show_p_window(href, title) {
	w_width = 720;
	w_height = $(window).height() - 2;
	var w_left;
	var w_top;
	
	w_left = ( ($(window).width() / 2 | 0) - (w_width / 2 | 0) );
	w_top = ( ($(window).height() / 2 | 0) - (w_height / 2 | 0) );
    $("#p_window").width(w_width);
	$("#w_title").html(title);
    $("#p_content").width(w_width - 10);
    $("#p_window").height(w_height);
	$("#p_window").css("left", w_left);
    $("#p_content").height(w_height - 34);
    $("#p_content").html(href);
    $("#p_window").fadeIn('fast');
    $("#shadow").fadeIn('fast');
    
	
	$.ajax({
		url: href,
		cache: false,
		beforeSend: function() {
			$("#p_content").html('<div id="loading"></div>');
			$('#loading').show();   
		},
		success: function(html){
			$('#loading').hide();
			$('#p_content').html(html);
		}
	});
}

$(document).ready(function() {
	define_event_handlers();
	slider_init();
});

$(window).resize(function() {
	realign_menu();
});