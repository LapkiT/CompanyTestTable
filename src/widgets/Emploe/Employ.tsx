import { Mods, classNames } from '@/shared/classNames/classNames';
import { Employees } from '@/store/companies/types';
import { memo, useEffect, useState } from 'react';
import PencelSvg from '../../assets/pencil-svgrepo-com.svg';
import cls from './Employ.module.scss';
import { ModalCompanyEdit } from './ModalEmploeEdit/ModalEmploeEdit';

interface EmployProps {
	item: Employees;
	metaRef?: (node: Element) => void;
	handleCheckbox: (id: string) => void;
	controlAll: boolean;
}

export const Employ = memo((props: EmployProps) => {
	const { item, metaRef, handleCheckbox, controlAll } = props;
	const [checked, setChecked] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCheckboxChange = () => {
		handleCheckbox(item.id);
		setChecked(!checked);
	};

	const handleEditCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		setIsModalOpen(true);
	};

	const mods: Mods = {
		[cls.checked]: checked,
	};

	useEffect(() => {
		if (controlAll) {
			setChecked(true);
		} else {
			setChecked(false);
		}
	}, [controlAll]);

	return (
		<div className={cls.employGlobalWrapper}>
			<div onClick={handleCheckboxChange} className={cls.employWrapper}>
				<div ref={metaRef} className={classNames(cls.employ, mods, [])} key={item.id}>
					<input
						checked={checked}
						onChange={handleCheckboxChange}
						className={cls.employCheck}
						type="checkbox"
						name="employerCheck"
						id={Symbol(item.id).toString()}
					/>
					<p className={cls.employName}>{item.firstName}</p>
					<p className={cls.employLast}>{item.lastName}</p>
					<p className={cls.employPosition}>{item.position}</p>
					<div onClick={(e) => handleEditCard(e)} className={cls.pencelWrapper}>
						<PencelSvg className={cls.pencel} width={16} height={16} />
					</div>
				</div>
			</div>
			<ModalCompanyEdit
					isModalOpen={isModalOpen}
					employer={item}
					handleModalOpen={() => setIsModalOpen(false)}
				/>
		</div>
	);
});
