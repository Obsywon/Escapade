using Escapade.Api.Models.Interfaces;

namespace Escapade.Api.Models
{
    public class GeographicCoordinate : Entity
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
