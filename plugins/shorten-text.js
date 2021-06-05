import Vue from 'vue'

function truncate(text, length, suffix) {
    if (text.length > length) {
        return text.substring(0, length) + suffix;
    } else {
        return text;
    }
}

Vue.filter('shortenText', truncate)