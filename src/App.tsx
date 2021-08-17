import React from 'react';
import LogoSvg from "./assets/svg/logo";
import {Modal, ModalContents, ModalContext, ModalOpenButton} from "./components/shared/modal";
import {Button , FormGroup , Input} from "./components/libs"
import styles from "./app.module.scss"


const LoginForm: React.FC<{onSubmit : (payload : {username : string , password : string}) => void}> = ({onSubmit}) => {
    const [, setIsOpen] = React.useContext(ModalContext);

    const handleSubmit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        const [username, password] = e.target.elements as Array<HTMLInputElement>;
        setIsOpen(false)
        onSubmit({
            username : username.value,
            password : password.value
        })
    }

    return (
        <>
            <h2 className="text-center mt-3">Login</h2>
            <form onSubmit={handleSubmit} className={"d-flex flex-column mx-4 p-2"}>
                <FormGroup>
                    <label>Username : </label>
                    <Input type="text" name={"username"}/>
                </FormGroup>
                <FormGroup>
                    <label>Password : </label>
                    <Input type="password" name={"password"}/>
                </FormGroup>
                <Button type={"submit"} variant={"primary"}>Submit</Button>
            </form>
        </>
    )
}

const RegisterForm: React.FC<{onSubmit : (payload : {username : string , password : string , email : string}) => void}> = ({onSubmit}) => {
    const [, setIsOpen] = React.useContext(ModalContext);

    const handleSubmit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        const [email , username, password] = e.target.elements as Array<HTMLInputElement>;
        setIsOpen(false)
        onSubmit({
            email : email.value,
            username : username.value,
            password : password.value
        })
    }

    return (
        <>
            <h2 className="text-center mt-3">Register</h2>
            <form onSubmit={handleSubmit} className={"d-flex flex-column mx-4 p-2"}>
                <FormGroup>
                    <label>Email : </label>
                    <Input type="email" name={"email"}/>
                </FormGroup>
                <FormGroup>
                    <label>Username : </label>
                    <Input type="text" name={"email"}/>
                </FormGroup>
                <FormGroup>
                    <label>Password : </label>
                    <Input type="password" name={"email"}/>
                </FormGroup>
                <Button variant={"primary"}>Register</Button>
            </form>
        </>
    )
}

function App() {

    const onSubmitLogin = (payload: { username: string, password: string }) => {
        console.log(payload)
    }

    const onSubmitRegister = (payload: { email : string , username: string, password: string }) => {
        console.log(payload)
    }

    return (
        <div className={styles.App}>
            <LogoSvg width={"80"} height={"80"}/>
            <h1>Bookshelf</h1>
            <div className={"d-flex justify-content-between p-2"}>
                <Modal>
                    <ModalOpenButton>
                        <Button variant={"primary"}>Login</Button>
                    </ModalOpenButton>
                    <ModalContents>
                        <LoginForm onSubmit={onSubmitLogin}/>
                    </ModalContents>
                </Modal>
                <Modal>
                    <ModalOpenButton>
                        <Button variant={"secondary"}>Register</Button>
                    </ModalOpenButton>
                    <ModalContents>
                        <RegisterForm onSubmit={onSubmitRegister}/>
                    </ModalContents>
                </Modal>
            </div>
        </div>
    );
}

export default App;
