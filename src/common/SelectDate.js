import React, {useState, useEffect} from 'react';
import {useSearchParams } from 'react-router-dom';
import moment from 'moment';

import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


/** SelectDate sets the URL query string to the selected date
 * Initial datae comes from query string or current date
 */
const SelectDate = () => {
  const [searchParams, setSearchParams] = useSearchParams("");

  const initialDate = searchParams.get('date') || moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(initialDate);

  useEffect(() => {
    const newDate = searchParams.get('date');
    if (newDate) {
      setDate(newDate);
    } else {
      setDate(moment().format("YYYY-MM-DD"));
      // setSearchParams({date: moment().format("YYYY-MM-DD")});
    }
  }, [searchParams, setSearchParams])
  
  return (
    <Box sx={{display:"flex", justifyContent:"center"}}>
      <DatePicker
        label="Date"
        value={date}
        onChange={(newDate) => setSearchParams({date: moment(newDate).format("YYYY-MM-DD")})}
        renderInput={(params) => <TextField {...params} sx={{backgroundColor: "#FFF", input: {fontSize:'20px', p:2}}}/>}
      />
    </Box>
  ) 
}

export default SelectDate;