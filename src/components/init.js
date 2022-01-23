
export default function init(nr){
    const cards=[]
    let id=0
    let url
    for(let i=0;i<nr*nr/2;i++){
        do{
            url=`https://picsum.photos/id/${Math.floor(Math.random()*100)}/200`
        }while(!checkImage(url))
        cards.push(url)
    }
    //a tömb duplázása:
    const cardsDupla=cards.reduce((acc,url)=>{
        acc.push({id:id++,url})
        acc.push({id:id++,url})
        return acc
        },[])
    //a tömb véletlenszerű keverése:
    cardsDupla.sort(() => Math.random() - 0.5);
    console.log("a tomb hossza:"+cardsDupla.length)
return cardsDupla
}

//ellenőrizni, hogy az adott url-en van-e kép?
async function checkImage(url){
    const res = await fetch(url);
    const blob = await res.blob();
    //console.log(blob.type)
    return blob.type.startsWith('image/')
}