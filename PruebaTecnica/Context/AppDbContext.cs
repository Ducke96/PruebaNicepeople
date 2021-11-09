using Microsoft.EntityFrameworkCore;
using PruebaTecnica.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PruebaTecnica.Context
{
    public class AppDbContext :DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {

        }
        public DbSet<Historial_CiudadesBd> Historial_Consultas { get; set; }
    }

}
