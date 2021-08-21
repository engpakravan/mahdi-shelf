import React from 'react';
import LogoSvg from "../assets/svg/logo";
import {Modal, ModalContents, ModalContext, ModalOpenButton} from "./shared/modal";
import {Button , FormGroup , Input , Spinner } from "./index"
import styles from "./app.module.scss"
import {User} from "../constants/global";
import {useAsync} from "../libs/hooks";
import {auth} from "../libs/auth";
import {useAuth} from "../context/auth";


const LoginForm: React.FC<{onSubmit : typeof auth.login}> = ({onSubmit}) => {
    const [, setIsOpen] = React.useContext(ModalContext);
    const {data , isLoading , run , isError , error} = useAsync()

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

const RegisterForm: React.FC<{onSubmit : typeof auth.register}> = ({onSubmit}) => {
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

function UnauthenticatedApp() {

    const {register , login} = useAuth();

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
                        <LoginForm onSubmit={login}/>
                    </ModalContents>
                </Modal>
                <Modal>
                    <ModalOpenButton>
                        <Button variant={"secondary"}>Register</Button>
                    </ModalOpenButton>
                    <ModalContents>
                        <RegisterForm onSubmit={register}/>
                    </ModalContents>
                </Modal>
            </div>
        </div>
    );
}

export default UnauthenticatedApp;
