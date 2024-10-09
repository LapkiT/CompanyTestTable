import { useTypedDispatch, useTypedSelector } from '@/hooks/useTypedHooks';
import { classNames } from '@/shared/classNames/classNames';
import { companyActions } from '@/store/companies';
import { CompanyActionCreator } from '@/store/companies/action-creators';
import { memo, useState } from 'react';
import { ModalAddEmployer } from '../ModalAddEmployer/ModalAddEmployer';
import cls from './StartPageEmployeesHeader.module.scss';

interface StartPageEmployees_HeaderProps {
	className?: string;
	employsCheckAll: boolean;
	setEmploysCheckAll: (value: boolean) => void;
}

export const StartPageEmployeesHeader = (props: StartPageEmployees_HeaderProps) => {
	const { className, employsCheckAll, setEmploysCheckAll } = props;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const activeCompany = useTypedSelector(CompanyActionCreator.getActiveCompany);
	const dispatch = useTypedDispatch();

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleDeleteChosenEmployers = () => {
		dispatch(companyActions.deleteChosenEmployers(employsCheckAll));
	};

	return (
		<div className={classNames(cls.StartPageEmployeesHeader, {}, [className])}>
			{activeCompany && (
				<>
					<div className={cls.allWorkers}>
						<input
							checked={employsCheckAll}
							onChange={() => setEmploysCheckAll(!employsCheckAll)}
							type="checkbox"
							name="AllEmployers"
							id="AllEmployers"
						/>
						<p>Выбрать всех работников</p>
					</div>
					<button onClick={openModal} type="button">
						Добавить работника
					</button>
					<ModalAddEmployer closeModal={closeModal} isModalOpen={isModalOpen} />
					<button onClick={handleDeleteChosenEmployers} type="button">
						Удалить выделеных работников
					</button>
				</>
			)}
		</div>
	);
};
