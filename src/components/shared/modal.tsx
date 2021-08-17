import React from 'react';
import styles from './modal.module.scss'

export const ModalContext = React.createContext<[boolean , (newState : boolean) => void]>([false , () => {}]);

export const Modal : React.FC= (props) => {
    const [isOpen , setIsOpen] = React.useState(false);

    return <ModalContext.Provider value={[isOpen , setIsOpen]} {...props}/>
};

export const ModalOpenButton = ({children } : {children : JSX.Element}) => {
    const [,setIsOpen] = React.useContext(ModalContext);

    return React.cloneElement(children , {
        onClick : () => setIsOpen(true)
    })
};

export const ModalCloseButton = ({children } : {children : JSX.Element}) => {
    const [,setIsOpen] = React.useContext(ModalContext);

    return React.cloneElement(children , {
        onClick : () => setIsOpen(false)
    })
};

export const ModalContents : React.FC = (props) => {
    const [isOpen,setIsOpen] = React.useContext(ModalContext);

    return (
        <>
            {isOpen &&
                <div className={`${styles.ModalContainer}`} onClick={() => setIsOpen(false)}>
                    <div className={`${styles.ModalBody}`} onClick={(e) => e.stopPropagation()}>
                        <span aria-hidden onClick={() => setIsOpen(false)}>×</span>
                        {props.children}
                    </div>
                </div>
            }
        </>
    )
}
