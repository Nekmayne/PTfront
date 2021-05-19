import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';

function Trainings() {

const [trainings, setTrainings] = useState([]);

useEffect(() => {
    getTrainings();
},[])

const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
}

const deleteTraining = (oldData) => {
    fetch('https://customerrest.herokuapp.com/api/trainings/' + oldData.id, {
        method: 'DELETE'
    })
    .then(_ => getTrainings())
    .catch(err => console.error(err))
   }
   
return(
    <div>
        <div>
            <MaterialTable
                columns = {[

                {title: 'Activity', field: 'activity'},
                {title: 'Date', field: 'date', type: 'datetime'},
                {title: 'Duration (min)', field: 'duration'},
                {title: 'Customer', render: (data) => data.customer.firstname + " " + data.customer.lastname}
                
                ]}

                title="Trainings"
                data={trainings}
                editable={{
                    onRowDelete: oldData =>
                    new Promise((resolve, reject)=> {
                        setTimeout(() => {   
                            deleteTraining(oldData)
                            resolve();
                        }, 1000)    
                    })
                }}
            />
        </div>
    </div>
);
};

export default Trainings;