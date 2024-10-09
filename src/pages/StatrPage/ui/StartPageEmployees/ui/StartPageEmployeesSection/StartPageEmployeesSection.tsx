import {
    Dispatch, SetStateAction, memo, useEffect,
} from 'react';
import cls from './StartPageEmployeesSection.module.scss';
import { classNames } from '@/shared/classNames/classNames';
import { Employees } from '@/store/companies/types';
import { Employ } from '@/widgets/Emploe/Employ';
import useOnScreen from '@/hooks/useOnScreen';

interface StartPageEmployeesSectionProps {
    className?: string;
    employers: Employees[];
    visibleCount: number;
    employsCheckAll: boolean;
    handleCheckbox: (id: string) => void;
    setVisibleCount: Dispatch<SetStateAction<number>>;
}

export const StartPageEmployeesSection = memo(
    (props: StartPageEmployeesSectionProps) => {
        const {
            className,
            employers,
            employsCheckAll,
            handleCheckbox,
            visibleCount,
            setVisibleCount,
        } = props;

        const { measureRef, isIntersecting } = useOnScreen();

        useEffect(() => {
            if (isIntersecting) {
                setVisibleCount((prev: number) => prev + 20);
            }
        }, [isIntersecting, setVisibleCount]);

        return (
            <div
                className={classNames(cls.StartPageEmployeesSection, {}, [
                    className,
                ])}
            >
                {employers
                    && employers.length > 0
                    && employers
                        .slice(0, visibleCount)
                        .map((item) => (
                            <Employ
                                controlAll={employsCheckAll}
                                handleCheckbox={handleCheckbox}
                                key={item.id}
                                item={item}
                            />
                        ))}
                <div ref={measureRef} />
            </div>
        );
    },
);
