let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data){
    console.log(data);
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element){
    console.log("element:"+element);
    let color = element.target.value;
    console.log("color:"+color);
}