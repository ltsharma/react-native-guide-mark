
  

# react-native-guide-mark

This React Native module is for guiding the first time user throughout the app
  
## Installation
**Yarn**: `yarn add   react-native-guide-mark`
**NPM**: `npm install react-native-guide-mark`

## Example
1. import react-native-guide-mark:
```javascript 
import {GuideMark} from  "react-native-guide-mark";
```

2. create a guide mark mask:
```javascript
const App = () =>{
	const [visible, setVisible] = React.useState(true)
	return(
		 <GuideMark 
	        title = "Step 1"
	        description = "This is the first step"
	        visible = {visible}
	        onButtonPress={()=>setVisible(false)}
	        top={100}
	        left={150}
	      />
	)
}

```
## Props
  
|  Name |  Type  | Default  |     Description  |
|-------|--------|----------|----------------------|
| `visible` | Boolean | false | **true**:show \| **false**:hide the mask|
| `title` | String | null | title of the mask|
|`titleTextStyle`|Object|*{fontSize: 34, fontWeight: "bold",color: 'white'}*|Title text style|
| `description` | String | null | Description of mask|
|`descriptionStyle`|Object|*{fontSize: 14,color: 'white',fontWeight:"100"}*|Description text style|
| `buttonTitle` | String | null | Title of the button (Built in button will be enabled only if `onButtonPress` is set with function)|
|`onButtonPress` | Function | null | Event on button press|
| `onMarkPress` | Function | null | Event on press of marked spot|
|`left`|number \| String| 0 | Position from left of the screen, **Number:** 0 to maximum display width, **String:** percentage valuefrom 0% to 100% |
|`top`|Number \| String| 0 | Position from top of the screen, **Number:** 0 to maximum display height, **String:** percentage value from 0% to 100% |
|`markSize`|Number|150| size of mark |
|`markImage`|Require \| Object| require('mark.png')|PNG image with transparent at middle & semi transparent at the edges (matching to mask color), **Note:** Make sure the image matches with mask, otherwise, square patch will be visible around the mark. |
|`maskBgColor`|String|"rgba(0,0,0,0.75)"|Mask color. |
|`buttonElm`|React Component|null|Custom button component |

***Author:*** lakshmeesha T