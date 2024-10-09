import { useTypedDispatch } from '@/hooks/useTypedHooks';
import { classNames } from '@/shared/classNames/classNames';
import { companyActions } from '@/store/companies';
import { Employees } from '@/store/companies/types';
import Modal from '@/widgets/Modal/Modal';
import { memo, useState } from 'react';
import cls from './ModalEmploeEdit.module.scss';

interface ModalCompanyEditProps {
	employer: Employees;
	isModalOpen: boolean;
	handleModalOpen?: () => void;
}

export const ModalCompanyEdit = memo((props: ModalCompanyEditProps) => {
	const { isModalOpen, handleModalOpen, employer } = props;
	const [firstName, setFirstName] = useState<string>(employer.firstName);
	const [lastName, setLastName] = useState<string>(employer.lastName);
	const [position, setPosition] = useState<string>(employer.position);
	const dispatch = useTypedDispatch();

	const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(companyActions.editEmployer({ id: employer.id, firstName, lastName, position }));
		handleModalOpen();
	};

	return (
		<div className={classNames(cls.ModalCompanyEdit, {}, [])}>
			<Modal isOpen={isModalOpen} onClose={handleModalOpen}>
				<div className={cls.wrapper}>
					<h2>Редактировать Работника - {employer.firstName}</h2>
					<form className={cls.form} onSubmit={(e) => handleClick(e)}>
						<label className={cls.label} htmlFor="companyName">
							Имя
							<input
								required
								id="companyName"
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</label>
						<label className={cls.label} htmlFor="profile">
							Фамилия
							<input
								required
								type="text"
								id="profile"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</label>
						<label className={cls.label} htmlFor="position">
							Должность
							<input
								required
								type="text"
								id="position"
								value={position}
								onChange={(e) => setPosition(e.target.value)}
							/>
						</label>
						<button className={cls.button} type="submit">
							Изменить
						</button>
					</form>
				</div>
			</Modal>
		</div>
	);
});
