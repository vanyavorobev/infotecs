import React from "react";
import Portal, { createContainer } from './../../shared/Portal.jsx';
import './Modal.css'; 

const MODAL_CONTAINER_ID = 'modal-container-id';

const Modal = (props) => {
    const { onClose, children, title } = props;
    const handleClose = React.useCallback(() => { onClose?.(); }, [onClose])

    const rootRef = React.useRef(null);
    const [ isMounted, setMounted ] = React.useState(false);

    React.useEffect(() => {
        createContainer({ id: MODAL_CONTAINER_ID });
        setMounted(true);
    }, [])

    React.useEffect(() => {
        const handleWrapperClick = (event) => {
            const { target } = event;

            if(target instanceof Node && rootRef.current === target) {
                onClose?.();
            }
        }
        const handleEscapePress = (event) => {
            if(event.key === "Escape") {
                onClose?.();
            }
        }

        window.addEventListener('click', handleWrapperClick);
        window.addEventListener('keydown', handleEscapePress);

        return () => {
            window.removeEventListener('click', handleWrapperClick);
            window.removeEventListener('keydown', handleEscapePress);
        }
    }, [onClose]);

    return (
        isMounted
            ?(
                <Portal id={MODAL_CONTAINER_ID}>
                    <div className={"wrapper"} ref={rootRef}>
                        <div className={"content"}>
                            <button
                                className={"closeButton"}
                                type="button"
                                onClick={handleClose}
                            >
                                <b>X</b>
                            </button>
                            <p className={"title"}>{title}</p>
                            {children}
                        </div>
                    </div>
                </Portal>
            ) 
            : null
    )
}

export default Modal;