import styled from "@emotion/styled"

type variantTypes = "primary" | "secondary" | "accent"
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
