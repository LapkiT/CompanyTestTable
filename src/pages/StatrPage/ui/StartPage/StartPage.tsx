import { memo } from 'react';
import StartPageCompanies from '../StartPageCompanies/StartPageCompanies';
import StartPageEmployees from '../StartPageEmployees/StartPageEmployees';
import cls from './StartPage.module.scss';

const StartPage = memo(() => {
	return (
		<section className={cls.wrapper}>
			<div className={cls.companySection}>
				<StartPageCompanies />
			</div>
			<div className={cls.employersSection}>
				<StartPageEmployees />
			</div>
		</section>
	);
});

export default StartPage;
