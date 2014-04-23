
module.exports = {
    inArray: function(needle, haystack){
	var length = haystack.length;
	for (var i = 0; i < length; i++){
	    if (haystack[i] == needle) return true;
	}
	return false;
    },

    spliceLine: function(text, lineStart, lineEnd){
	var lines = text.split('\n');
	lines.splice(lineStart, lineEnd);
	return lines.join('\n');
    }
}
