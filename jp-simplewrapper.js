/**
	HOW TO USE:
	
	* Audio *
		Classes 'player', 'audio'. File path without extension. No matter HTML tag's id. 
		
		This script is going to load media file with name and path provided, and the file extensions stored in the 'EXPECTED_AUDIO_EXTENSIONS' global var 
		i.e. If EXPECTED_AUDIO_EXTENSIONS == ['mp3', 'ogg'], and the HTML line below, audio/1.mp3 and audio/1.ogg are going to be load
		
			<div id="3" class="player audio" path="audio/1"></div>
	
	
	* Video *
		Classes 'player', 'video'. File path without extension. No matter HTML tag's id. 
		
		This script is going to load media file with name and path provided, and the file extensions stored in the 'EXPECTED_VIDEO_EXTENSIONS' global var 
		i.e. If EXPECTED_VIDEO_EXTENSIONS == ['mp4', 'flv'], and the HTML line below, video/1.mp4 and video/1.flv are going to be load
		
			<div id="7" class="player video" path="video/1"></div>
 **/

/** CONSTANTS, can be modified here  **/
/** Base class for any Jplayer **/
var PLAYER_CLASS = 'player';
/** Base class for a JPlayer of only a play button (useful for fast plays) **/
var PLAYER_TINY_CLASS = 'tiny_player'
/** Class for audio JPlayer **/
var AUDIO_CLASS = 'audio';
/** Class for video JPlayer **/
var VIDEO_CLASS = 'video';
/** HTML tag attribute where is the path file **/
var ATTRIBUTE_FILE = 'path';

var ID_PLAYER_BASE = 'jquery_jplayer_';
var ID_CONTAINER_BASE = 'jp_container_';

/**
	*_FORMATS, format that is going to take JPlayer API, see its doc for more information. Priority cares.
	*_EXTENSIONS, extensions of path files

	NOTE: '.mp4' file extension support both video and audio. Jplayer takes m4a as audio mp4 format, and m4v as video.
**/
var SUPPLIED_AUDIO_FORMATS = ["m4a"];		
var EXPECTED_AUDIO_EXTENSIONS= ["m4a"];		

var SUPPLIED_VIDEO_FORMATS = ["m4v"];		
var EXPECTED_VIDEO_EXTENSIONS= ["mp4"];		

var PLAYER_SIZE = {
	TINY: 'tiny', 
	NORMAL: 'normal'
};
/**
  * Iterate over DOM elements with class as 'player', creating a player inside them
 **/
var iteratePlayers=function (){
	$('.'+PLAYER_TINY_CLASS).each(function(index, element){
		var idContainer = ID_CONTAINER_BASE + element.id;
		var idPlayer = ID_PLAYER_BASE + element.id;
		injectAndCreatePlayer(element, idPlayer, idContainer, PLAYER_SIZE.TINY);
	});

	$('.'+PLAYER_CLASS).each(function(index, element){
		var idContainer = ID_CONTAINER_BASE + element.id;
		var idPlayer = ID_PLAYER_BASE + element.id;
		injectAndCreatePlayer(element, idPlayer, idContainer, PLAYER_SIZE.NORMAL);
	});
}

/**
  * Inject audio player HTML inside a jQuery element
  * jqElement: jQuery element where jPlayer is injected
 **/
var injectHTMLAudioPlayer= function (jqElement, idPlayer, idContainer, playerSize){
	//insert the base HTML
	jqElement.html( (playerSize === PLAYER_SIZE.TINY)? STRING_HTML_TINY_AUDIO : STRING_HTML_AUDIO);
	//modify the player div's id
	jqElement.children('#'+ID_PLAYER_BASE).attr('id', idPlayer);
	//modify the container player div's id
	jqElement.children('#'+ID_CONTAINER_BASE).attr('id', idContainer);
}

/**
  * Inject video player HTML inside a jQuery element
  * jqElement: jQuery element where jPlayer is injected
 **/
var injectHTMLVideoPlayer= function (jqElement, idPlayer, idContainer){
	//insert the base HTML
	jqElement.html(STRING_HTML_VIDEO);
	//modify the player div's id
	var container = jqElement.children('#'+ID_CONTAINER_BASE);
	container.attr('id', idContainer);
	//modify the container player div's id
	container.children('.jp-type-single').children('#'+ID_PLAYER_BASE).attr('id', idPlayer);
}

/**
  * Inject player HTML inside a DOM element, and create its player, considering if it's audio (SUPPLIED_AUDIO_FORMATS) or video (SUPPLIED_VIDEO_FORMATS)
  * element: DOM element where jPlayer is injected
  * idContainer: id of new DOM div of class $ID_CONTAINER_BASE
  * idPlayer: id of new DOM div of class $ID_PLAYER_BASE
 **/
var injectAndCreatePlayer = function (element, idPlayer, idContainer, playerSize){
	var jqElement = $('#'+element.id);
	var file = element.attributes[ATTRIBUTE_FILE].value;
	var isAudio = element.classList.contains(AUDIO_CLASS);
	var isVideo = element.classList.contains(VIDEO_CLASS) ;
	
	var mediaFormat = new Object();
	
	if (isAudio) {
		injectHTMLAudioPlayer(jqElement, idPlayer, idContainer, playerSize);
		//Gets creator function considering if it's a tiny or normal audio player
		var creatorPlayer = (playerSize === PLAYER_SIZE.TINY)? createTinyPlayer : createPlayer;
		//Build media object, with provided audio files
		for(var i=0; i<SUPPLIED_AUDIO_FORMATS.length; i++) {
			mediaFormat[ SUPPLIED_AUDIO_FORMATS[i] ] = file + '.' + EXPECTED_AUDIO_EXTENSIONS[i];
		}
		creatorPlayer(idPlayer, idContainer, mediaFormat, SUPPLIED_AUDIO_FORMATS);
	} else if (isVideo){
		injectHTMLVideoPlayer(jqElement, idPlayer, idContainer);
		//Build media object, with provided video files
		for(var i=0; i<SUPPLIED_VIDEO_FORMATS.length; i++) {
			mediaFormat[ SUPPLIED_VIDEO_FORMATS[i] ] = file + '.' + EXPECTED_VIDEO_EXTENSIONS[i];
		}
		
		createPlayer(idPlayer, idContainer, mediaFormat, SUPPLIED_VIDEO_FORMATS);
	}	
}

/**
  * Create a jPlayer over his existing DOM structure
  * setMedia: setMedia jPlayer object
  * suppliedFormats: supplied jPlayer's field, supplied format's name divided by ','
 **/
var createPlayer = function(idPlayer, idContainer, setMedia, suppliedFormats){
	$("#"+idPlayer).jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", setMedia);
		},
		play: function() { // To avoid multiple jPlayers playing together.
			$(this).jPlayer("pauseOthers");
		},
		swfPath: "js",
		supplied: suppliedFormats.toString(),
		cssSelectorAncestor: "#"+idContainer,
		solution: "html, flash",
		wmode: "direct",
		globalVolume: true,
		smoothPlayBar: true,
		keyEnabled: true,
		errorAlerts: true,
		warningAlerts: false
	});
}

var createTinyPlayer = function(idPlayer, idContainer, setMedia, suppliedFormats){
	$("#"+idPlayer).jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", setMedia);
		},
		play: function() { // To avoid multiple jPlayers playing together.
			$(this).jPlayer("pauseOthers");
		},
		swfPath: "js",
		supplied: suppliedFormats.toString(),
		cssSelectorAncestor: "#"+idContainer,
		solution: "html, flash",
		wmode: "window",
		errorAlerts: true,
		warningAlerts: false
	});
}

/**
  * WHEN DOCUMENT IS READY
**/
$(document).ready(function(){
	iteratePlayers();
	console.log(window.performance);
});

/**
  Embedded HTML. Uggly design, implementation and performace :'(  
  It's made this way because if it's an offline website (locally storaged, in a CD for example), and it's taken from another HTML file, some browsers don't like it (firefox i.e.)
  
  TODO : put it in another HTML file and don't use concat strings like this way (uggly performance)
  TODO2: use moustache (or another JS template system) with standard inner variables, to let users change template without knowing how it works
**/
var STRING_HTML_AUDIO = '<div id="jquery_jplayer_" class="jp-jplayer"></div>' +
	'<div id="jp_container_" class="jp-audio">'+
		'<div class="jp-type-single">'+
		  '<div class="jp-gui jp-interface">'+
			'<ul class="jp-controls">'+
			  '<li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>'+
			  '<li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>'+
			  '<li><a href="javascript:;" class="jp-stop" tabindex="1">stop</a></li>'+
			  '<li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">mute</a></li>'+
			  '<li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">unmute</a></li>'+
			'</ul>'+
			'<div class="jp-progress">'+
			  '<div class="jp-seek-bar">'+
	'			<div class="jp-play-bar"></div>'+
			  '</div>'+
			'</div>'+
			'<div class="jp-volume-bar">'+
			  '<div class="jp-volume-bar-value"></div>'+
			'</div>'+
			'<div class="jp-time-holder">'+
			  '<div class="jp-current-time"></div>'+
			  '<div class="jp-duration"></div>'+
			'</div>'+
		  '</div>'+
		  '<div class="jp-no-solution">'+
			'<span>Update Required</span>'+
			'To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.'+
		  '</div>'+
		'</div>'+
	'</div>';
	
var STRING_HTML_TINY_AUDIO = '<div id="jquery_jplayer_" class="jp-jplayer"></div>' +
	'<div id="jp_container_" class="jp-audio">'+
		'<div class="jp-type-single">'+
		  '<div class="jp-gui jp-interface">'+
			'<ul class="jp-controls">'+
			  '<li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>'+
			'</ul>'+
		  '</div>'+
		  '<div class="jp-no-solution">'+
			'<span>Update Required</span>'+
			'To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.'+
		  '</div>'+
		'</div>'+
	'</div>';
	
var STRING_HTML_VIDEO = 
 '		       <div id="jp_container_" class="jp-video ">' + 
 '					<div class="jp-type-single">' + 
 '						<div id="jquery_jplayer_" class="jp-jplayer"></div>' + 
 '						<div class="jp-gui">' + 
 '							<div class="jp-video-play">' + 
 '								<a href="javascript:;" class="jp-video-play-icon" tabindex="1">play</a>' + 
 '							</div>' + 
 '							<div class="jp-interface">' + 
 '								<div class="jp-progress">' + 
 '									<div class="jp-seek-bar">' + 
 '										<div class="jp-play-bar"></div>' + 
 '									</div>' + 
 '								</div>' + 
 '							    <div class="jp-current-time"></div>' + 
 '							    <div class="jp-duration"></div>' + 
 '							    <div class="jp-controls-holder">' + 
 '								    <ul class="jp-controls">' + 
 '								        <li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>' + 
 '								        <li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>' + 
 '								        <li><a href="javascript:;" class="jp-stop" tabindex="1">stop</a></li>' + 
 '								        <li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">mute</a></li>' + 
 '								        <li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">unmute</a></li>' + 
 '								        <li><a href="javascript:;" class="jp-volume-max" tabindex="1" title="max volume">max volume</a></li>' + 
 '								    </ul>' + 
 '								<div class="jp-volume-bar">' + 
 '								    <div class="jp-volume-bar-value"></div>' + 
 '								</div>' + 
 '								<ul class="jp-toggles">' + 
 '								    <li><a href="javascript:;" class="jp-full-screen" tabindex="1" title="full screen">full screen</a></li>' + 
 '								    <li><a href="javascript:;" class="jp-restore-screen" tabindex="1" title="restore screen">restore screen</a></li>' + 
 '								    <li><a href="javascript:;" class="jp-repeat" tabindex="1" title="repeat">repeat</a></li>' + 
 '								    <li><a href="javascript:;" class="jp-repeat-off" tabindex="1" title="repeat off">repeat off</a></li>' + 
 '								</ul>' + 
 '							    </div>' + 
 '							    <div class="jp-details">' + 
 '								    <ul>' + 
 '								        <li><span class="jp-title"></span></li>' + 
 '								    </ul>' + 
 '							    </div>' + 
 '							</div>' + 
 '						  </div>' + 
 '						  <div class="jp-no-solution">' + 
 '							<span>Update Required</span>' + 
 '							To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.' + 
 '						  </div>' + 
 '					</div>' + 
 '			    </div>	'
;				
