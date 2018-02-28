JPlayer-SimpleWrapper
=====================

Wrapper of JPlayer to make its use easier.
It works with HTML tags, and you don't have to use JPlayer builders. It's specially usefull if you have to show players for a lot of media contents, all with the same format and extensions.

### Example of use

	<div id="3" class="player audio" path="folder/file_name_without_extension"></div>

  With this line, this script is going to load media file with the extensions specified in the script (by default 'm4a')
  
### HTML Params

This script works with all HTML tags with the class 'player'. It find all '.player' tags, and create the HTML and jPlayer object necessary. Params:

**class**:
`.player` 
(necessary class) marks its tag as a player handled by this script, 
`.audio` or `.video` 
(necessary one of them) marks its tag either audio or video content
  
**id**, necessary attribute. Its value doesn't matters (while it's unique).
**path**, necessary attribute. Name and path of file, without it's extension. In specified path must be all files with provided name and necessary extensions (explained later).

### Inner JavaScript variables

There are some variables in the script probably interesting to modify.
  
  `EXPECTED_AUDIO_EXTENSIONS`, `EXPECTED_VIDEO_EXTENSIONS`.
  Extensions of files loading, depending on media type it's used one or other variable (specified by class .audio or .video).
  In example: `EXPECTED_AUDIO_EXTENSIONS == ['mp3', 'ogg']`, and the HTML attributes  `class="player audio" path="audio/1"`, audio/1.mp3 and audio/1.ogg are going to be load
  
  
  `SUPPLIED_AUDIO_FORMATS`, `SUPPLIED_VIDEO_FORMATS`.
  These are the inner formats of provided media files, depending on media type it's used one or other variable. **See JPlayer official doc for more information**.
  Order matters, first format has more priority than the next.
  
  `PLAYER_CLASS`, `AUDIO_CLASS`, `VIDEO_CLASS`
  They store the by default `player`, `audio` and `video` classes respectively. They can be as you want.
  
  `ATTRIBUTE_FILE`
  The name of HTML attribute that stores the file's path and name. You can change it depending of your needs.
	
