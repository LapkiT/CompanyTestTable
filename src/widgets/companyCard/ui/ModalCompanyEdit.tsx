import { useTypedDispatch } from '@/hooks/useTypedHooks';
import { classNames } from '@/shared/classNames/classNames';
import { companyActions } from '@/store/companies';
import { Company } from '@/store/companies/types';
import Modal from '@/widgets/Modal/Modal';
import { memo, useState } from 'react';
import cls from './ModalCompanyEdit.module.scss';

interface ModalCompanyEditProps {
	data: Company;
	isModalOpen: boolean;
	handleModalOpen?: () => void;
}

export const ModalCompanyEdit = memo((props: ModalCompanyEditProps) => {
	const { isModalOpen, handleModalOpen, data } = props;
	const [companyName, setCompanyName] = useState<string>(data.name);
	const [address, setAddress] = useState<string>(data.address);
	const dispatch = useTypedDispatch();

	const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleModalOpen();
		dispatch(
			companyActions.editCompany({ idCompany: data.id, name: companyName, address: address })
		);
		dispatch(companyActions.setActiveCompany(data.id));
	};

	return (
		<div className={classNames(cls.ModalCompanyEdit, {}, [])}>
			<Modal isOpen={isModalOpen} onClose={handleModalOpen}>
				<div className={cls.wrapper}>
					<h2>Редактировать Компанию - {data.name}</h2>
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
						<button className={cls.button} type="submit">
							Изменить
						</button>
					</form>
				</div>
			</Modal>
		</div>
	);
});
