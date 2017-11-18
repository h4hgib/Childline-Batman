import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-bootstrap-time-picker';
import moment from 'moment';
import './style.scss';

const onChangeWrapper = (props, type, newValue) => {
	console.log('onChangeWrapper', props, type, newValue);
	const oldDate = moment(props.value);
	let newDate = moment(newValue);
	if (type === 'date') {
		newDate.hour(oldDate.hour());
		newDate.minute(oldDate.minute());
	} else if (type === 'time') {
		console.log('oldDate', oldDate);
		console.log('newDate', newDate);
		newDate.day(oldDate.day());
		newDate.month(oldDate.month());
		newDate.year(oldDate.year());
	}
	props.onChange(newDate.valueOf()); // TODO FIX THIS
}



class DateTimePicker extends Component {
	constructor(props) {
		super(props);
		
		this.onChangeWrapper = _.curry(onChangeWrapper)(this.props);
	}
	render() {
		const datedValue = new Date(this.props.value);
		return (<div className="datetimepicker">
			<div className="datetimepicker-date">
				<DatePicker
					calendarClassName={['datetimepicker-date-calendar']}
					value={datedValue}
					onChange={this.onChangeWrapper('date')}
				/>
			</div>
			<div className="datetimepicker-time">
				<TimePicker
					start="10:00"
					end="21:00"
					step={30} 
					value={this.props.value}
					onChange={this.onChangeWrapper('time')}
				/>
			</div>
		</div>);
	}
}

DateTimePicker.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.number
}

export default DateTimePicker;