const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');

const resolvers = {
  Query: {
    getAllEmployees: async () => {
      try {
        const db = getDB();
        const employees = await db.collection('employees')
          .find({})
          .project({ name: 1, position: 1, department: 1, _id: 1 })
          .toArray();
        
        // Transform _id to id
        return employees.map(emp => ({
          id: emp._id.toString(),
          name: emp.name,
          position: emp.position,
          department: emp.department
        }));
      } catch (error) {
        throw new Error(`Failed to fetch employees: ${error.message}`);
      }
    },

    getEmployeeDetails: async (_, { id }) => {
      try {
        const db = getDB();
        
        if (!ObjectId.isValid(id)) {
          throw new Error('Invalid employee ID');
        }

        const employee = await db.collection('employees')
          .findOne({ _id: new ObjectId(id) });
        
        if (!employee) {
          throw new Error('Employee not found');
        }
        
        return {
          id: employee._id.toString(),
          name: employee.name,
          position: employee.position,
          department: employee.department,
          salary: employee.salary
        };
      } catch (error) {
        throw new Error(`Failed to fetch employee details: ${error.message}`);
      }
    },

    getEmployeesByDepartment: async (_, { department }) => {
      try {
        const db = getDB();
        const employees = await db.collection('employees')
          .find({ department })
          .toArray();
        
        return employees.map(emp => ({
          id: emp._id.toString(),
          name: emp.name,
          position: emp.position,
          department: emp.department,
          salary: emp.salary
        }));
      } catch (error) {
        throw new Error(`Failed to fetch employees by department: ${error.message}`);
      }
    },

    getDepartments: async () => {
      try {
        const db = getDB();
        const departments = await db.collection('departments').find({}).toArray();
        
        return departments.map(dept => ({
          id: dept._id.toString(),
          name: dept.name,
          floor: dept.floor
        }));
      } catch (error) {
        throw new Error(`Failed to fetch departments: ${error.message}`);
      }
    }
  },

  Mutation: {
    addEmployee: async (_, { input }) => {
      try {
        const db = getDB();
        
        // Validation
        if (!input.name || !input.position || !input.department || !input.salary) {
          throw new Error('All fields are required');
        }

        if (input.salary < 0) {
          throw new Error('Salary must be positive');
        }

        const employee = {
          name: input.name.trim(),
          position: input.position.trim(),
          department: input.department,
          salary: parseFloat(input.salary),
          createdAt: new Date()
        };

        const result = await db.collection('employees').insertOne(employee);
        
        return {
          id: result.insertedId.toString(),
          ...employee
        };
      } catch (error) {
        throw new Error(`Failed to add employee: ${error.message}`);
      }
    }
  }
};

module.exports = resolvers;