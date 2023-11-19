import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import BasicTextInput from './BasicTextInput';
import {GestureHandlerEvent} from 'react-native-reanimated/lib/typescript/reanimated2/hook';


interface DatePickerProps {
  date: Date | undefined;
  setDate(date: Date | undefined): void;
  label: string;
}

function DatePicker({date, setDate, label}: DatePickerProps): JSX.Element {
  const [showDate, setShowDate] = useState<boolean>(false);
  const [today] = useState<Date>(new Date());

  function changeDate(
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined,
  ): void {
    const currentDate = selectedDate;
    setDate(currentDate);
    setShowDate(false);
  }


  function handleClick(event: GestureHandlerEvent): void | undefined {
    setShowDate(true);
    return;
  }

  return (
    <>
      <BasicTextInput
        value={date && date.toLocaleDateString('fr')}
        label={label}
        clickHandler={handleClick}
        showKeyboardOnTouch={false}
      />
      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date == null ? new Date() : date}
          mode="date"
          is24Hour={true}
          onChange={changeDate}
          maximumDate={today}
        />
      )}
    </>
  );
}

export default DatePicker;
