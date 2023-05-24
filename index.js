import { initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from " https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://playground-4c813-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const listInDB = ref(database, "shoppinglist")
const itemsEl=document.getElementById("items")
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(listInDB,inputValue)
    clear()
})
onValue(listInDB,function(snapshot){
    if (snapshot.exists()){
        let itemsArray= Object.entries(snapshot.val())
        clearItemsEl()
        for(let i=0; i<itemsArray.length; i++){
            let currentItem= itemsArray[i]
            let currentItemID= currentItem[0]
            let currentItemValue=currentItem[1]
        appendItemToShoppingListEl(currentItem)    
        }
 }else{
            itemsEl.innerHTML= "No items here...yet"
        }
})
function clear(){
    inputFieldEl.value = " "
}
function appendItemToShoppingListEl(item){
   let itemID= item[0]
   let itemValue=item[1]
   let newEl = document.createElement("li")
    newEl.textContent= itemValue
    itemsEl.append(newEl)   

newEl.addEventListener("click", function(){
    let exactLocationOfItemInDB = ref(database, `shoppinglist/${itemID}`  )
    remove(exactLocationOfItemInDB)
    })
}
function clearItemsEl(){
    itemsEl.innerHTML= " "
}