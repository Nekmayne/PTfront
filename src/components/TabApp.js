import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Customerlist from './Customerlist'
import Trainings from './Trainings';
import Calendar from './Calendar';
import BarChart from './BarChart';

function TabApp() {

const [value, setValue] = useState('one');

const handleChange = (event, value) => {
    setValue(value);
};

    return(
        <div>
     <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Customers" />
          <Tab value="two" label="Trainings" />
          <Tab value="three" label="Calendar" />
          <Tab value="four" label="Chart" />
        </Tabs>
      </AppBar>
      {value === 'one' && <div><Customerlist/></div>}
      {value === 'two' && <div><Trainings/></div>}
      {value === 'three' && <div><Calendar/></div>}
      {value === 'four' && <div><BarChart/></div>}
        </div>
    );
};

export default TabApp;