import React,{useState,useEffect} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    TouchableWithoutFeedback,
    Modal
} from 'react-native';
import RcButtonBright from './RcButtonBright';
import PropTypes from "prop-types";
const { width:WIDTH, height:HEIGHT } = Dimensions.get('screen');

const MARK_DIMENSION = 150;
const MARK_IMAGE = require('../assets/coach-mark.png');
const MASK_BG = "rgba(0,0,0,0.75)";


const GuideMark =(
    {
        title = null,
        titleTextStyle = null,
        descriptionStyle = null,
        description = null,
        onButtonPress = null,
        onMarkPress = null,
        buttonTitle = null,
        visible = false,
        left = 0,
        top = 0,
        markSize = 0,
        markImage = MARK_IMAGE,
        maskBgColor=MASK_BG,
        buttonElm=null,
        pointRef=null
    }
) =>{
    const [refElmDimention, setrefElmDimention] = useState({})
    const [_top, _settop] = useState(top)
    const [_left, _setleft] = useState(left)
    const [_markSize, _setmarkSize] = useState(markSize||MARK_DIMENSION);
    const [_maskBgColor, _setmaskBgColor] = useState("rgba(255,255,255,0)");
    const [contentHeight,setcontentHeight] = useState(100);
    
    React.useLayoutEffect(() => {
        if(pointRef && pointRef.hasOwnProperty("current")){
                pointRef.current.measureInWindow((fx, fy, width, height, px, py) => {
                    if(refElmDimention?.fx!==fx && refElmDimention?.fy!==fy){
                        setrefElmDimention({fx, fy, width, height, px, py});
                    }
                    if(markSize===0){
                        let ltop = fy-((width/2)-15)
                        if(_left!==fx || _top!==ltop){
                            _setmarkSize( Math.max(width,height));
                            _settop(ltop);
                            _setleft(fx); 
                        }
                    }else{
                        if(_left!==fx-25 || _top!==fy-60){
                            _settop(fy-60);
                            _setleft(fx-25);    
                        }
                    
                    }
                })
            }
        }
    )

    const onLoad = () =>{
        _setmaskBgColor(maskBgColor);
    }

    const trainingOnLayout = ({nativeEvent: { layout: {x, y, width, height}}} ) =>{
        setcontentHeight(height);
        console.log({contentHeight:height})
    }

    //Percent calculation
    const nLeft = typeof _left === "string"?(( (WIDTH - _markSize) * (parseFloat(_left)/100))):_left;
    const nTop = typeof _top === "string"?((HEIGHT - _markSize) * (parseFloat(_top)/100)):_top;

    //Content arrangement
    let xy = [nTop,nLeft];
    let contentToLeftEnd = xy[1] < (WIDTH/5) && _markSize<( (WIDTH*2)/3);
    let contentToCenter = (xy[1] < ((WIDTH*4/5)-_markSize)) && !contentToLeftEnd;
    let contentOnTop =  (HEIGHT - (_markSize + xy[0]))>contentHeight;
    let trainingContainerArranged = {
        top: contentOnTop? xy[0] + _markSize : (xy[0] - contentHeight),
        alignItems:contentToCenter?'center':contentToLeftEnd?"flex-start":"flex-end",
        left: contentToCenter?
            (WIDTH-300)/2: !contentToLeftEnd?
                WIDTH-315 : 15
    };
    //MaskStyle
    let topMask = {
        flex: 0,
        width:WIDTH,
        height:xy[0],
        backgroundColor:_maskBgColor
    };
    let leftMask = {
        flex: 0,
        width:xy[1],
        height:_markSize,
        backgroundColor:_maskBgColor
    };
    let markImageStyle ={
        width:_markSize,
        height:_markSize
    };
    let rightMask ={
        flex: 0,
        width:WIDTH-_markSize-xy[1],
        height:_markSize,
        backgroundColor:_maskBgColor
    };
    let bottomMask = {
        flex: 0,
        width:WIDTH,
        height:HEIGHT-_markSize-xy[0],
        backgroundColor:_maskBgColor
    };

    return (
        <Modal
            visible={visible}
            deviceHeight={HEIGHT}
            deviceWidth={WIDTH}
            hasBackdrop={false}
            coverScreen={true}
            transparent={true}
            animationType="fade"
            hardwareAccelerated={true}
            statusBarTranslucent={true}
            style={styles.modalStyle} >

            <View style={styles.coachContainer} >
                <View style={topMask} />
                <View style={styles.markRow} >
                    <View style={leftMask} />
                    <TouchableWithoutFeedback onPress={onMarkPress}>
                        <Image  onLoad={onLoad} source={markImage} style={markImageStyle} />
                    </TouchableWithoutFeedback>
                    <View style={rightMask} />
                </View>
                <View style={bottomMask} />
            </View>

            <View style={[ styles.trainingContainer, trainingContainerArranged ]} onLayout={trainingOnLayout}>

                {   title &&
                    <Text style={[styles.trainingTitle,titleTextStyle]}>
                        {title}
                    </Text>
                }
                {
                    description &&
                    <Text style={[styles.trainingDesc,{textAlign: contentToCenter ? 'center' : contentToLeftEnd ? "left" : "right"},descriptionStyle]}>
                        {description}
                    </Text>
                }
                {
                   buttonElm?buttonElm: onButtonPress &&
                    <RcButtonBright
                        title={ buttonTitle||"GOT IT"}
                        style={{marginTop: 20}}
                        onPress={onButtonPress}
                    />
                }
            </View>

        </Modal>
    )

}

GuideMark.defaultProps = {
    title :null,
    description :null,
    buttonTitle :null,
    onButtonPress :null,
    onMarkPress :null,
    visible :false,
    left :0,
    top :0
}

GuideMark.prototype = {
    title: PropTypes.string,
    description: PropTypes.string,
    buttonTitle: PropTypes.string,
    onButtonPress : PropTypes.func,
    onMarkPress : PropTypes.func,
    visible : PropTypes.bool.isRequired,
    markSize : PropTypes.number,
    markImage : PropTypes.object,
    left : PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,
    top : PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired
}

export default GuideMark;

const styles = StyleSheet.create({
    modalStyle:{
        margin:0,
        padding:0,
        position:'relative'
    },
    coachContainer:{
        flex: 1,
        position:'relative'
    },
    markRow:{
        flex:0,
        flexDirection:"row"
    },
    trainingContainer:{
        position:'absolute',
        justifyContent:'center',
        width:300,
    },
    trainingTitle:{
        fontSize: 34,
        fontWeight: "bold",
        color: 'white',
    },
    trainingDesc:{
        fontSize:16,
        color: 'white',
        fontWeight:"300",
    }
})