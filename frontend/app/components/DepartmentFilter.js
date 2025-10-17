import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_DEPARTMENTS = gql`
  query GetDepartments {
    getDepartments {
      id
      name
    }
  }
`;

export default function DepartmentFilter({ selectedDepartment, onDepartmentChange }) {
  const { data: departmentsData } = useQuery(GET_DEPARTMENTS);

  return (
    <div className="mb-6">
      <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Department
      </label>
      <select
        id="department"
        value={selectedDepartment}
        onChange={(e) => onDepartmentChange(e.target.value)}
        className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Departments</option>
        {departmentsData?.getDepartments?.map((dept) => (
          <option key={dept.id} value={dept.name}>
            {dept.name}
          </option>
        ))}
      </select>
    </div>
  );
}