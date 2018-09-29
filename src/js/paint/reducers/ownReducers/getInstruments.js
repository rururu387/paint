'use strict';

module.exports = settings => (state = settings, action) => {
    switch (action.type) {
        case 'CHANGE_LINE_THICKNESS':
            return Object.assign({}, state, {
                currentLineThickness: action.currentLineThickness
            });
        case 'CHANGE_INSTRUMENTS':
            return Object.assign({}, state, {
                currentInstruments: action.instruments
            });
        case 'CHANGE_COLOR':
            return Object.assign({}, state, {
                "currentColor": action.color
            });
        default:
            return state;
    }
}