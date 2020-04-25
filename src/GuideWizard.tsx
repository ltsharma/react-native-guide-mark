import React, { useState, useEffect } from 'react';
import { WizProps } from './types';

const GuideWizard = ({ children, visible, onButtonPress = (): number => 0 }: WizProps): React.ReactElement => {
    const elements = React.Children.toArray(children);
    const elementLength = elements.length;

    const initialState = Array(elementLength).fill(false);
    const [visibleArr, setvisibleArr] = useState(initialState);

    const updateVisibleIndex = (index: number): void => {
        const newArr = initialState;
        newArr[index] = true;
        setvisibleArr(newArr);
    };

    useEffect(() => {
        if (visible) {
            updateVisibleIndex(0);
        }
    }, [visible]);

    const _onButtonPress = (index: number): void => {
        if (index + 1 < elementLength) {
            onButtonPress(index + 1);
            updateVisibleIndex(index + 1);
        } else {
            setvisibleArr(initialState);
        }
    };

    return (
        <React.Fragment>
            {elements.map((child, index) => {
                return React.cloneElement(child, {
                    key: `wizard-child-${index}`,
                    visible: visibleArr[index],
                    onButtonPress: () => _onButtonPress(index),
                });
            })}
        </React.Fragment>
    );
};

export default GuideWizard;
