import { SyntheticEvent } from "react";

type InputProps = {
    className?: string,
    placeholder?: string,
    onChange?: (e: SyntheticEvent) => void;
    value?: string;
    onKeyPress?: (e: SyntheticEvent) => void;
}
export function Input(props: InputProps){

    return <input onKeyPress = {props.onKeyPress} className = {props.className} placeholder= {props.placeholder} onChange = {props.onChange} value = {props.value}/>
}