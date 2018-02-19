using Api.Entities;
using Api.Helpers;
using Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;

namespace Api.Repository
{
    public abstract class DataRepository
    {
        private DataContext _dbContext;
        public DataRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        #region Users
        public User GetUser(int id)
        {
            return _dbContext.Users.Find(id);
        }
        public User GetUser(string username, string password)
        {
            return _dbContext.Users.FirstOrDefault(u => u.Username.Equals(username) && u.PasswordHash.Equals(password));
        }
        public bool FindUser(string username)
        {
            return _dbContext.Users.Any(u => u.Username.Equals(username, StringComparison.OrdinalIgnoreCase));
        }
        public void AddUser(User user)
        {
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
        }
        #endregion
        #region LandMarks
        public LandMark GetLandMark(int id)
        {
            return _dbContext.LandMarks.Find(id);
        }
        public List<LandMark> GetLandMarks(string userId)
        {
            return _dbContext.LandMarks.Where(lm => lm.UserId == userId).ToList();
        }
        public List<LandMark> GetLandMarks()
        {
            return _dbContext.LandMarks.Include(c => c.OtherNotes).Include(c => c.UserNote).ToList();
        }
        public LandMark GetLandMark(double latitude, double longitude)
        {
            return _dbContext.LandMarks.FirstOrDefault(lm => lm.Latitude == latitude && lm.Longitude == longitude);
        }
        public void AddLandMark(LandMark landmark)
        {

            _dbContext.LandMarks.Add(landmark);
            _dbContext.SaveChanges();
        }
        public void UpdateLandMark(LandMark landmark)
        {
            _dbContext.LandMarks.Update(landmark);
            _dbContext.SaveChanges();
        }

        #endregion
        #region Notes
        public Note GetNote(int id)
        {
            return _dbContext.Notes.Find(id);
        }
        public Note GetNote(string userId, int landmarkId)
        {
            return _dbContext.Notes.FirstOrDefault(n => n.UserId == userId && n.LandMarkId == landmarkId);
        }
        public List<Note> GetNotesBuUserId(string userId)
        {
            return _dbContext.Notes.Where(n => n.UserId == userId).ToList();
        }
        public List<Note> GetNotesByLandMarkId(int landmarkId)
        {
            return _dbContext.Notes.Where(n => n.LandMarkId == landmarkId).ToList();
        }
        public void AddNote(Note note)
        {
            _dbContext.Notes.Add(note);
            _dbContext.SaveChanges();
        }
        public void UpdateNote(Note note)
        {
            _dbContext.Notes.Update(note);
            _dbContext.SaveChanges();
        }
        #endregion

    }
}
