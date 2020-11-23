let items = []
const inventoryList = () => {
    const add = (name) => {
         items.push(name)
    }
    const remove = (name)=>{
        return items.filter((item)=>item!==name)
    } 
    const getList = () =>{
        console.log("Items: ",items)
        return items
    }

    return {add, remove, getList}
}
inventoryList().add("pippo")
inventoryList().getList()
