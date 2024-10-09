import { useTypedDispatch } from '@/hooks/useTypedHooks';
import { companyActions } from '@/store/companies';
import { Dispatch, SetStateAction, memo, useState } from 'react';
import { ModalCompany } from '../ModalCompany/ModalCompany';
import cls from './StartPageCompaniesHeader.module.scss';

interface StartPageCompaniesHeaderProps {
	companyAll: boolean;
	setCompanyAll: Dispatch<SetStateAction<boolean>>;
}

export const StartPageCompaniesHeader = memo((props: StartPageCompaniesHeaderProps) => {
	const { companyAll, setCompanyAll } = props;
	const dispatch = useTypedDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleDeleteFunction = () => {
		dispatch(companyActions.deleteCompany());
	};

	const handleModalOpen = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<>
			<div className={cls.StartPageCompaniesHeader}>
				<form className={cls.form}>
					<label htmlFor="companyAll" className={cls.checkBoxLabel}>
						Выбрать все компании
						<input
							onChange={() => setCompanyAll(!companyAll)}
							checked={companyAll}
							type="checkbox"
							name="companyAll"
							id="companyAll"
						/>
					</label>
				</form>
				<div className={cls.buttons}>
					<button className={cls.btn} onClick={handleModalOpen} type="button">
						Добавить компанию!
					</button>

					<button className={cls.btn} type="button" onClick={handleDeleteFunction}>
						Удалить выделеные компании
					</button>
				</div>
			</div>
			<ModalCompany
				setIsModalOpen={setIsModalOpen}
				handleModalOpen={handleModalOpen}
				isModalOpen={isModalOpen}
			/>
		</>
	);
});
