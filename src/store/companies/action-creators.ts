import { RootState } from '..';

export const CompanyActionCreator = {
    getCompany: ((state: RootState) => state.companies.data),
    getError: ((state: RootState) => state.companies.error),
    getLading: ((state: RootState) => state.companies.isLoading),
    getSelectedCompany: ((state: RootState) => state.companies.selectedCompany),
    getEmployers: ((state: RootState) => state.companies.selectedEmploys),
    getActiveCompany: ((state: RootState) => state.companies.activeCompany),
};
