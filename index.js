let notification = document.querySelector(".notification");
let notificationShow = document.querySelector(".notificationShow");
let selectDate = document.querySelector("#selectDate");
let typeMessage = document.querySelector("#typeMessage");
let setMessageBtn = document.querySelector("#setMessageBtn");
let meassageContent = document.querySelector("#meassageContent");
let reloadPage = document.getElementById("reloadPage");
let contentsTypes = document.getElementById("contentsTypes");


let currentDate = new Date();
let day = currentDate.getDate() <= 9 ? "0" + currentDate.getDate() : currentDate.getDate();
let month = currentDate.getMonth() <= 9 ? "0" + currentDate.getMonth() : currentDate.getMonth();
month = Number(month) + "1";
let year = currentDate.getFullYear();
let fullDays = `${year}-${month}-${day}`
console.log(fullDays)


notification.addEventListener("click", ()=>{
    contentsTypes.classList.toggle('d-none');
});

reloadPage.addEventListener("click", ()=>{
    document.location.reload();
})


let storeData = {};
let allData = [];

setMessageBtn.addEventListener("click", (e)=>{
    let dateText = selectDate.value;
    let message = typeMessage.value;
    storeData = {
        date : dateText,
        message : message
    }
    allData.push(storeData)
    datStorageLocal()
    e.preventDefault()
    displayData();
});


function messageMatch(){
    allData.map((Mdata)=>{
        if(fullDays == Mdata.date){
            notificationShow.innerHTML = `<p>${Mdata.message}</p>`
            notification.classList.add('alertNotifi')
            setInterval(()=>{
                alert("This is your Message")
            }, 15000)
        }else{
            console.log(currentDate.getDate())
        }
    })
}
function datStorageLocal(){
    localStorage.setItem('StoreData', JSON.stringify(allData));   
}
function displayData(){
    meassageContent.innerHTML =  allData.map((data, index)=> `<tr id="${index}"><td>${data.date}</td><td>${data.message}</td> <td><button class="btn btn-danger" onClick="deleteData(this)"><i class="fa fa-times" aria-hidden="true"></i></button></td></tr>`)
}
function deleteData(e){
    allData.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem('StoreData', JSON.stringify(allData));
}
(()=>{
    allData = JSON.parse(localStorage.getItem("StoreData")) || [];
    displayData();
    messageMatch();
})();
console.log(allData)