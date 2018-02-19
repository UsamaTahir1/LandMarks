using Api.Entities;
using Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Dtos
{
    public class LandmarkDto
    {
        public string id { get; set; }
        public double longitude { get; set; }
        public double latitude { get; set; }
    }
    public class ParamsModel
    {
        public int landmarkId { get; set; }
        public string noteText { get; set; }
    }
}
