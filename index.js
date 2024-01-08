const selectTag=document.querySelectorAll("select");
const translateBtn = document.querySelector("button");
let fromText = document.querySelector(".from-text");
let toText = document.querySelector(".to-text");
let exchangeBtn=document.querySelector(".exchange");
let iconBtn = document.querySelectorAll(".icons");

selectTag.forEach((tag , id)=>{
    for (const country_code in countries) {
        let selected;
        if(id==0 && country_code=="en-GB")
        {
            selected = "selected";
        }
        else if(id==1 && country_code== "te-IN")
        {
            selected = "selected";
        }

      let option= ` <option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
      tag.insertAdjacentHTML("beforeend",option);
    }
});
exchangeBtn.addEventListener("click",()=>{
    let tempText = fromText.value;
    let tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
})

translateBtn.addEventListener("click",()=>
{
    let text=fromText.value;
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;
    let apiUrl=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data =>{
        toText.value = data.responseData.translatedText;
    });
});


iconBtn.forEach((icon)=>{
    icon.addEventListener("click",({target})=>{
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        }
        else{
            console.log("speech icon is clicked");
        }
    });

})

