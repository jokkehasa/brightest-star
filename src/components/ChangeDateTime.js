import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

function ChangeDateTime(props) {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                value={props.time}
                onChange={(newDate) => {
                    props.setTime(newDate);
                }}
            />
        </LocalizationProvider>
    )
}

export default ChangeDateTime;