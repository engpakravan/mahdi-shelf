import React from 'react';
import LogoSvg from "./assets/svg/logo";
import {Modal, ModalContents, ModalContext, ModalOpenButton} from "./components/shared/modal";
import {Button , FormGroup , Input , Spinner } from "./components"
import styles from "./app.module.scss"
import {User} from "./constants/global";
import {useAsync} from "./libs/hooks";
import {restHandler} from "./libs/rest";
import {login, register} from "./libs/auth";


const LoginForm: React.FC<{onSubmit : (payload : User) => Promise<any>}> = ({onSubmit}) => {
    const [, setIsOpen] = React.useContext(ModalContext);
    const {data , isLoading , run} = useAsync()

    const handleSubmit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        const [username, password] = e.target.elements as Array<HTMLInputElement>;
        run(onSubmit({
            username : username.value,
            password : password.value
        }))
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
                <Button disabled={isLoading} type={"submit"} variant={"primary"}>{isLoading ? <Spinner/> : "Login"}</Button>
            </form>
        </>
    )
}

const RegisterForm: React.FC<{onSubmit : (payload : User) => Promise<any>}> = ({onSubmit}) => {
    const [, setIsOpen] = React.useContext(ModalContext);
    const {data , isLoading , run} = useAsync()

    const handleSubmit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        const [email , username, password] = e.target.elements as Array<HTMLInputElement>;
        // setIsOpen(false)
        run(onSubmit({
            username : username.value,
            password : password.value
        }))
    }

    return (
        <>
            <h2 className="text-center mt-3">Register</h2>
            <form onSubmit={handleSubmit} className={"d-flex flex-column mx-4 p-2"}>
                <FormGroup>
                    <label>Username : </label>
                    <Input type="text" name={"email"}/>
                </FormGroup>
                <FormGroup>
                    <label>Password : </label>
                    <Input type="password" name={"email"}/>
                </FormGroup>
                <Button disabled={isLoading} type={"submit"} variant={"primary"}>{isLoading ? <Spinner/> : "Register"}</Button>
            </form>
        </>
    )
}

function App() {

    const onSubmitLogin = (payload: User) => login(payload);
    const onSubmitRegister = (payload: User) => register(payload)

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
