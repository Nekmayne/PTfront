import React, {useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import AddTraining from './AddTraining';
import SearchIcon from '@material-ui/icons/Search';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EditIcon from '@material-ui/icons/Edit';

function Customerlist() {

    const [customer, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = useState(''); 

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
    {
        method: 'POST',
        body: JSON.stringify(newCustomer),
        headers: { 'Content-type' : 'application/json' }

    })
        .then(_ => fetchCustomers())
        .catch(err => console.error(err))
  }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {

        method: 'POST',
        headers: {'Content-type': 'application/json' },
        body: JSON.stringify(training)
    })
        .then(_ => fetchCustomers())
        .then(_ => setMsg('Training saved succesfully'))
        .then(_ => setOpen(true))
    .   catch(err => console.error(err))
    }


    const deleteCustomer = (oldData) => {
        fetch(oldData.links[0].href,
            { method: 'DELETE' })

        .then(_ => fetchCustomers())
        .catch(err => console.error(err))
    }


    const editCustomer = (newData, oldData) => {
        fetch(oldData.links[0].href, {
            method: 'PUT',
            body: JSON.stringify(newData),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(_ => fetchCustomers())
        .catch(err => console.error(err))
    }


    const columns = [
        { title: 'Firstname', field: 'firstname' },
        { title: 'Lastname', field: 'lastname' },
        { title: 'Streetaddress', field: 'streetaddress' },
        { title: 'Postcode', field: 'postcode' },
        { title: 'City', field: 'city' },
        { title: 'Email', field: 'email' },
        { title: 'Phone', field: 'phone' },
        
    
    ]

    const tableIcons ={
        Search: SearchIcon,
        FirstPage: FirstPageIcon,
        LastPage: LastPageIcon,
        Right: ChevronRightIcon,
        Left: ChevronLeftIcon,
        Clear: ClearIcon,
        Delete: DeleteIcon,
        Edit: EditIcon
    
    }
    
    return(
        <div>
            
            <MaterialTable title="Customers"
            icons={tableIcons}
            data={customer}
            columns={columns}
            editable={{
                onRowAdd: newData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        addCustomer(newData)          
                        resolve()
                    }, 1000)
            }),

                onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        deleteCustomer(oldData)
                        resolve();
                    }, 1000);
            }),
                onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        editCustomer(newData, oldData)
                        resolve()                 
                    }, 1000)
            }),

              }}
              

              columns = {[
                {
                title: '', editable: 'never', field: 'links[0].href',
                render: oldData => <AddTraining  addTraining={addTraining} oldData={oldData}/>
                },
                {title: 'Firstname', field: 'firstname'},
                {title: 'Lastname', field: 'lastname'},
                {title: 'Streetaddress', field: 'streetaddress'},
                {title: 'Postcode', field: 'postcode'},
                {title: 'City', field: 'city'},
                {title: 'Email', field: 'email'},
                {title: 'Phone', field: 'phone'}
            ]}

              />
        </div>
    )

}

export default Customerlist;