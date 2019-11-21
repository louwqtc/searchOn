chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({color: '#3aa757'}, function(){
        console.log("The color is green.");
    });
    // chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
    //     chrome.declarativeContent.onPageChanged.addRules([{
    //         conditions: [new chrome.declarativeContent.PageStateMatcher({
    //             pageUrl: {hostEquals: 'developer.chrome.com'},
    //         })],
    //         actions: [new chrome.declarativeContent.ShowPageAction()]
    //     }]);
    // });
});

const searchInfo = {
    "wiki" : {
        "url" : "https://intunewiki.com/index.php?search=",
        "sep" : " "
    },
    "google" : {
        "url" : "https://www.google.com/search?q=",
        "sep" : " "
    },
    "github" : {
        "url" : "https://github.com/search?q=",
        "sep" : "+"
    },
    "bing" : {
        "url" : "https://www.bing.com/search?q=",
        "sep" : "+"
    },
    "baidu" : {
        "url" : "https://www.baidu.com/s?wd=",
        "sep" : " "
    },
    "leetcode" : {
        "url" : "https://leetcode-cn.com/problemset/all/?search=",
        "sep" : " "
    },
    "msazure" : {
        "url" : "https://msazure.visualstudio.com/One/_search?type=code&text=",
        "sep" : " "
    },
    "stackoverflow" : {
        "url" : "https://stackoverflow.microsoft.com/search?q=",
        "sep" : "+"
    },
    "bilibili" : {
        "url" : "https://search.bilibili.com/all?keyword=",
        "sep" : " "
    }
}
const fullPrefixs = ["wiki", "google", "github", "bing", "baidu", "leetcode", "msazure", "stackoverflow", "bilibili"];
const defaultPrefix = "google";

function getPrefix(str){
    for(var i=0;i<fullPrefixs.length;++i){
        if(fullPrefixs[i].startsWith(str)){
            return [true, fullPrefixs[i]];
        }
    }
    return [false, defaultPrefix];
}

chrome.omnibox.onInputEntered.addListener(
    function(text) {
        let words = text.split(' ');
        let query = words.slice(1);
        const [status, prefix] = getPrefix(words[0]);
        if(status == false){
            query = words;
        }
        query = query.join(searchInfo[prefix].sep);
        const newURL = searchInfo[prefix].url + query;
        chrome.tabs.update({ url: newURL });
});