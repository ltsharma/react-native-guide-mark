type NullOString = string | null;
type NullOObject = object | null;
type NullOVoid = void | null;
type PercentONumber = string | number;
type ViewRefONull = React.RefObject<View> | null;

export interface Props {
    title: NullOString;
    titleTextStyle: NullOObject;
    description: NullOString;
    descriptionStyle: NullOObject;
    onButtonPress: NullOVoid;
    onMarkPress: NullOVoid;
    buttonTitle: NullOString;
    visible: boolean;
    left: PercentONumber;
    top: PercentONumber;
    markSize: number;
    markImage: any;
    maskBgColor: string;
    buttonElm: React.ReactElement;
    pointRef: ViewRefONull;
}

export interface LayoutHeight {
    nativeEvent: {
        layout: {
            height: number;
        };
    };
}

export interface ContentStyle {
    top: PercentONumber;
    left: PercentONumber;
    alignItems: string;
}
export interface MaskStyle {
    flex: number;
    width: number;
    height: number;
    backgroundColor: string;
}

//Wizard Interfaces
export interface WizProps {
    children: React.ReactChildren;
    visible: boolean;
    onButtonPress: any;
}

//Button Interface
export interface ButtonProps {
    style: object;
    title: string;
    textStyle?: object;
    onPress: any;
}
