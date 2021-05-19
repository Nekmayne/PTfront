import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import SearchIcon from '@material-ui/icons/Search';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClearIcon from '@material-ui/icons/Clear';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DeleteIcon from '@material-ui/icons/Delete';


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
   
const tableIcons ={
    Search: SearchIcon,
    FirstPage: FirstPageIcon,
    LastPage: LastPageIcon,
    Right: ChevronRightIcon,
    Left: ChevronLeftIcon,
    Clear: ClearIcon,
    Delete: DeleteIcon

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
    icons={tableIcons}  
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