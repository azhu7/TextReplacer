function generateGarbageDictionary() {
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    dict = {};
    for (var i = 0; i < chars.length; i++) {
        dict[chars.charAt(i)] = chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return dict;
}

function garbageText(text) {
    return text.replace(/[a-z]/gi, m => garbageDictionary[m]);
}

function mappedText(text) {
    var regexString = "";
    for (var key in custom) {
        regexString += key + '|';
    }
    regexString = regexString.slice(0, -1);

    regex = new RegExp(regexString, "gi");
    return text.replace(regex, function replacer(m) {
        return custom[m.toLowerCase()];
    });
}

var elements = document.getElementsByTagName('*');
var garbageDictionary = generateGarbageDictionary();

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var replacedText = mappedText(text);

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}