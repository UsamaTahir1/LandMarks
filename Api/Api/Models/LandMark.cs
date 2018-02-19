using Api.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class LandMark
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreationDate { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public virtual Note UserNote { get; set; }
        public bool IsActive { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public virtual List<Note> OtherNotes { get; set; }
        public LandMark()
        {
            IsActive = false;
            CreationDate = DateTime.UtcNow;
        }
    }
    
}
