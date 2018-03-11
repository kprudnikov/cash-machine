/**
 * Static template for an input form
 * @returns {string}
 */
export function formTemplate() {
  return `<form class="input-group withdraw-form" id="withdraw-form" novalidate>
            <input type="number" step="0.01" id="withdraw-amount" class="form-control" placeholder="Enter amount to withdraw">
            <div class="tooltip bottom" role="tooltip">
              <div class="tooltip-arrow" style="left: 50%;"></div>
              <div class="tooltip-inner" id="error-message">Error message</div>
            </div>
            <div class="input-group-btn">
              <button class="btn btn-primary">Withdraw</button>
            </div>
          </form>`;
}

/**
 * Static template for a notes container
 * @returns {string}
 */
export function notesWrapperTemplate() {
  return '<ul class="nav nav-pills"></ul>';
}

/**
 * Renders string template for a single note
 * @param {string|number} noteValue
 * @param {string|number} notesCount
 * @returns {string}
 */
export function noteTemplate(noteValue, notesCount=1) {
  return `<li class="h3">
            <span class="label label-success">${noteValue}
              <span class="badge">${notesCount}</span>
            </span>
          </li>`;
}
