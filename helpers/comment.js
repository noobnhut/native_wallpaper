import { Dimensions } from "react-native";

const {width:deviceWidth,height:deviceHight}=Dimensions.get('window'

)
export const wd = parcentage =>{
    const width = deviceWidth
    return (parcentage*width)/100
}

export const hp = parcentage =>{
    const height = deviceHight
    return (parcentage*height)/100
}