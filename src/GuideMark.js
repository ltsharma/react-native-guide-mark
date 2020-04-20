import React,{PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import RcButtonBright from './RcButtonBright'
import Modal from 'react-native-modal';
// import PropTypes from "prop-types";
const { width:WIDTH, height:HEIGHT } = Dimensions.get('screen');

const MARK_DIMENSION = 150;
const MARK_IMAGE = require('../assets/coach-mark.png');
const MASK_BG = "rgba(0,0,0,0.75)";

class GuideMark extends PureComponent{
    render() {
        const {
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
            markSize = MARK_DIMENSION,
            markImage = MARK_IMAGE,
            maskBgColor=MASK_BG,
            buttonElm=null
        } = this.props;

        //Percent calculation
        let nLeft = typeof left === "string"?(( (WIDTH - markSize) * (parseFloat(left)/100))):left;
        let nTop = typeof top === "string"?((HEIGHT - markSize) * (parseFloat(top)/100)):top;

        //Content arrangement
        let xy = [nTop,nLeft];
        let contentToLeftEnd = xy[1] < (WIDTH*1/5);
        let contentToCenter = (xy[1] < ((WIDTH*4/5)-markSize)) && !contentToLeftEnd;
        let contentOnTop = xy[0]+markSize<HEIGHT-markSize;

        let trainingContainerArranged = {
            top:contentOnTop?xy[0] + markSize : (xy[0] - markSize) - 30,
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
            backgroundColor:maskBgColor
        };
        let leftMask = {
            flex: 0,
            width:xy[1],
            height:markSize,
            backgroundColor:maskBgColor
        };
        let markImageStyle ={
            width:markSize,
            height:markSize
        };
        let rightMask ={
            flex: 0,
            width:WIDTH-markSize-xy[1],
            height:markSize,
            backgroundColor:maskBgColor
        };
        let bottomMask = {
            flex: 0,
            width:WIDTH,
            height:HEIGHT-markSize-xy[0],
            backgroundColor:maskBgColor
        };

        return (
            <Modal
                isVisible={visible}
                deviceHeight={HEIGHT}
                deviceWidth={WIDTH}
                hasBackdrop={false}
                coverScreen={true}
                animationIn={"fadeIn"}
                animationOut={"fadeOut"}
                style={styles.modalStyle} >

                <View style={styles.coachContainer} >
                    <View style={topMask} />
                    <View style={styles.markRow} >
                        <View style={leftMask} />
                        <TouchableWithoutFeedback onPress={onMarkPress}>
                            <Image   source={markImage} style={markImageStyle} />
                        </TouchableWithoutFeedback>
                        <View style={rightMask} />
                    </View>
                    <View style={bottomMask} />
                </View>

                <View style={[ styles.trainingContainer, trainingContainerArranged ]} >

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
}

GuideMark.defaultProps = {
    title :null,
    description :null,
    buttonTitle :null,
    onButtonPress :null,
    onMarkPress :null,
    visible :false,
    left :0,
    top :0,
    markSize :MARK_DIMENSION,
    markImage :MARK_IMAGE
}

// GuideMark.prototype = {
//     onButtonPress : PropTypes.func,
//     onMarkPress : PropTypes.func,
//     visible : PropTypes.bool.isRequired,
//     markSize : PropTypes.number,
//     markImage : PropTypes.object,
//     left : PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,
//     top : PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired
// }

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
        fontSize: 16,
        color: 'white',
        fontWeight:"300",
    }
})