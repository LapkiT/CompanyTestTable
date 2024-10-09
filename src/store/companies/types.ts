export interface Employees {
    id: string,
    lastName: string,
    firstName: string,
    position: string,
}

export interface Company {
    id: string,
    name: string,
    address: string,
    employees: Employees[],
}

export interface companySchema {
    isLoading: boolean,
    error: string,
    data: Company[],
    selectedCompany: string[],
    selectedEmploys: string[],
    activeCompany: string,
}

export interface PayloadSelectAllEmploys {
    employsCheckAll: boolean,
    company: Company
}

export interface PayloadEditCompany {
    idCompany: string,
    name: string,
    address: string,
}

