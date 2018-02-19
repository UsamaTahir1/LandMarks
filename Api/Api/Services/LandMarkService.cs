
using Api.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;
using Api.Helpers;

namespace Api.Services
{
    public class LandMarkService : DataRepository, ILandMarkServices
    {
        private DataContext _dbContext;
        private IUserService _userService;
        public LandMarkService(DataContext dbContext, IUserService userService) : base(dbContext)
        {
            _dbContext = dbContext;
            _userService = userService;
        }

        public bool CreateLandMark(double longitude, double latitude,string userId)
        {
            try
            {
                LandMark landmark = new LandMark();
                landmark.Latitude = latitude;
                landmark.Longitude = longitude;
                landmark.UserId = userId;
                AddLandMark(landmark);
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public bool AddUserNoteToLandMark(Note note,int landmarkId)
        {
            var landmark = GetLandMark(landmarkId);
            if(landmark != null)
            {
                landmark.OtherNotes.Add(note);
                UpdateLandMark(landmark);
                return true;
            }
            return false;
        }
        public bool CreateNote(string text,string userid,int landmarkId)
        {
            if (!string.IsNullOrEmpty(text))
            {
                Note note = new Note();
                note.Text = text;
                note.UserId = userid;
                note.UserName = _userService.GetById(int.Parse(userid)).Username;
                note.LandMarkId =  landmarkId;
                AddNote(note);
                return AddUserNoteToLandMark(note, landmarkId);
             }
            return false;
        }

        public LandMark GetLandmark(int id)
        {
            var landmark = GetLandMark(id);
            landmark.IsActive = true;
            return landmark;
        }
        public List<LandMark> GetLandmarksOfUser(string userId)
        {
            var marks = GetLandMarks(userId);
            marks.All(c => { c.IsActive = true; return true; });
            return marks;
        }
        public List<LandMark> GetAllLandmarks(string userId)
        {
            var marks = GetLandMarks();
            marks.ForEach(c => { if (c.UserId.Equals(userId)) c.IsActive = true; else c.IsActive = false;
                if (c.UserNote == null) c.UserNote = new Note((int)DateTime.Now.Ticks,c.Id);
            });
            return marks;
        }
        public bool UpdateLandMarkNote(int landmarkId, string noteText, string userId)
        {
            try
            {
                var mark = GetLandMark(landmarkId);
                if (mark != null)
                {
                    Note note = new Note();
                    note.LandMarkId = landmarkId;
                    note.Text = noteText;
                    note.UserId = userId;
                    note.UserName = _userService.GetById(int.Parse(userId)).Username;
                    AddNote(note);
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
