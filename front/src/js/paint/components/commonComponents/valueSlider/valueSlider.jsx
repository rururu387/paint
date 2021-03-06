'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { PimpDote } from '../simpleComponents/pimpDote';

import { DragAndDrop } from './../../../libs/dragAndDrop/dragAndDrop';

let sizePoint = 20;

let stylesValueSlider = {
    position: 'relative',
    display: 'flex',
    margin: '0 15px',
    flexGrow: 1,
    height: '2px',
    backgroundColor: 'black',
};

let stylePip = {
    position: 'absolute',
    top: '-10px',
    left: '-10px',
    display: 'none',
    width: `${sizePoint}px`,
    height: `${sizePoint}px`,
};

export default class ValueSlider extends React.Component {
    static defaultProps = {
        min: 0,
        max: 0,
        cur: 0,
        changingValue: 1,
        changing: () => {},
        config: {
            subValue: false,
            showValue: false,
            styles: {},
        },
    };

    static propTypes = {
        min: PropTypes.number,
        cur: PropTypes.number,
        max: PropTypes.number,
        changingValue: PropTypes.number,
        changing: PropTypes.func,
        config: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this._pimp = React.createRef();
        this._deleteDnd = () => {};
    }

    render() {
        return (
            <div style={stylesValueSlider}>
                <PimpDote
                    style={stylePip}
                    ref={pimp => this._pimp = pimp}
                />
            </div>
        );
    }

    componentDidMount() {
        this._deleteDnd = this._setUpDragAndDrop();
    }

    _setUpDragAndDrop() {
        let drag = new DragAndDrop(this._pimp.getDom(), {
            ignoreNoDragAndDrop: true,
            onlyX: true,
            showAfterMount: {
                isset: true,
                sizeItem: {
                    x: sizePoint,
                    y: sizePoint,
                },
            },
            piece: {
                exist: true,
                min: {
                    x: this.props.min
                },
                max: {
                    x: this.props.max
                },
                step: {
                    x: this.props.changingValue
                },
                cur: {
                    x: this.props.cur
                },
                exitFromContour: true,
            },
            transferDate: this._changeValue.bind(this),
        });

        return drag.startDragAndDrop();
    }

    _changeValue(e) {
        this.props.changing(e);
    }

    componentWillUnmount() {
        this._deleteDnd();
    }
}