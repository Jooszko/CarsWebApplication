using Cars.Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Cars.Application.Cars;


namespace Cars.API.Controllers
{
    public class CarsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Car>>> GetCars()
        {
            var result = await Mediator.Send(new List.Query());

            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);

            return BadRequest(result.Error);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCar(Guid id)
        {
            var result = await Mediator.Send(new Details.Query { Id = id });
            if (result == null || result.Value == null)
                return NotFound(); // 404 – zasób nie istnieje
            if (result.IsSuccess)
                return Ok(result.Value); // 200 – znaleziono samochód
            return BadRequest(result.Error); // 400 – błąd zapytania
        }

        [HttpPost]
        public async Task<IActionResult> CreateCar(Car car)
        {
            var result = await Mediator.Send(new Create.Command { Car = car });

            if (result == null)
                return BadRequest(); // 400 – niepoprawne dane

            if (result.IsSuccess && result.Value != null)
            {
                // 201 – zasób utworzony; nagłówek Location zawiera adres nowego samochodu
                return CreatedAtAction(
                    nameof(GetCar), // metoda, do której prowadzi link
                    new { id = result.Value.Id }, // parametr route
                    result.Value // zwracany obiekt
                );
            }

            return BadRequest(result.Error);
        }




        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCar(Guid id, Car car)
        {
            car.Id = id;
            await Mediator.Send(new Edit.Command { Car = car });
            return Ok();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(Guid id)
        {
            await Mediator.Send(new Delete.Command { Id = id });

            return NoContent();
        }



    

}
}