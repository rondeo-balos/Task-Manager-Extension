$('#addt_btn').click(function(){
	add_task();
});

$('#report_link').click(function(){
	report();
});

$('#update_link').click(function(){
	update();
});

remover = function(){
	$('.remove').click(function(){
		remove(this.parentElement);
	});
}

var new_task = '<div class="ttask"><a href="#remove" class="remove">&times;</a><hr><label>Name<br><input type="text" value="Task Name"></label><label>From<br><input type="date" class="fromd"><input type="time" class="fromt"></label><label>To<br><input type="date" class="tod"><input type="time" class="tot"></label><label>Status<br><select><option>Pending</option><option>In Progress</option><option>Lacks Details</option><option>Incomplete</option><option>Completed</option></select></label></div>';

update = function(){
	var updatestr = "<b>UPDATE</b><br>";
	$.each($("input[type='text']"),function(i,e){
		var status = $($("select")[i]).val();
		updatestr += '<b>[b]' + status.toUpperCase().replace("COMPLETED","WIN") + '[/b]</b> - ' + $(e).val() + '<br>';
	});
	$("#text").html(updatestr+"<br><br>"+$("#notes").val());
}

report = function(){
	var reportstr = '<b>END OF THE DAY REPORT</b><br><br>';
	reportstr += 'VA NAME: <b>RONDEO S. BALOS</b><br>DATE: <b>' + (localStorage.datestr||'') + '</b><br><br>';
	$.each($(".fromd"),function(i,e){
		reportstr += 'Project/Task #' + (i+1) + ': ' + $($("input[type='text']")[i]).val() + '<br>';
		reportstr += 'Time: ' + new Date($($(".fromd")[i]).val() + ' ' + $($(".fromt")[i]).val()).toLocaleString().replace(',','') + ' - ' + new Date($($(".tod")[i]).val() + ' ' + $($(".tot")[i]).val()).toLocaleString().replace(',','') + '<br>';
		reportstr += 'Status: ' + $($("select")[i]).val() + '<br><br>';
	});
	$("#text").html(reportstr);
}

set_date = function(datestr){
	localStorage.datestr = datestr;
}

add_task = function(){
	$("#tcontent").append(new_task);
	remover();
	save();
}

var names = localStorage.names?JSON.parse(localStorage.names):[];
var dates = localStorage.dates?JSON.parse(localStorage.dates):[];
var times = localStorage.times?JSON.parse(localStorage.times):[];
var statuses = localStorage.statuses?JSON.parse(localStorage.statuses):[];

save = function(){
	localStorage.content = $("#tcontent").html();
	names = [];
	$.each($("input[type='text']"),function(i,e){
		names.push($(e).val());
	});
	localStorage.names = JSON.stringify(names);
	dates = [];
	$.each($("input[type='date']"),function(i,e){
		dates.push($(e).val());
	});
	localStorage.dates = JSON.stringify(dates);
	times = [];
	$.each($("input[type='time']"),function(i,e){
		times.push($(e).val());
	});
	localStorage.times = JSON.stringify(times);
	statuses = [];
	$.each($("select"),function(i,e){
		statuses.push($(e).val());
	});
	localStorage.statuses = JSON.stringify(statuses);
	localStorage.notes = $("#notes").val();
}

$(document).ready(function(){
	$("#tcontent").html(localStorage.content||'');
	names = localStorage.names?JSON.parse(localStorage.names):[];
	$.each($("input[type='text']"),function(i,e){
		$(e).val(names[i]);
	});
	dates = localStorage.dates?JSON.parse(localStorage.dates):[];
	$.each($("input[type='date']"),function(i,e){
		$(e).val(dates[i]);
	});
	times = localStorage.dates?JSON.parse(localStorage.times):[];
	$.each($("input[type='time']"),function(i,e){
		$(e).val(times[i]);
	});
	statuses = localStorage.statuses?JSON.parse(localStorage.statuses):[];
	$.each($("select"),function(i,e){
		$(e).val(statuses[i]);
	});

	$("#notes").val(localStorage.notes||"");

	remover();

	setInterval(function(){
		save();
	},300);
});

var temp;

function remove(doc){
	$(doc).remove();
	save();
}

function clearCache(){
	localStorage.content = '';
	document.location = '?';
}