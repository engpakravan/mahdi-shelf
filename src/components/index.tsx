import React from "react";
import styled from "@emotion/styled"
import {FaSpinner , FaCarCrash} from "react-icons/fa"
import {keyframes} from "@emotion/react";
import styles from "./app.module.scss"

type variantTypes = "primary" | "secondary" | "accent" | "danger"
const variants = {
    primary : {
        background : "#3f51b5",
        color :"white" ,
    },
    secondary : {
        background : "#f1f2f7" ,
        color : "#434449"
    },
    accent : {
        background : "#f1f2f7" ,
        color : "#434449"
    },
    danger : {
        background : "#bc2222" ,
        color : "#f1f2f7"
    }
}

export const Button = styled.button({
    padding : "10px 20px 10px 20px" ,
    border : 0,
    lineHeight : 1,
    borderRadius : "3px",
    margin : 2 ,
    fontWeight : 400
} , ({variant} : {variant : variantTypes}) => variants[variant])

export const FormGroup = styled.div({
    display : "flex" ,
    flexDirection : "column"
})

export const Input = styled.input({
    borderRadius : "3px" ,
    marginBottom : "10px" ,
    backgroundColor : "#f1f2f7" ,
    padding : "8px 12px",
    border : "1px solid rgb(241,242,244)"
});

const spin = keyframes({
    "0%" : {transform : "rotate(0deg)"},
    "100%" : {transform : "rotate(360deg)"}
})
export const Spinner = styled(FaSpinner)({
    animation : `${spin} 1s infinite`
})

export const FullPageSpinner : React.FC = () => <div className={styles.App} style={{fontSize : "4em"}}><Spinner /></div>;
export const FullPageError : React.FC<{ error: string }> = (props) => {
    return (
        <div className={`${styles.App} text-danger`}>
            <h1><FaCarCrash/></h1>
            <h6>Something Wrong !</h6>
            <p>{props.error}</p>
            <Button variant={"danger"} onClick={() => window.location.reload()}>Refresh</Button>
        </div>
    )
}

export function FullPageErrorFallback({error} : {error :  Error}) {
    return (
        <div
            role="alert"
            css={{
                color: 'red',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <p>Uh oh... There's a problem. Try refreshing the app.</p>
            <pre>{error.message}</pre>
        </div>
    )
}
