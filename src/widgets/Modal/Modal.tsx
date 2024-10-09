import React from 'react';
import ReactDOM from 'react-dom';
import cls from './Modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    const modalRoot = document.getElementById('root') as HTMLElement;

    const handleCloseModal = () => {
        onClose();
    };

    return ReactDOM.createPortal(
        <div>
            <div onClick={handleCloseModal} className={cls.modal} />
            <div className={cls.modalContent}>
                {children}
            </div>
        </div>,
        modalRoot,
    );
};

export default Modal;
