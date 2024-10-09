import { memo, useEffect, useState } from 'react';
import { Company } from '@/store/companies/types';
import cls from './companyCard.module.scss';
import { Splitter } from '@/shared/ui/Splitter/Splitter';
import { useTypedDispatch, useTypedSelector } from '@/hooks/useTypedHooks';
import { CompanyActionCreator } from '@/store/companies/action-creators';
import { companyActions } from '@/store/companies';
import { Mods, classNames } from '@/shared/classNames/classNames';
import PencelSvg from '../../assets/pencil-svgrepo-com.svg'
import { ModalCompanyEdit } from './ui/ModalCompanyEdit';

interface companyCardProps {
    handleCheckbox: (id: string) => void;
    item: Company;
    controlAll?: boolean;
}

export const CompanyCard = memo((props: companyCardProps) => {
    const {
        handleCheckbox, item, controlAll,
    } = props;
    const [checked, setChecked] = useState(false);
    const dispatch = useTypedDispatch();
    const activeCompany = useTypedSelector(CompanyActionCreator.getActiveCompany);
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    const handleCheckboxChange = () => {
        handleCheckbox(item.id);
        setChecked(!checked);
    };

    const handleActiveCompany = (id: string) => {
        if (activeCompany !== id) {
            dispatch(companyActions.setActiveCompany(id));
        }
        if (activeCompany === id) {
            dispatch(companyActions.setActiveCompany(''));
        }
    };

    const handleEditCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setIsModalOpen(true);
    }

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen);
    }

    useEffect(() => {
        if (controlAll) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [controlAll]);

    const mods: Mods = {
        [cls.selected]: activeCompany === item.id,
        [cls.checked]: checked,
    };

    return (
        <div className={classNames(cls.wrapper, mods, [])}>
            <input
                className={cls.check}
                onChange={handleCheckboxChange}
                checked={checked}
                type="checkbox"
                name={item.id}
            />
            <div onClick={() => handleActiveCompany(item.id)} className={cls.wrapper}>
                <Splitter />
                <p className={cls.company}>{item.name}</p>
                <Splitter />
                <p className={cls.workers}>{item.employees.length}</p>
                <Splitter />
                <p className={cls.city}>{item.address}</p>
                <div onClick={(e) => handleEditCard(e)} className={cls.pencelWrapper}>
                    <PencelSvg className={cls.pencel} width={16} height={16} /> 
                </div>

                
            </div>
            <ModalCompanyEdit data={item}  isModalOpen={isModalOpen} handleModalOpen={handleModalOpen}/>
        </div>
    );
});
