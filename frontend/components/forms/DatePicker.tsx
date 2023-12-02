import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import BasicTextInput from './BasicTextInput';

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
    // Si non null et date différente d'aujourd'hui
    if (
      currentDate != null &&
      !(
        today.getDate() === currentDate.getDate() &&
        today.getMonth() === currentDate.getMonth() &&
        today.getFullYear() === currentDate.getFullYear()
      )
    ) {
      setDate(currentDate);
    }
    setShowDate(false);
  }
  function handleClick(): void | undefined {
    setShowDate(b => !b);
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
