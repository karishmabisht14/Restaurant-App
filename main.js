const form = document.getElementById('my-form');
const priceInput = document.getElementById('price');
const dishInput = document.getElementById('food');
const tableInput = document.querySelector('select');
const table1 = document.getElementById('table1');
const table2 = document.getElementById('table2');
const table3 = document.getElementById('table3');

//Network call for get request
window.addEventListener('DOMContentLoaded', () => {
    axios
        .get('https://crudcrud.com/api/909039ec53e9400da2d6a8c093ce82d5/bookingOrders')
        .then((response) => {
            // console.log(response.data)
            for(let i=0; i<response.data.length; i++)
            {   
                showOrders(response.data[i]);
            }
        })
        .catch(err => console.log(err));
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    //create object
    let obj = {
        price: priceInput.value,
        dish: dishInput.value,
        table: tableInput.value
    };

    //Network call for post request
    axios
        .post('https://crudcrud.com/api/909039ec53e9400da2d6a8c093ce82d5/bookingOrders', obj)
        .then((response) => {
            showOrders(response.data)
            // console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
        
        //clear Fields
        priceInput.value = "";
        dishInput.value = "";
        tableInput.value = obj.table;
});

function showOrders(orders) {
    //create li
    let li = document.createElement('li');
    
    let tables = orders.table;
    tables = tables.slice(5);

    //create deleteBTn
    deleteBtn = document.createElement('input')
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete Orders';
    deleteBtn.className = 'delete';
    deleteBtn.addEventListener('click', () => {
        //Network call for delete request
        axios
        .delete(`https://crudcrud.com/api/909039ec53e9400da2d6a8c093ce82d5/bookingOrders/${orders._id}`)
        .then(() => {
            li.remove();            
        })
        .catch(err => console.log(err.response.data));
    });

    li.appendChild(document.createTextNode(`${orders.price} - ${orders.dish} - ${orders.table}`));
    li.appendChild(deleteBtn);

    if(tables == 1)
    {   
        table1.appendChild(li);        
    }
    else if(tables == 2)
    {
        table2.appendChild(li); 
    }  
    else
    {
        table3.appendChild(li);   
    }  
    
}
