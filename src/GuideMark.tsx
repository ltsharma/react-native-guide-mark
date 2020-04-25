/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableWithoutFeedback, Modal } from 'react-native';
import GuideButton from './GuideButton';
import { Props, LayoutHeight, ContentStyle, MaskStyle } from './types';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');

const MARK_DIMENSION = 150;
const MARK_IMAGE = require('../assets/coach-mark.png');
const MASK_BG = 'rgba(0,0,0,0.75)';

const defaultProps = {
    title: null,
    description: null,
    buttonTitle: null,
    onButtonPress: null,
    onMarkPress: null,
    visible: false,
    left: 0,
    top: 0,
};

const styles = StyleSheet.create({
    modalStyle: {
        margin: 0,
        padding: 0,
        position: 'relative',
    },
    coachContainer: {
        flex: 1,
        position: 'relative',
    },
    markRow: {
        flex: 0,
        flexDirection: 'row',
    },
    trainingContainer: {
        position: 'absolute',
        justifyContent: 'center',
        width: 300,
    },
    trainingTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        color: 'white',
    },
    trainingDesc: {
        fontSize: 16,
        color: 'white',
        fontWeight: '300',
    },
});

function GuideMark({
    title = null,
    titleTextStyle,
    descriptionStyle,
    description,
    onButtonPress,
    onMarkPress,
    buttonTitle,
    visible = false,
    left = '50%',
    top = '50%',
    markSize = 0,
    markImage = MARK_IMAGE,
    maskBgColor = MASK_BG,
    buttonElm = null,
    pointRef = null,
}: Props): React.ReactNode {
    const [refElmDimention, setrefElmDimention] = useState({ fx: 0, fy: 0, width: 0, height: 0, px: 0, py: 0 });
    const [_top, _settop] = useState(top);
    const [_left, _setleft] = useState(left);
    const [_markSize, _setmarkSize] = useState(markSize || MARK_DIMENSION);
    const [_maskBgColor, _setmaskBgColor] = useState('rgba(255,255,255,0)');
    const [contentHeight, setcontentHeight] = useState(100);

    React.useLayoutEffect((): void => {
        pointRef?.current?.measureInWindow((fx = 0, fy = 0, width = 0, height = 0, px = 0, py = 0) => {
            if (refElmDimention?.fx !== fx && refElmDimention?.fy !== fy) {
                setrefElmDimention({ fx, fy, width, height, px, py });
            }

            if (width == 0 || height == 0) {
                console.warn(
                    'Make sure View element which have ref has props collapsable={false}. Android measurement will not work without this.',
                );
            }
            if (markSize === 0) {
                const ltop = height >= width ? fy : fy - (width / 2 - 15);
                if (_left !== fx || _top !== ltop) {
                    _setmarkSize(Math.max(width, height, MARK_DIMENSION));
                    _settop(ltop);
                    _setleft(fx);
                }
            } else {
                if (_left !== fx - 25 || _top !== fy - 60) {
                    _settop(fy - 60);
                    _setleft(fx - 25);
                }
            }
        });
    });

    const onLoad = (): void => {
        _setmaskBgColor(maskBgColor);
    };

    const trainingOnLayout = ({
        nativeEvent: {
            layout: { height },
        },
    }: LayoutHeight): void => {
        setcontentHeight(height);
    };

    //Percent calculation
    const nLeft = typeof _left === 'string' ? (WIDTH - _markSize) * (parseFloat(_left) / 100) : _left;
    const nTop = typeof _top === 'string' ? (HEIGHT - _markSize) * (parseFloat(_top) / 100) : _top;

    //Content arrangement
    const xy = [nTop, nLeft];
    const contentToLeftEnd = xy[1] < WIDTH / 6 && xy[1] + _markSize < WIDTH / 2;
    const contentToRightEnd = xy[1] + _markSize > (WIDTH * 5) / 6 && xy[1] + 10 > WIDTH / 6 && !contentToLeftEnd;
    const contentToCenter = xy[1] < (WIDTH * 4) / 5 - _markSize && !contentToLeftEnd;
    const contentOnTop = HEIGHT - (_markSize + xy[0]) > contentHeight;

    const trainingContainerArranged: ContentStyle = {
        top: contentOnTop ? xy[0] + _markSize : xy[0] - contentHeight,
        alignItems: contentToRightEnd ? 'flex-end' : contentToLeftEnd ? 'flex-start' : 'center',
        left: contentToRightEnd ? WIDTH - 315 : contentToLeftEnd ? 15 : (WIDTH - 300) / 2,
    };
    //MaskStyle
    const topMask: MaskStyle = {
        flex: 0,
        width: WIDTH,
        height: xy[0],
        backgroundColor: _maskBgColor,
    };
    const leftMask: MaskStyle = {
        flex: 0,
        width: xy[1],
        height: _markSize,
        backgroundColor: _maskBgColor,
    };
    const markImageStyle: MaskStyle = {
        flex: 1,
        width: _markSize,
        height: _markSize,
        backgroundColor: 'transparent',
    };
    const rightMask: MaskStyle = {
        flex: 0,
        width: WIDTH - _markSize - xy[1],
        height: _markSize,
        backgroundColor: _maskBgColor,
    };

    const bottomMask: MaskStyle = {
        flex: 0,
        width: WIDTH,
        height: HEIGHT - _markSize - xy[0],
        backgroundColor: _maskBgColor,
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType={'fade'}
            hardwareAccelerated={true}
            statusBarTranslucent={true}
            style={styles.modalStyle}
        >
            <View style={styles.coachContainer}>
                <View style={topMask} />
                <View style={styles.markRow}>
                    <View style={leftMask} />
                    <TouchableWithoutFeedback onPress={onMarkPress}>
                        <Image onLoad={onLoad} source={markImage} style={markImageStyle} />
                    </TouchableWithoutFeedback>
                    <View style={rightMask} />
                </View>
                <View style={bottomMask} />
            </View>

            <View style={[styles.trainingContainer, trainingContainerArranged]} onLayout={trainingOnLayout}>
                {title && <Text style={[styles.trainingTitle, titleTextStyle]}>{title}</Text>}
                {description && (
                    <Text
                        style={[
                            styles.trainingDesc,
                            { textAlign: contentToCenter ? 'center' : contentToLeftEnd ? 'left' : 'right' },
                            descriptionStyle,
                        ]}
                    >
                        {description}
                    </Text>
                )}
                {buttonElm
                    ? buttonElm
                    : onButtonPress && (
                          <GuideButton
                              title={buttonTitle || 'GOT IT'}
                              style={{ marginTop: 20 }}
                              onPress={onButtonPress}
                          />
                      )}
            </View>
        </Modal>
    );
}

GuideMark.defaultProps = defaultProps;

// GuideMark.prototype = propTypes;

export default GuideMark;
