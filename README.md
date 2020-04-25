# React Native Guide Mark

This React Native module is for guiding the first time user throughout the app.

![guide mark in action](https://i.imgur.com/Gwh5mi5.gif)

## Installation

**yarn**: `yarn add react-native-guide-mark`,
**npm**: `npm install react-native-guide-mark`

## Example

1. import react-native-guide-mark:

```javascript
import { GuideMark } from 'react-native-guide-mark';
```

1. create a guide mark mask:

```javascript
export const App = () => {
    const [visible, setVisible] = React.useState(true);
    return (
        <GuideMark
            title="Step 1"
            description="This is the first step"
            visible={visible}
            onButtonPress={() => setVisible(false)}
            top={100}
            left={150}
        />
    );
};
```

### Using ref

```javascript
export const App = () => {
    const buttonRef = useRef(null); //1. creating ref for the pointing element
    const [visible, setvisible] = useState(false);

    return (
        <View>
            <GuideMark
                visible={visible}
                title="Click here"
                description="To see a magic!"
                buttonTitle={'Show me!'}
                onButtonPress={() => {
                    setvisible(false);
                    setvisible2(true);
                    setshowImage(true);
                }}
                pointRef={buttonRef} //3. Passing ref of pointing element to guide mark
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ paddingHorizontal: 30 }} ref={buttonRef}>
                    {' '}
                    {/* 2. assign ref to required pointing element */}
                    <Button
                        title="Click Here"
                        onPress={() => {
                            setvisible(true);
                        }}
                    />
                </View>
            </View>
        </View>
    );
};
```

1. Create a ref with `userRef`.
2. assign that ref to required `View` element.
3. pass the ref to `pointRef` prop.

## Props

| Name               | Type              | Default                                             | Description                                                                                                                                                                                              |
| ------------------ | ----------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `visible`          | Boolean           | false                                               | **true**:show \| **false**:hide the mask                                                                                                                                                                 |
| `title`            | String            | null                                                | title of the mask                                                                                                                                                                                        |
| `titleTextStyle`   | Object            | `{fontSize: 34, fontWeight: "bold",color: 'white'}` | Title text style                                                                                                                                                                                         |
| `description`      | String            | null                                                | Description of mask                                                                                                                                                                                      |
| `descriptionStyle` | Object            | `{fontSize: 14,color: 'white',fontWeight:"100"}`    | Description text style                                                                                                                                                                                   |
| `buttonTitle`      | String            | null                                                | Title of the button (Built in button will be enabled only if `onButtonPress` is set with function)                                                                                                       |
| `onButtonPress`    | Function          | null                                                | Event on button press                                                                                                                                                                                    |
| `onMarkPress`      | Function          | null                                                | Event on press of marked spot                                                                                                                                                                            |
| `left`             | number \| String  | 0                                                   | Position from left of the screen, **Number:** 0 to maximum display width, **String:** percentage valuefrom 0% to 100%                                                                                    |
| `top`              | Number \| String  | 0                                                   | Position from top of the screen, **Number:** 0 to maximum display height, **String:** percentage value from 0% to 100%                                                                                   |
| `markSize`         | Number            | 150                                                 | size of mark                                                                                                                                                                                             |
| `markImage`        | Require \| Object | require('mark.png')                                 | PNG image with transparent at middle & semi transparent at the edges (matching to mask color), **Note:** Make sure the image matches with mask, otherwise, square patch will be visible around the mark. |
| `maskBgColor`      | String            | "rgba(0,0,0,0.75)"                                  | Mask color.                                                                                                                                                                                              |
| `buttonElm`        | React Component   | null                                                | Custom button component                                                                                                                                                                                  |
| `pointRef`         | Ref               | null                                                | To pont the mark on required View element, need to pass `ref` of the elemnt, mark will automatically calculates the measurements.                                                                        |

### Tips on using single guide mark

Here are the some cool tips how you can use it in better way to guide users

-   When user open your app first time, trigger `visible` prop with true with componentDidMount ,useEffect or may be by default by keeping state to `true`.
-   You can make use of `onButtonPress` action to navigate to next screen, do some action or may be set the state of this mark to `false` & next mark as `true`. You can make use of `onMarkPress` action to do similar stuff as well
-   Make use of `AsyncStorage` by setting some status in store not to open the mask next time or you may use custom api call to do the same.

#### Next up

-   [x] Provide ref to element
-   [ ] Wizard
-   [ ] Custom hook (if its worthy of doing!)
