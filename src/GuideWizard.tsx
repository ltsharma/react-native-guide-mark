import React, { useState, useEffect } from 'react';
import { WizProps } from './types';

const GuideWizard = ({
    children,
    visible,
    onButtonPress = (): number => 0,
    onFinish = (): boolean => false,
}: WizProps): React.ReactElement => {
    const elements = React.Children.toArray(children);
    const elementLength = elements.length;
    const [visibleIndex, setvisibleIndex] = useState(0);
    const _onButtonPress = (): void => {
        const nextIndex = visibleIndex + 1;
        if (nextIndex < elementLength) {
            setvisibleIndex(nextIndex);
            onButtonPress(nextIndex);
        } else {
            setvisibleIndex(0);
            onFinish(true);
        }
    };

    const { props = { pontRef: null } } = elements[visibleIndex];

    return (
        <React.Fragment>
            {React.cloneElement(elements[0], {
                ...props,
                pointRef: props?.pointRef,
                visible,
                index: visibleIndex,
                onButtonPress: () => _onButtonPress(),
            })}
        </React.Fragment>
    );
};

export default GuideWizard;
