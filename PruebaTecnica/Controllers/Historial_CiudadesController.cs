using Microsoft.AspNetCore.Mvc;
using PruebaTecnica.Context;
using PruebaTecnica.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PruebaTecnica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Historial_CiudadesController : ControllerBase
    {
        private readonly AppDbContext context;
        public Historial_CiudadesController(AppDbContext context)
        {
            this.context = context;
        }
        // GET: api/<Historial_CiudadesController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(context.Historial_Consultas.ToList());
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        // GET api/<Historial_CiudadesController>/5
        [HttpGet("{id}" , Name ="GetCiudad")]
        public ActionResult Get(int id)
        {
            try
            {
                var historial = context.Historial_Consultas.FirstOrDefault(g => g.id == id);
                return Ok(historial);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        // POST api/<Historial_CiudadesController>
        [HttpPost]
        public ActionResult Post([FromBody] Historial_CiudadesBd historial)
        {
            try
            {
                context.Historial_Consultas.Add(historial);
                context.SaveChanges();
                return CreatedAtRoute("GetCiudad" , new { id=historial.id}, historial);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        // PUT api/<Historial_CiudadesController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Historial_CiudadesBd historial)

        {
            try
            {
                if (historial.id == id)
                {
                    context.Entry(historial).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetCiudad", new { id = historial.id }, historial);


                }
                else {
                    return BadRequest();

                }
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        // DELETE api/<Historial_CiudadesController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var historial = context.Historial_Consultas.FirstOrDefault(g => g.id == id);
                if (historial != null)
                {
                    context.Historial_Consultas.Remove(historial);
                    context.SaveChanges();
                    return Ok(id);
                }
                else {

                    return BadRequest();
                }
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
