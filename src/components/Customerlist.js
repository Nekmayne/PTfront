import React, {useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import AddTraining from './AddTraining';

function Customerlist() {

    const [customer, setCustomers] = useState([]);

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
    
    return(
        <div>
            <MaterialTable title="Customers"
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