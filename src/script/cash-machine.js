import {
  InvalidArgumentException,
  NoteUnavailableException,
} from './custom-errors';

import {
  pushNTimes,
  isValidNumber,
} from './helpers';

export default function cashMachine (amount, notes) {
  if (amount <= 0 || !Array.isArray(notes) || !notes.length) {
    throw new InvalidArgumentException();
  }

  const invalidNote = notes.find((el) => !isValidNumber(el) || el <= 0);
  if (invalidNote) {
    throw new InvalidArgumentException();
  }

  const sortedNotes = notes.sort((a,b) => b-a);
  let result = [];

  let i = 0;
  while(amount && i < sortedNotes.length) {
    if (amount >= sortedNotes[i]) {
      const billCount = Math.floor(amount / sortedNotes[i]);
      pushNTimes(result, billCount, sortedNotes[i]);
      amount = amount % sortedNotes[i];
    }

    i++;
  }

  if (amount) {
    throw new NoteUnavailableException();
  }

  return result;
}