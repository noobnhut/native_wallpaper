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

export const getColumnCount = ()=>{
    if(deviceWidth>=2024)
    {
        //desktop
        return 4
    }
    else if(deviceWidth>=768)
    {
        //tablet
        return 3
    }
    else
    {
        return 2
    }
}

export const getImageSize=(height,width)=>{
    if(width>height)
    {
        return 250
    }
    else if(width,height)
    {
        return 300
    }else
    {
        return 200
    }
}