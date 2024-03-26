using CRUD.API.Data;
using CRUD.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUD.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly CRUDDbContext _context;
        public EmployeesController(CRUDDbContext cRUDDbContext)
        {
            _context = cRUDDbContext;
        }
        [HttpGet]

        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _context.Employees.ToListAsync();
            return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] employee employeeRequest)
        {
            employeeRequest.Id = Guid.NewGuid();
            await _context.Employees.AddAsync(employeeRequest);
            await _context.SaveChangesAsync();
            return Ok(employeeRequest);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(Guid id)
        {
            var employeeToDelete = await _context.Employees.FindAsync(id);

            if (employeeToDelete == null)
            {
                return NotFound(); // Employee not found
            }

            _context.Employees.Remove(employeeToDelete);
            await _context.SaveChangesAsync();

            return NoContent(); // Successful deletion
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> ModifyEmployee([FromRoute]Guid id)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(X => X.Id == id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }
        private bool EmployeeExists(Guid id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id, employee updatemployeereq)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            employee.Name = updatemployeereq.Name;
            employee.Email = updatemployeereq.Email;
            employee.Salary = updatemployeereq.Salary;
            employee.Phone = updatemployeereq.Phone;
            employee.Department = updatemployeereq.Department;
            await _context.SaveChangesAsync();

            return Ok(employee);

        }


    }
}
