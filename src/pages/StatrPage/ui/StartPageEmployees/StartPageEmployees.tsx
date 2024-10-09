import {
    memo, useCallback, useEffect, useRef, useState,
} from 'react';
import { Company, Employees } from '@/store/companies/types';
import { useTypedDispatch, useTypedSelector } from '@/hooks/useTypedHooks';
import { CompanyActionCreator } from '@/store/companies/action-creators';
import cls from './StartPageEmployees.module.scss';
import { companyActions } from '@/store/companies';
import { StartPageEmployeesHeader } from './ui/StartPageEmployeesHeader/StartPageEmployeesHeader';
import { StartPageEmployeesSection } from './ui/StartPageEmployeesSection/StartPageEmployeesSection';

const StartPageEmployees = memo(() => {
    const data = useTypedSelector(CompanyActionCreator.getCompany);
    const dispatch = useTypedDispatch();

    const [employers, setEmployers] = useState<Employees[]>([]);
    const [employsCheckAll, setEmploysCheckAll] = useState(false);
    const [visibleCount, setVisibleCount] = useState<number>(20);

    const screenRef = useRef(null);

    const activeCompany = useTypedSelector(
        CompanyActionCreator.getActiveCompany,
    );
    const selectedEmploys = useTypedSelector(CompanyActionCreator.getEmployers);

    const handleCheckbox = useCallback((id: string) => {
        if (selectedEmploys.includes(id)) {
            setEmploysCheckAll(false);
            dispatch(companyActions.removeSelectedEmploy(id));
        } else {
            dispatch(companyActions.setSelectedEmploy(id));
        }
    }, []);

    useEffect(() => {
        if (activeCompany) {
            const indexActiveCompany = data.findIndex((item) => item.id === activeCompany);
            const company = data[indexActiveCompany] as Company;
            dispatch(
                companyActions.setSelectedAllEmploy({
                    employsCheckAll,
                    company,
                }),
            );
        }
    }, [activeCompany, data, dispatch, employsCheckAll]);

    useEffect(() => {
        if (activeCompany === '' || activeCompany === undefined) {
            setEmployers([]);
            setEmploysCheckAll(false);
            setVisibleCount(20);
        }
        if (activeCompany) {
            if (data.length === 0) return;
            const indexActiveCompany = data.findIndex((item) => item.id === activeCompany);
            setEmployers(data[indexActiveCompany].employees);
            setEmploysCheckAll(false);
            setVisibleCount(20);
        }
    }, [activeCompany, data]);

    useEffect(() => {
        screenRef.current.scrollIntoView({ behavior: 'auto' });
    }, [activeCompany])

    return (
        <div>
            <div ref={screenRef}></div>
            <div className={cls.employHeader}>
                <StartPageEmployeesHeader
                    employsCheckAll={employsCheckAll}
                    setEmploysCheckAll={setEmploysCheckAll}
                />
            </div>
            <div className={cls.employWrapperGlobal}>
                {employers && (
                    <StartPageEmployeesSection
                        setVisibleCount={setVisibleCount}
                        employers={employers}
                        visibleCount={visibleCount}
                        employsCheckAll={employsCheckAll}
                        handleCheckbox={handleCheckbox}
                    />
                )}
            </div>
        </div>
    );
});

export default StartPageEmployees;
