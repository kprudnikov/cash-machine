import {
  InvalidArgumentException,
  NoteUnavailableException,
} from './custom-errors';

import {
  pushNTimes,
  isValidNumber,
} from './helpers';

/**
 * Simulates a delivery of notes from an ATM.
 * Splits passed value to a number of bills.
 * Examples:
 * cashMachine (170, [100, 50, 20, 10]) => [100, 50, 20]
 * cashMachine (100, [100, 50, 20, 10]) => [100]
 * @param {number} amount - amount to split
 * @param {array} notes - available set of notes
 * @returns {array}
 */
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