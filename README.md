# React Native Guide Mark
This React Native module is for guiding the first time user throughout the app.

![guide in action](https://lh3.googleusercontent.com/wJjof3378iGsU6EWio3MoYvcqTnANL3Cd-WT5n3ntb5TZA4rhduzGUb2O3aex479q_pMwX8uNAmj57YaBfucZz3XXcAqTyNOacAQNF7h4_0yVsrmfwZw_QyiQYcdDcgmGwCDaA2cNxM0WVkZv_v6LCW2s0zozgN3nhcLR5qE5cRP3DyjjhuPZgUD8y--aRl4reSqfED3CSiQ2Mn-BczTmlU62EDERCMCagoNmmfMth_25p3LsSk5oznd9KJZQb7SUdaTyx0IuZxvX7UD6Q0PMRRSRCcwKgUf8wvwW8h3-WhrzqwFWJnzW3dcapJp2W0RHiqwMpUNA_Xjld0v7bFBvTXryjkFkGWccsXBvazXO1EbEry9hv8VA4-GLkB8uQHfcp2myW2Pnfth_nX0635cX0M8CUXLIbmelPcm4XtnwLwhhc_ZG_nDIuDk4J8ucpq3v3eFHnr6w8J-3UxNdwob616dbT7iNizhB2-87rXTM8cXej8CfSUFjxjedteZwkMgxON3nzSlEkDP3I-7F_TAFT_6yg4Wz2IVkrCVIjqaxlAGNdSLAlpUgyonMpjQ5dxzSl3_M9k0whOcdDqE3nRGp8T3TnI4ERALRRZSvchvWPxywpcMAFw4ZzVkIH2RDV7IHFIUZXEaC54IvOmJMcwnPtksgBF2wwdNN7ZWMfL6JjhW0ZuZQfmi9CT5IM2JZUwycioVEhuvpt9bIhRSkkdLWouBqkV0OUQFJQp8idCTjqe4jBlAbj13gg=w356-h770-no)

## Installation
**yarn**: `yarn add react-native-guide-mark`,
**npm**: `npm install react-native-guide-mark`

## Example
1. import react-native-guide-mark:
```javascript
import {GuideMark} from  "react-native-guide-mark";
```
1. create a guide mark mask:
```javascript
const  App  = () =>{
	const [visible, setVisible] = React.useState(true)
	return(
		<GuideMark
		title  =  "Step 1"
		description  =  "This is the first step"
		visible  =  {visible}
		onButtonPress={()=>setVisible(false)}
		top={100}
		left={150}
		/>
	)
}
```
## Props
| Name | Type | Default | Description |
|-------|--------|----------|----------------------|
| `visible` | Boolean | false | **true**:show \| **false**:hide the mask|
| `title` | String | null | title of the mask|
|`titleTextStyle`|Object|```{fontSize: 34, fontWeight: "bold",color: 'white'} ```|Title text style|
| `description` | String | null | Description of mask|
|`descriptionStyle`|Object|```{fontSize: 14,color: 'white',fontWeight:"100"}```|Description text style|
| `buttonTitle` | String | null | Title of the button (Built in button will be enabled only if `onButtonPress` is set with function)|
|`onButtonPress` | Function | null | Event on button press|
| `onMarkPress` | Function | null | Event on press of marked spot|
|`left`|number \| String| 0 | Position from left of the screen, **Number:** 0 to maximum display width, **String:** percentage valuefrom 0% to 100% |
|`top`|Number \| String| 0 | Position from top of the screen, **Number:** 0 to maximum display height, **String:** percentage value from 0% to 100% |
|`markSize`|Number|150| size of mark |
|`markImage`|Require \| Object| require('mark.png')|PNG image with transparent at middle & semi transparent at the edges (matching to mask color), **Note:** Make sure the image matches with mask, otherwise, square patch will be visible around the mark. |
|`maskBgColor`|String|"rgba(0,0,0,0.75)"|Mask color. |
|`buttonElm`|React Component|null|Custom button component |
### Tips on using single guide mark
Here are the some cool tips how you can use it in better way to guide users
 - When user open your app first time, trigger `visible` prop with true with componentDidMount ,useEffect or may be by default by keeping state to `true`.
 - You can make use of `onButtonPress` action to navigate to next screen, do some action or may be set the state of this mark to `false` & next mark as `true`. You can make use of `onMarkPress` action to do similar stuff as well
 - Make use of `AsyncStorage` by setting some status in store not to open the mask next time or you may use custom api call to do the same.
#### Next up
- [ ] Provide ref to element
- [ ] Wizard
- [ ] Custom hook (if its worthy of doing!)