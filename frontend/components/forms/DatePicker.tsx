import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';

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
  function handleClick(): void {
    setShowDate(true);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        label={label}
        mode="outlined"
        value={date?.toLocaleDateString('fr')}
        showSoftInputOnFocus={false}
        onPressIn={handleClick}
      />
      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date ?? new Date()}
          mode="date"
          is24Hour={true}
          onChange={changeDate}
          maximumDate={today}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export default DatePicker;
