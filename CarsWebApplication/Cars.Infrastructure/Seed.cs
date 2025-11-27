using Cars.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cars.Infrastructure
{
    public static class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (await context.Cars.AnyAsync())
                return;

            var cars = new List<Car>
            {
                new Car
                {
                    Id = Guid.NewGuid(),
                    Brand = "Mazda",
                    Model = "CX60",
                    DoorsNumber = 5,
                    LuggageCapacity = 570,
                    EngineCapacity = 2488,
                    FuelType = FuelType.Hybrid,
                    ProductionDate = DateTime.UtcNow.AddMonths(-1),
                    CarFuelConsumption = 8.1,
                    BodyType = BodyType.SUV
                },
                new Car
                {
                    Id = Guid.NewGuid(),
                    Brand = "Renault",
                    Model = "Clio II",
                    DoorsNumber = 5,
                    LuggageCapacity = 300,
                    EngineCapacity = 1149,
                    FuelType = FuelType.Petrol,
                    ProductionDate = DateTime.UtcNow.AddYears(-18),
                    CarFuelConsumption = 7.2,
                    BodyType = BodyType.Hatchback 
                },
                 new Car
                {
                    Id = Guid.NewGuid(),
                    Brand = "BMW",
                    Model = "530i",
                    DoorsNumber = 4,
                    LuggageCapacity = 520,
                    EngineCapacity = 1998,
                    FuelType = FuelType.Petrol,
                    ProductionDate = DateTime.UtcNow.AddYears(-3),
                    CarFuelConsumption = 9.5,
                    BodyType = BodyType.Sedan
                },
            };

            await context.Cars.AddRangeAsync(cars);

            await context.SaveChangesAsync();
        }
    }
}
