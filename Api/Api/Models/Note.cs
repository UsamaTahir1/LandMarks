using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class Note
    {
        [Key]
        public int Id { get; set; }
        public string Text { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public int LandMarkId { get; set; }
        public DateTime CreationDate { get; set; }
        public Note()
        {
            CreationDate = DateTime.UtcNow;
            UserName = string.Empty;
        }
        public Note(int noteId,int landmarkId)
        {
            Id = Id;
            LandMarkId = landmarkId;
        }
    }
}
