import { classNames } from '@/shared/classNames/classNames';
import cls from './ModalCompany.module.scss';
import { Dispatch, SetStateAction, memo, useState } from 'react';
import Modal from '@/widgets/Modal/Modal';
import { useTypedDispatch, useTypedSelector } from '@/hooks/useTypedHooks';
import { companyActions } from '@/store/companies';
import { CompanyActionCreator } from '@/store/companies/action-creators';

interface ModalCompanyProps {
    isModalOpen: boolean,
    handleModalOpen: () => void,
    setIsModalOpen: Dispatch<SetStateAction<boolean>>,
}

export const ModalCompany = memo((props: ModalCompanyProps) => {
    const {
        isModalOpen,
        handleModalOpen,
        setIsModalOpen
    } = props;
    const dispatch = useTypedDispatch();
    const data = useTypedSelector(CompanyActionCreator.getCompany);

    
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');

    const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsModalOpen(false);
        dispatch(companyActions.addCompany({
            id: String(Symbol(data.length)),
            name: companyName,
            address,
            employees: [],
        }));
        setCompanyName('');
        setAddress('');
    };


    return (
        <div className={classNames(cls.ModalCompany, {}, [])}>
             <Modal isOpen={isModalOpen} onClose={handleModalOpen}>
                    <div className={cls.wrapper}>
                        <h2>Добавить Компанию</h2>
                        <form className={cls.form} onSubmit={(e) => handleClick(e)}>
                            <label className={cls.label} htmlFor="companyName">
                                Название компании
                                <input
                                    required
                                    type="text"
                                    id="companyName"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                            </label>
                            <label className={cls.label} htmlFor="profile">
                                Адрес
                                <input
                                    required
                                    type="text"
                                    id="profile"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </label>
                            <button
                                className={cls.button}
                                type="submit"
                            >
                                Добавить
                            </button>
                        </form>
                    </div>
                </Modal>
        </div>
    );
});