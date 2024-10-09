import useOnScreen from '@/hooks/useOnScreen';
import { useTypedDispatch, useTypedSelector } from '@/hooks/useTypedHooks';
import { companyActions } from '@/store/companies';
import { CompanyActionCreator } from '@/store/companies/action-creators';
import { CompanyCard } from '@/widgets/companyCard/companyCard';
import { memo, useEffect, useState } from 'react';
import cls from './StartPageCompanies.module.scss';
import { StartPageCompaniesHeader } from './ui/StartPageCompaniesHeader/StartPageCompaniesHeader';

const StartPageCompanies = memo(() => {
	const data = useTypedSelector(CompanyActionCreator.getCompany);
	const [companyAll, setCompanyAll] = useState(false);
	const [visibleCount, setVisibleCount] = useState(15);
	const dispatch = useTypedDispatch();
	const selectedCompany = useTypedSelector(CompanyActionCreator.getSelectedCompany);

	const { measureRef, isIntersecting } = useOnScreen();

	const handleCheckbox = (id: string) => {
		if (selectedCompany.includes(id)) {
			setCompanyAll(false);
			dispatch(companyActions.removeSelectedCompany(id));
		} else {
			dispatch(companyActions.setSelectedCompany(id));
		}
	};

	useEffect(() => {
		dispatch(companyActions.setSelectedAllCompany(companyAll));
	}, [companyAll, dispatch]);

	useEffect(() => {
		if (isIntersecting) {
			setVisibleCount((prev) => prev + 15);
		}
	}, [isIntersecting]);

	return (
		<div className={cls.StartPage}>
			<StartPageCompaniesHeader companyAll={companyAll} setCompanyAll={setCompanyAll} />

			<div className={cls.companyGlobalWarper}>
                {/* <hr  className={cls.hr}/> */}

				<div className={cls.fakeWrapper}>
					<p className={cls.check}></p>
					<span className={cls.splitter} />
					<p className={cls.company}>Компании</p>
					<span className={cls.splitter} />
					<p className={cls.workers}>Ч/Р</p>
					<span className={cls.splitter} />
					<p className={cls.city}>Город</p>
				</div>

                <hr  className={cls.hr}/>
				{data &&
					data
						.slice(0, visibleCount)
						.map((item) => (
							<CompanyCard
								controlAll={companyAll}
								key={item.id}
								item={item}
								handleCheckbox={handleCheckbox}
							/>
						))}
				<div ref={measureRef} />
			</div>
		</div>
	);
});
export default StartPageCompanies;
