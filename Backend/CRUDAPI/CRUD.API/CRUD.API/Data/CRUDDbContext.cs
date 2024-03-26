using CRUD.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CRUD.API.Data
{
    public class CRUDDbContext : DbContext
    {
        public CRUDDbContext(DbContextOptions<CRUDDbContext> options) : base(options) { }
        public DbSet<employee> Employees { get; set; }
    }
}
