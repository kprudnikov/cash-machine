import { expect } from 'chai';

import cashMachine from '../src/script/cash-machine';
import {
  InvalidArgumentException,
  NoteUnavailableException,
} from '../src/script/custom-errors';

describe('cash machine:', () => {
  const defaultNotes = [10, 20, 50, 100];

  it('throws InvalidArgumentException if invalid value is passed', () => {
    expect(cashMachine.bind(null, -1, defaultNotes)).to.throw().and.to.satisfy(err =>
      err.name === new InvalidArgumentException().name
    );

    expect(cashMachine.bind(null, null, defaultNotes)).to.throw().and.to.satisfy(err =>
      err.name === new InvalidArgumentException().name
    );

    expect(cashMachine.bind(null, 100, {})).to.throw().and.to.satisfy(err =>
      err.name === new InvalidArgumentException().name
    );
  });

  it('throws InvalidArgumentException if empty array of available bills is passed', () => {
    expect(cashMachine.bind(null, 100, [])).to.throw().and.to.satisfy(err =>
      err.name === new InvalidArgumentException().name
    );
  });

  it('throws NoteUnavailableException if a sum cannot be collected of available notes', () => {
    expect(cashMachine.bind(null, 125, defaultNotes)).to.throw().and.to.satisfy(err =>
      err.name === new NoteUnavailableException().name
    );
  });

  it('returns an array', () => {
    expect(cashMachine(100, defaultNotes)).to.be.instanceof(Array);
  });

  it('delivers the smallest number of notes', () => {
    const notes = cashMachine(180, defaultNotes);
    expect(notes).to.have.lengthOf(4);
    expect(notes[0]).to.equal(100);
    expect(notes[1]).to.equal(50);
    expect(notes[2]).to.equal(20);
    expect(notes[3]).to.equal(10);
  });

  it('handles decimals', () => {
    const notes = cashMachine(10.5, [5, 1, 0.5]);
    expect(notes).to.have.lengthOf(3);
    expect(notes[0]).to.equal(5);
    expect(notes[1]).to.equal(5);
    expect(notes[2]).to.equal(0.5);
  })
});