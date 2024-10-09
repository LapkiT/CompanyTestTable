/* eslint-disable max-len */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initStore } from './initialStore';
import { Company, companySchema, Employees, PayloadEditCompany, PayloadSelectAllEmploys } from './types';

const initialState: companySchema = {
	isLoading: false,
	error: undefined,
	data: initStore,
	selectedCompany: [],
	selectedEmploys: [],
	activeCompany: undefined,
};

export const CompanySlice = createSlice({
	name: 'company',
	initialState,
	reducers: {
		setSelectedCompany: (state, action: PayloadAction<string>) => {
			state.selectedCompany = [...state.selectedCompany, action.payload];
		},
		setSelectedAllCompany: (state, action: PayloadAction<boolean>) => {
			if (action.payload === true) {
				state.selectedCompany = state.data.map((item) => item.id);
			} else {
				state.selectedCompany = [];
			}
		},
		removeSelectedCompany: (state, action: PayloadAction<string>) => {
			state.selectedCompany = state.selectedCompany.filter((item) => item !== action.payload);
		},

		setActiveCompany: (state, action: PayloadAction<string>) => {
			state.activeCompany = action.payload;
		},

		setSelectedEmploy: (state, action: PayloadAction<string>) => {
			state.selectedEmploys = [...state.selectedEmploys, action.payload];
		},
		removeSelectedEmploy: (state, action: PayloadAction<string>) => {
			state.selectedEmploys = state.selectedEmploys.filter((item) => item !== action.payload);
		},
		setSelectedAllEmploy: (state, action: PayloadAction<PayloadSelectAllEmploys>) => {
			if (action.payload.employsCheckAll === true) {
				state.selectedEmploys = action.payload.company.employees.map((item) => item.id);
			} else {
				state.selectedEmploys = [];
			}
		},

		addEmployer: (state, action: PayloadAction<Employees>) => {
			const companyId = state.data.findIndex((item) => item.id === state.activeCompany); 
			state.data[companyId].employees.push(action.payload);
		},

		addCompany: (state, action: PayloadAction<Company>) => {
			state.data.push(action.payload);
		},

		deleteChosenEmployers: (state, action: PayloadAction<boolean>) => {
			const companyId = state.data.findIndex((item) => item.id === state.activeCompany); 
			if (action.payload) {
				state.data[companyId].employees = [];
			} else {
				state.data[companyId].employees = state.data[
					companyId
				].employees.filter((item) => !state.selectedEmploys.includes(item.id));
			}
		},

		deleteCompany: (state) => {
			state.data = state.data.filter((item) => !state.selectedCompany.includes(item.id));
			state.activeCompany = undefined;

			if (state.data.length === 0) {
				state.activeCompany = undefined;
				state.selectedCompany = [];
				state.data = [];
			}
		},

		editCompany: (state, action: PayloadAction<PayloadEditCompany>) => {
			const companyId = state.data.findIndex((item) => item.id === action.payload.idCompany);
			state.data[companyId] = {
				...state.data[companyId],
				name: action.payload.name,
				address: action.payload.address,
			}
		},

		editEmployer: (state, action: PayloadAction<Employees>) => {
			const companyId = state.data.findIndex((item) => item.id === state.activeCompany); 
			const employerId = state.data[companyId].employees.findIndex((item) => item.id === action.payload.id);
			state.data[companyId].employees[employerId] = {
				...state.data[companyId].employees[employerId],
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				position: action.payload.position
			};
			
		}
	},
});

export const { actions: companyActions } = CompanySlice;
export const { reducer: companyReducer } = CompanySlice;
