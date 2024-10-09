import { memo, useState } from 'react';
import Modal from '@/widgets/Modal/Modal';
import cls from './ModalAddEmployer.module.scss';
import { companyActions } from '@/store/companies';
import { useTypedDispatch } from '@/hooks/useTypedHooks';

interface ModalAddEmployerProps {
    isModalOpen: boolean;
    closeModal: () => void;
}

export const ModalAddEmployer = memo((props: ModalAddEmployerProps) => {
    const { isModalOpen, closeModal } = props;
    const dispatch = useTypedDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profile, setProfile] = useState('');

    const handleClick = () => {
        dispatch(companyActions.addEmployer({
            id: Date.now().toString(),
            firstName,
            lastName,
            position: profile,
        }));
        closeModal();
        setFirstName('');
        setLastName('');
        setProfile('');
    };

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className={cls.modalContentWrapper}>
                <h2>Добавить Работника</h2>
                <form className={cls.form} onSubmit={handleClick}>
                    <label className={cls.label} htmlFor="firstName">
                        Имя
                        <input
                            required
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    <label className={cls.label} htmlFor="lastName">
                        Фамилия
                        <input
                            required
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    <label className={cls.label} htmlFor="profile">
                        Должность
                        <input
                            required
                            type="text"
                            id="profile"
                            value={profile}
                            onChange={(e) => setProfile(e.target.value)}
                        />
                    </label>
                    <button
                        className={cls.button}
                        type="submit"
                    >
                        Добавить!
                    </button>
                </form>
            </div>
        </Modal>
    );
});
