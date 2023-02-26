const backend_url = 'http://localhost:8888';

//submit button
let form = document.querySelector('#form-id');

document.addEventListener('DOMContentLoaded', loadAllItems);

//list of expenses
let itemList = document.querySelector('ul');
// loadItems();
//submitting for
form.addEventListener('submit', addExpense);

//deleting expense
itemList.addEventListener('click', removeExpense);

//editing expense
itemList.addEventListener('click', editExpense);

let update_btn = document.forms['form-body']['update_btn'];
update_btn.addEventListener('click', updateAppointment);
//add Expense
function addExpense(e){
    e.preventDefault();
    let amount = document.forms['form-body']['amount'].value;
    let description = document.forms['form-body']['desc'].value;
    let type = document.forms['form-body']['type'].value;
    // console.log(amount, desc, type);

    if(amount==null || amount=='' || description==null || description=='' || type==null || type==''){
        // console.log('Empty fields');
        let err_div = document.querySelector('#error');
        err_div.className = 'alert alert-danger';
        err_div.innerHTML = 'Please Enter all fields';

        setTimeout(function(){
            err_div.className = '';
            err_div.innerHTML = '';
        }, 4000);
        return;
    }
    let obj = {
        amount : amount,
        type : type,
        description : description
    }

    try{
        let asyncAddExpense = async () => {
            let item = await axios.post(`${backend_url}/add-expense`, obj);
            let li = createNewLi(item.data.id, item.data.amount, item.data.type, item.data.description);
            itemList.appendChild(li);
        }
        asyncAddExpense();
    }
    catch(err){
        console.log(err)
    }

    // localStorage.setItem(id, JSON.stringify(obj));

    

    document.forms['form-body'].reset();
}

//creating new List Item
function createNewLi(id, amount, type, desc){
    let li = document.createElement('li');
    li.className  = 'list-group-item';

    //delete button
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm delete'; 
    deleteBtn.id = 'delete'+id;
    deleteBtn.appendChild(document.createTextNode('delete expense'));

    //edit button
    var editBtn = document.createElement('button');
    editBtn.className = 'btn btn-primary btn-sm';
    editBtn.id = 'edit'+id;
    editBtn.appendChild(document.createTextNode('edit expense'));

    //creating a div to enclose them;
    var div = document.createElement('div');
    div.className = 'row-2 float-right';

    div.appendChild(deleteBtn);
    div.append(' '); // to space the delete and edit
    div.appendChild(editBtn); 

    li.appendChild(document.createTextNode(`${amount} - ${type} - ${desc}`));
    li.appendChild(div);
    return li;
}

function removeExpense(e){
    if(e.target.classList.contains('delete')){
        let li = e.target.parentElement.parentElement;
        const id = e.target.id[e.target.id.length-1];
        console.log(e.target.id[e.target.id.length-1]);
        itemList.removeChild(li);

        try{
            let asyncDeleteExpense = async () => {
                await axios.delete(`${backend_url}/delete-expense/${id}`);
            }
            asyncDeleteExpense();
        }   
        catch(err){
            console.log(err)
        }
    }
}

function editExpense(e){
    if(e.target.id.startsWith('edit')){
        let id = e.target.id.substring(4, e.target.id.length);
        console.log(id);
        // let obj = JSON.parse(localStorage.getItem(id));

        try{
            let asyncEditExpense = async () => {
                let item = await axios.get(`${backend_url}/${id}`);
                console.log(item);

                document.forms['form-body']['amount'].value = item.data.amount;
                document.forms['form-body']['type'].value = item.data.type;
                document.forms['form-body']['desc'].value = item.data.description;
        
                let li = e.target.parentElement.parentElement;
                itemList.removeChild(li);

                document.forms['form-body']['submit_btn'].style.display = "none";
                document.forms['form-body']['update_btn'].style.display = "block";
                document.forms['form-body']['update_btn'].id = item.data.id;
            }   
            asyncEditExpense();
        }
        catch(err){
            console.log(err)
        }
    }
}

function updateAppointment(e) {
    try {
        e.preventDefault();
        // console.log(e.target.id)
        let amount = document.forms['form-body']['amount'].value;
        let description = document.forms['form-body']['desc'].value;
        let type = document.forms['form-body']['type'].value;
        // console.log(amount, desc, type);

        if (amount == null || amount == '' || description == null || description == '' || type == null || type == '') {
            // console.log('Empty fields');
            let err_div = document.querySelector('#error');
            err_div.className = 'alert alert-danger';
            err_div.innerHTML = 'Please Enter all fields';

            setTimeout(function () {
                err_div.className = '';
                err_div.innerHTML = '';
            }, 3000);
            return;
        }
        // var id = getUniqueId();

        let obj = {
            amount: amount,
            type: type,
            description: description
        }
        try{
                let asyncUpdateExpense = async () => {
                let expense = await axios.put(`${backend_url}/edit-expense/${e.target.id}`, obj)
                
                    var li = createNewLi(e.target.id, expense.data.amount, expense.data.type, expense.data.description);
                    itemList.appendChild(li);
                    document.forms['form-body'].reset();
                    document.forms['form-body']['update_btn'].style.display = "none";
                    document.forms['form-body']['submit_btn'].style.display = "block";
            }
            asyncUpdateExpense();
        }
        catch(err){
            console.log(err);
        }
    }
    catch (err) {
        console.log(err)
    }
}

function loadAllItems(){

    try{
        let asyncLoadAllItems = async () => {
            let items = await axios.get(`${backend_url}/`);
            // console.log(items.data);
            for(let i=0;i<items.data.length;i++){
                let li = createNewLi(items.data[i].id, items.data[i].amount, items.data[i].type, items.data[i].description);
                itemList.appendChild(li);
            }
        }
        asyncLoadAllItems();
    }

    catch(err){
        console.log(err);
    }
}
