'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import EmployeeTable from './components/EmployeeTable';
import DepartmentFilter from './components/DepartmentFilter';
import AddEmployeeForm from './components/AddEmployeeForm';
import LoadingSpinner from './components/LoadingSpinner';
import { GET_ALL_EMPLOYEES, GET_EMPLOYEES_BY_DEPARTMENT } from './lib/graphql';

export default function HomePage() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const { data: allEmployeesData, loading: allLoading, error: allError } = useQuery(GET_ALL_EMPLOYEES);
  const { data: filteredData, loading: filterLoading, error: filterError } = useQuery(
    GET_EMPLOYEES_BY_DEPARTMENT,
    {
      variables: { department: selectedDepartment },
      skip: !selectedDepartment
    }
  );

  const employees = selectedDepartment ? 
    (filteredData?.getEmployeesByDepartment || []) : 
    (allEmployeesData?.getAllEmployees || []);

  const loading = allLoading || (selectedDepartment && filterLoading);
  const error = allError || filterError;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Employees</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Employee
          </button>
        </div>

        <DepartmentFilter 
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
        />
      </div>

      {showAddForm && (
        <AddEmployeeForm onClose={() => setShowAddForm(false)} />
      )}

      {loading && <LoadingSpinner />}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">Error loading employees: {error.message}</p>
        </div>
      )}

      {!loading && !error && <EmployeeTable employees={employees} />}
    </div>
  );
}