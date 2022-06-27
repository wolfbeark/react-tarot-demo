

let DefaultMajorArcana = new Array(78);

function defaultSetting(){
    for(let i = 0; i < DefaultMajorArcana.length; i++){
        let tempAddress = `/images/ArcanaOfCard/DefaultImages/TotalImages/Default${i}.png`
        DefaultMajorArcana[i] =
            tempAddress
    }
//.replace(/\`/gi, '');
}
defaultSetting();


export default DefaultMajorArcana;