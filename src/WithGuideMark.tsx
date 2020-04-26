import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import GuideWizard from './GuideWizard';
import GuideMark from './GuideMark';

const WithGuideMark = (WGMComponent) => () => {
    const [wiz, setwiz] = useState(null);
    const [visible, setVisible] = useState(false);
    const [finished, setFinished] = useState(false);
    const [onButtonPress, setonButtonPress] = useState(null);
    const getWizard = (wizarr, visible) => {
        setwiz(wizarr);
        setVisible(visible);
    };
    useEffect(() => {
        if (visible) {
            setFinished(false);
        }
    }, [visible]);
    return (
        <>
            {wiz && (
                <GuideWizard visible={visible} onButtonPress={(i) => setonButtonPress(i)} onFinish={setFinished}>
                    {wiz.map((wizElm, index) => (
                        <GuideMark key={`GMI-${index}`} {...wizElm} />
                    ))}
                </GuideWizard>
            )}
            <WGMComponent guideWizard={getWizard} guideIndex={onButtonPress} finished={finished} />
        </>
    );
};

export default WithGuideMark;
