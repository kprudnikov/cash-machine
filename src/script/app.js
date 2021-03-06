import cashMachine from './cash-machine';
import {
  renderNodeFromTemplate,
  isValidNumber,
} from './helpers';
import {
  formTemplate,
  notesWrapperTemplate,
  noteTemplate,
} from './templates';

import '../styles/withdraw-form.css';

/**
 * Class representing a cash machine instance
 */
export default class CashMachineApp {
  /**
   * @param {HTMLElement} rootNode - node to render app to
   * @param {object} userConfig - optional
   * @param {function} userConfig.cashMachine - function to convert number into bills
   * @param {array} userConfig.availableNotes
   * @param {array} userConfig.maxValue - max amount to be withdrawn
   */
  constructor(rootNode, userConfig = {}) {
    const defaultConfig = {
      cashMachine,
      availableNotes: [100, 50, 20, 10],
      maxValue: 1000000000,
    };

    this.config = Object.assign(defaultConfig, userConfig);

    this.rootNode = rootNode;
    this.formNode = renderNodeFromTemplate(formTemplate());
    this.inputField = this.formNode.querySelector('#withdraw-amount');
    this.errorMessageWrapper = this.formNode.querySelector('#error-message');
    this.billsWrapper = renderNodeFromTemplate(notesWrapperTemplate());
    this.inputValue = null;

    this.addEvents();
    this.renderInit();
  }

  /**
   * Binds event listeners to the DOM
   */
  addEvents() {
    this.inputField.addEventListener('keyup', () => {
      this.inputValue = parseFloat(this.inputField.value);
    });

    this.inputField.addEventListener('change', () => {
      this.inputValue = parseFloat(this.inputField.value);
    });

    this.inputField.addEventListener('focus', () => {
      this.renderError(false);
    });

    this.formNode.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!isValidNumber(this.inputValue)) {
        this.renderError(true);
      } else if (this.inputValue > this.config.maxValue) {
        this.renderError(true, `Value is too big. Max value is ${this.config.maxValue}`);
      } else {
        try {
          const notes = this.config.cashMachine(this.inputValue, this.config.availableNotes);
          const collectedNotes = notes.reduce((acc, curr) => {
            acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
            return acc;
          }, {});
          this.renderNotes(collectedNotes);
          this.renderError(false);
        } catch (e) {
          this.renderError(true, e.message)
        }
      }
    });
  }

  /**
   * Renders initial DOM
   */
  renderInit() {
    this.rootNode.appendChild(this.formNode);
    this.rootNode.appendChild(this.billsWrapper);
  }

  /**
   * Renders an error message
   * @param {boolean} showError - whether an error should be shown or hidden
   * @param {string} errorMessage
   */
  renderError(showError = false, errorMessage = 'Input should be a valid number') {
    if (showError) {
      this.formNode.classList.add('has-error');
      this.errorMessageWrapper.textContent = errorMessage;
    } else {
      this.formNode.classList.remove('has-error');
    }
  }

  /**
   * Renders bills into DOM
   * @param {array} notes - [{ billValue: billCount }]
   */
  renderNotes (notes) {
    this.billsWrapper.innerHTML = Object.keys(notes).map(key =>
      noteTemplate(key, notes[key])
    ).join('');
  }
}