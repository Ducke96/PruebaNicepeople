using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PruebaTecnica.Models
{
    public class Historial_CiudadesBd
    {
        [Key]
        public int id { get; set; }

        public String city { get; set; }

        public DateTime fecha_consulta { get; set; } 
    }
}
